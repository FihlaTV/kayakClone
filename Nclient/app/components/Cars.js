import React, { Component } from 'react';
import { Button } from 'reactstrap';

class SameDrop extends React.Component {
  render() {
    return (
      <div className="radioInput">
        <input placeholder="Location" className="carsInputSame locationImage" />
        <input placeholder="From Date" className="carsInputSame dateImage" />
        <input placeholder="To Date" className="carsInputSame dateImage" />
        <Button> --> </Button>
      </div>
    );
  }
}

class DiffDrop extends React.Component {
  render() {
    return (
      <div className="radioInput">
        <input placeholder="From" className="carsInputDiff locationImage" />
        <input placeholder="To" className="carsInputDiff locationImage" />
        <input placeholder="From Date" className="carsInputDiff dateImage" />
        <input placeholder="To Date" className="carsInputDiff dateImage" />
        <Button> --> </Button>
      </div>
    );
  }
}

class Cars extends React.Component {
  constructor() {
    super();
    this.state = {
      diffDrop: false,
      sameDrop: true,
      location: '',
      toDate: '',
      fromDate: ''
    };
    this.handleDiffDrop = this.handleDiffDrop.bind(this);
    this.handleSameDrop = this.handleSameDrop.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDiffDrop() {
    this.setState({
      diffDrop: true,
      sameDrop: false
    });
  }
  handleSameDrop() {
    this.setState({
      diffDrop: false,
      sameDrop: true
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    const { location, toDate, fromDate } = this.state;
    console.log(this.state);
  }
  render() {
    const divStyle = {
      color: 'black',
      fontSize: '12px',
      padding: '3px 2px'
    };

    const { location, toDate, fromDate } = this.state;
    return (
      <div className="flights">
        <form onSubmit={this.handleSubmit}>
          <input
            onClick={this.handleSameDrop}
            type="radio"
            name="radio"
            className="radio"
            value="sameDrop"
            defaultChecked
          />
          <span className="radioButton">Same-Drop off</span>
          <input
            onClick={this.handleDiffDrop}
            type="radio"
            name="radio"
            className="radio"
            value="diffDrop"
          />
          <span className="radioButton">Different-Drop off</span>

          <div className="radioInput">
            <input
              onChange={this.handleChange}
              placeholder="Location"
              className="carsInputSame locationImage"
              name="location"
              value={location}
            />
            <input
              onChange={this.handleChange}
              placeholder="From Date"
              className="carsInputSame dateImage"
              name="fromDate"
              value={fromDate}
            />
            <input
              onChange={this.handleChange}
              placeholder="To Date"
              className="carsInputSame dateImage"
              name="toDate"
              value={toDate}
            />
            <Button onClick={this.handleSubmit}> --> </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default Cars;
