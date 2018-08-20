import React, { Component } from 'react';

class TutorListItem extends Component {
  render() {
    return (
      <li className="TutorListItem">
        <img
          className="tutor-image"
          alt="tutor"
          src="https://www.theope.org/resolveuid/c1c18ff151f646de82090358d7664005/@@images/image/mini"/>
        <div className="tutor-details">
          <h1 className="tutor-name">John Brown</h1>
          <h2>Calculus, Literature</h2>
          <h2>BA in Mathematics</h2>
        </div>
        <div className="tutor-buttons">
          <button className="tutor-button">Request</button>
        </div>
      </li>
    );
  }
}

export default TutorListItem;
