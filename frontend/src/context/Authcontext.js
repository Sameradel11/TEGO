import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedAuthTokens = localStorage.getItem('authTokens');
  const initialUser = storedAuthTokens ? jwtDecode(storedAuthTokens) : null;
  const [user, setUser] = useState(initialUser);
  const initialAuthTokens = storedAuthTokens ? JSON.parse(storedAuthTokens) : null;
  const [authTokens, setAuthTokens] = useState(initialAuthTokens);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const loginUser = async (e) => {
    e.preventDefault();
    console.log('form submitted');
    const response = await fetch('http://localhost:8000/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });
    const tokens = await response.json();
    if (response.status === 200) {
      setAuthTokens(tokens);
      const loggedUser = jwtDecode(tokens.access);
      console.log(loggedUser);
      setUser(loggedUser);
      localStorage.setItem('authTokens', JSON.stringify(tokens));
      history.push('/host');
    } else if (response.status === 401) {
      alert(tokens.detail);
    } else {
      alert('something went wrong');
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    console.log('logged out');
    localStorage.removeItem('authTokens');
    history.push('/');
  };

  const updateToken = async () => {
    if (!authTokens) {
      console.log('authTokens are empty');
    } else {
      const response = await fetch('http://localhost:8000/token/refresh/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          refresh: authTokens?.refresh,
        }),
      });
      const tokens = await response.json();
      console.log(tokens);
      console.log('refresh called');
      if (response.status === 200) {
        setAuthTokens(tokens);
        setUser(jwtDecode(tokens.access));
        localStorage.setItem('authTokens', JSON.stringify(tokens));
      } else {
        alert('something went wrong');
        logoutUser();
      }
      if (loading) {
        setLoading(false);
      }
    }
  };

  const contextData = {
    user,
    authTokens,
    login: loginUser,
    logout: logoutUser,
  };
  useEffect(() => {
    // if (loading) {
    //   updateToken();
    // }
    const delaytime = 1000 * 60 * 60 * 23;
    const interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, delaytime);
    return () => {
      clearInterval(interval);
    };
  }, [authTokens]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
export default AuthContext;
