import React, { Component } from 'react';

class StudentListItem extends Component {
  render() {
    return (
      <li className="StudentListItem">
        <img
          className="student-image"
          alt="student"
          src="https://image.freepik.com/free-vector/student-illustration_23-2147513439.jpg"/>
        <div className="student-details">
          <h1 className="student-name">Henry VII</h1>
          <h2>Math{/*What the student needs help in*/}</h2>
          <h2>Grade 10, Algebra{/*Grade / Education / Level / Speciality*/}</h2>
          <h3>Tokens offered: 10</h3>
        </div>
        <div className="student-buttons">
          <button className="student-button check-button">
            <i className="fas fa-check"/>
          </button>
          <button className="student-button times-button">
            <i className="fas fa-times"/>
          </button>
          <button
            className="student-button retweet-button">
            <i className="fas fa-retweet"/>
          </button>
        </div>
      </li>
    );
  }
}

export default StudentListItem;
