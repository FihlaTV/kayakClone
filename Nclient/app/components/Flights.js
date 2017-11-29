import React, { Component } from 'react';
import { Button } from 'reactstrap';

class Flights extends React.Component {
  constructor() {
    super();
    this.state = {
      slidingActive: false
    };
  }
  render() {
    const divStyle = {
      color: 'black',
      fontSize: '12px',
      padding: '3px 2px'
    };
    return (
      <div className="flights">
        <nav>
          <ul>
            <li>
              <a style={divStyle} href="#">
                One-Way
              </a>
            </li>
            <li>
              <a style={divStyle} href="#">
                Round-Trip
              </a>
            </li>
          </ul>
        </nav>
        <input placeholder="Location" className="hotelInput locationImage" />
        <input placeholder="Date" className="hotelInput dateImage" />
        <input
          placeholder="Number of guests"
          className="hotelInput peopleImage"
        />
        <Button> --> </Button>
      </div>
    );
  }
}

export default Flights;
