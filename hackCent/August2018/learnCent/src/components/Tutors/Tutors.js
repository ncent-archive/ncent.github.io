import React, { Component } from 'react';
import TutorList from './TutorList';
import './style.css';

class Tutors extends Component {
  render() {
    return (
      <div className="Tutors">
        <h1 id="tutors-h1">Tutors</h1>
        {/* Dropdown to select subject to sort by */}
        <TutorList />
      </div>
    );
  }
}

export default Tutors;
