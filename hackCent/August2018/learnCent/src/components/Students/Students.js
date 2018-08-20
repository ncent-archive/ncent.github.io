import React, { Component } from 'react';
import StudentList from './StudentList';
import './style.css';

class Students extends Component {
  render() {
    return (
      <div className="Students">
        <h1 id="students-h1">Student Requests</h1>
        <StudentList />
      </div>
    );
  }
}

export default Students;
