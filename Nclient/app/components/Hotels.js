import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { render } from 'react-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';
// import '../../assets/css/datepicker.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class Hotels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      toDate: '',
      fromDate: '',
      numGuest: '',
      startDate: moment(),
      selectedOption: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeCalendar = this.handleChangeCalendar.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
  }

  handleChangeSelect(selectedOption) {
    this.setState({ selectedOption });
    console.log(`Selected: ${selectedOption.label}`);
  }

  handleChangeCalendar(date) {
    this.setState({
      startDate: date
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    const { location, toDate, fromDate, numGuest } = this.state;
    const payload = {};
    console.log(this.state);
  }

  render() {
    const { location, toDate, fromDate, numGuest } = this.state;
    return (
      <div className="hotelClass">
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            placeholder="Location"
            name="location"
            value={location}
            className="hotelInput locationImage"
          />
          <input
            onChange={this.handleChange}
            placeholder="From"
            name="fromDate"
            value={fromDate}
            className="hotelInput dateImage"
          />
          <input
            onChange={this.handleChange}
            placeholder="To"
            name="toDate"
            value={toDate}
            className="hotelInput dateImage"
          />

          <input
            onChange={this.handleChange}
            placeholder="Number of guests"
            name="numGuest"
            value={numGuest}
            className="hotelInput peopleImage"
          />

          <DatePicker
            className="datepicker"
            selected={this.state.startDate}
            onChange={this.handleChange}
          />

          <Select
            name="form-field-name"
            value={this.state.value}
            onChange={this.handleChange}
            options={[
              { value: 'one', label: 'One' },
              { value: 'two', label: 'Two' }
            ]}
          />
          <Button onClick={this.handleSubmit}> --> </Button>
        </form>
      </div>
    );
  }
}

export default Hotels;
