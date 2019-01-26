import React, { Component } from 'react';
import logo from './logo.svg';
import '../css/App.css';
import {Route, NavLink } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Jokes from './Jokes';

class App extends Component {
  render() {
    return (
      <div className="App">

      
         <Route exact path = '/' render = {(props) => <SignIn {...props} />} />
         <Route exact path = '/register' render = {(props) => <SignUp {...props} />} />
         <Route exact path = '/jokes' render = {(props) => <Jokes {...props} />} />
      </div>
    );
  }
}

export default App;
