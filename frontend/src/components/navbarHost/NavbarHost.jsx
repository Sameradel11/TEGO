import React, { useContext } from 'react';
// import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { Link } from 'react-router-dom'; // Import Link
import logo from '../../assets/Logo4.png';
import './navbarHost.css';
import AuthContext from '../../context/Authcontext';

function Navbar() {
  const { logout } = useContext(AuthContext); // Destructure loginUser from the context

  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="gpt3__navbar-links_container">
          <p><Link to="/">الرئيسية</Link></p>
          <p><a href="#wgpt3">الملف الشخصي</a></p>
          {/* <p><a href="#features">تسجيل الخروج</a></p> */}
        </div>
      </div>
      <div className="gpt3__navbar-sign">
        {/* <Link to="/signin">
          <p type="btn">تسجيل الخروج</p>
        </Link> */}
        {/* Use Link here */}
        <button onClick={logout} type="button">تسجيل الخروج</button>
      </div>
    </div>
  );
}

export default Navbar;
