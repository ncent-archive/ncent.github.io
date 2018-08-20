import React, { Component } from 'react';
import TutorListItem from './TutorListItem';

class TutorList extends Component {
  render() {
    return (
      <ul className="TutorList">
        <TutorListItem />
        <TutorListItem />
      </ul>
    );
  }
}

export default TutorList;
