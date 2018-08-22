import React, { Component } from 'react';


class Header extends Component {
  render() {
    return (
      <div className="Auth-header">
        <i className="fas fa-book-open"></i>
        <h1 id="header-title">learnCent</h1>
        <h2 id="header-subtitle">
          Peer to peer tutoring powered by recursive incentives
        </h2>
      </div>
    );
  }
}
export default Header;
