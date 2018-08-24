import React, { Component } from 'react';
import TutorList from './TutorList';
import './style.css';

class Tutors extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchTokenCount();
  }

  render() {
    return (
      <div className="Tutors">
        <h1 id="tutors-h1">Tutors</h1>
        <h2>
          {
            this.props.tokenCount
            /*Temp h2 to display tokencount of current user*/
          }
        </h2>
        {/* Dropdown to select subject to sort by */}
        <TutorList />
      </div>
    );
  }
}

export default Tutors;
