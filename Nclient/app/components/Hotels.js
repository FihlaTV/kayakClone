import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { render } from 'react-dom';
import { Calendar } from 'react-date-range';

class Hotels extends React.Component {
  render() {
    return (
      <div className="hotelClass">
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

export default Hotels;
