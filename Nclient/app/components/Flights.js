import React, { Component } from 'react';
import { Button } from 'reactstrap';

class Flights extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oneWay: true,
      twoWay: false,
      showOneWay: true,
      showTwoWay: false,
      fromPlace: '',
      toPlace: '',
      fromDate: '',
      toDate: '',
      numGuest: ''
    };
    this.handleOneWay = this.handleOneWay.bind(this);
    this.handleTwoWay = this.handleTwoWay.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleSubmit(e) {
    const {
      oneWay,
      twoWay,
      location,
      toPlace,
      fromPlace,
      toDate,
      fromDate,
      numGuest
    } = this.state;
    console.log(this.state);
  }

  handleOneWay() {
    const { oneWay, twoWay } = this.state;
    this.setState({
      oneWay: true,
      twoWay: false
    });
  }
  handleTwoWay() {
    const { oneWay, twoWay } = this.state;
    this.setState({
      oneWay: false,
      twoWay: true
    });
  }
  render() {
    const {
      oneWay,
      twoWay,
      location,
      toPlace,
      fromPlace,
      toDate,
      fromDate,
      numGuest
    } = this.state;
    const divStyle = {
      color: 'black',
      fontSize: '12px',
      padding: '3px 2px'
    };
    return (
      <div className="flights">
        <form onSubmit={this.handleSubmit}>
          <input
            onClick={this.handleOneWay}
            type="radio"
            name="radio"
            className="radio"
            value="oneway"
            defaultChecked
          />
          <span className="radioButton">One-Way</span>
          <input
            onClick={this.handleTwoWay}
            type="radio"
            name="radio"
            className="radio"
            value="roundtrip"
          />
          <span className="radioButton">Round-Trip</span>
          <div className="radioInput">
            <input
              onChange={this.handleChange}
              placeholder="From"
              className="flightInputOneWay locationImage"
              name="fromPlace"
              value={fromPlace}
            />
            <input
              onChange={this.handleChange}
              placeholder="To"
              className="flightInputTwoWay locationImage"
              name="toPlace"
              value={toPlace}
            />
            <input
              onChange={this.handleChange}
              placeholder="From Date"
              className="flightInputOneWay dateImage"
              name="fromDate"
              value={fromDate}
            />
            <input
              onChange={this.handleChange}
              placeholder="To Date"
              className="flightInputOneWay dateImage"
              name="toDate"
              value={toDate}
            />
            <input
              onChange={this.handleChange}
              placeholder="Guests"
              className="flightInputOneWay peopleImage"
              name="numGuest"
              value={numGuest}
            />
            <Button onClick={this.handleSubmit}> --> </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default Flights;
