import React, { Component } from 'react';
import './style.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="header">
          <h1 id="app-header-title">learnCent</h1>
          <button className="menu-cog-button">
            <i className="fas fa-cog"/>
          </button>
        </div>
      </div>
    );
  }
}

export default App;
