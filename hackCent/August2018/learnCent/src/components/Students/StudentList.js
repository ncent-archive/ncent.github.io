import React, { Component } from 'react';
import StudentListItem from './StudentListItem';

class StudentList extends Component {
  render() {
    return (
      <ul className="StudentList">
        <StudentListItem />
        <StudentListItem />
      </ul>
    );
  }
}

export default StudentList;
