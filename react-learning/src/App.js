import React, { Component } from 'react';
import Moment from 'moment';
import logo from './logo.svg';
import './App.css';

function nowDate() {
    return Moment().format('YYYY-MM-DD HH:mm:ss');
}

const helloWorldElement = <h1>Hello, world!!!</h1>
const nowDateElem = <h1>当前时间: { nowDate() }</h1>

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <hr />
        <div>
            { helloWorldElement }
        </div>

        <hr />
        { nowDateElem }
      </div>
    );
  }
}

export default App;
