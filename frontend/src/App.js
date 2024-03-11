import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Footer, Blog, Possibility, Features, WhatGPT3, Header, SignUpPage, SignUpPage2 } from './containers';
import { Navbar } from './components';

import './App.css';
import Sidebar from './containers/d/Sidebar';
import ToSign from './containers/ToSign/ToSign';

const App = () => (

  <Router>
    <div className="App">
      <Switch>
        <Route path="/signup" component={SignUpPage} />
        <Route path="/signup2" component={SignUpPage2} />
        <Route path="/file" component={Sidebar} />
        <Route path="/sign" component={ToSign} />
        <Route path="/" exact>
          <div className="gradient__bg">
            <Navbar />
            <Header />
            <Sidebar />
          </div>
          <WhatGPT3 />
          <Features />
          <Possibility />
          <Blog />
          <Footer />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
