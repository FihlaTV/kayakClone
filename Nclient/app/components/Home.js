import React from 'react';
import Hotels from './Hotels';
import Header from './Header';
import Headbar from './Headbar';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import { faSpinner } from '@fortawesome/fontawesome-free-solid';
fontawesome.library.add(brands, faSpinner);
import Building from 'react-icons/lib/fa/building-o';
import Plane from 'react-icons/lib/fa/plane';
import Car from 'react-icons/lib/fa/cab';
import Map from 'react-icons/lib/fa/map-marker';
import Calendar from 'react-icons/lib/fa/calendar';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: '1',
      radioButtonActive: false
    };
  }

  render() {
    const { selectedOption, radioButtonActive } = this.state;
    return (
      <div className="global-wrap">
        <header id="main-header">
          <div className="header-top">
            <div className="container">
              <div className="nav">
                <ul className="slimmenu" id="slimmenu">
                  <li className="active">
                    <img className="kayakLogo" src={'../../img/kayak.jpg'} />
                  </li>
                  <li>
                    <a>Hotels</a>
                  </li>
                  <li>
                    <a>Flights</a>
                  </li>
                  <li>
                    <a>Cars</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>

        <div className="top-area show-onload">
          <div className="bg-holder full">
            <div className="bg-mask" />
            <div className="bg-img" />

            <div className="bg-content">
              <div className="container" />
            </div>
            <div className="bg-front full-height">
              <div className="container rel full-height">
                <div className="search-tabs search-tabs-bg search-tabs-bottom">
                  <div className="tabbable">
                    <ul className="nav nav-tabs" id="myTab">
                      <li className="active">
                        <a href="#tab-1" data-toggle="tab">
                          <Building /> <span>Hotels</span>
                        </a>
                      </li>
                      <li>
                        <a href="#tab-2" data-toggle="tab">
                          <Plane /> <span>Flights</span>
                        </a>
                      </li>
                      <li>
                        <a href="#tab-4" data-toggle="tab">
                          <Car /> <span>Cars</span>
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content">
                      <div className="tab-pane fade in active" id="tab-1">
                        <h2>Search and Save on Hotels</h2>
                        <form>
                          <div className="row">
                            <div className="col-md-4">
                              <div className="form-group form-group-lg form-group-icon-left">
                                <Map />
                                <label>Where are you going?</label>
                                <input
                                  className="typeahead form-control"
                                  placeholder="City, Airport, Point of Interest or U.S. Zip Code"
                                  type="text"
                                />
                              </div>
                            </div>
                            <div className="col-md-8">
                              <div
                                className="input-daterange"
                                data-date-format="M d, D"
                              >
                                <div className="row">
                                  <div className="col-md-3">
                                    <div className="form-group form-group-lg form-group-icon-left">
                                      <Calendar />
                                      <label>Check-in</label>
                                      <input
                                        className="form-control"
                                        name="start"
                                        type="text"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-3">
                                    <div className="form-group form-group-lg form-group-icon-left">
                                      <Calendar />
                                      <label>Check-out</label>
                                      <input
                                        className="form-control"
                                        name="end"
                                        type="text"
                                      />
                                    </div>
                                  </div>

                                  <div className="col-md-3">
                                    <div className="form-group form-group-lg form-group-select-plus">
                                      <label>Rooms</label>
                                      <div
                                        className="btn-group btn-group-select-num"
                                        data-toggle="buttons"
                                      >
                                        <label className="btn btn-primary active">
                                          <input type="radio" name="options" />1
                                        </label>
                                        <label className="btn btn-primary">
                                          <input type="radio" name="options" />2
                                        </label>
                                        <label className="btn btn-primary">
                                          <input type="radio" name="options" />3
                                        </label>
                                        <label className="btn btn-primary">
                                          <input type="radio" name="options" />3+
                                        </label>
                                      </div>
                                      <select className="form-control hidden">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option value="selected">4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>
                                        <option>11</option>
                                        <option>12</option>
                                        <option>13</option>
                                        <option>14</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-md-3">
                                    <div className="form-group form-group-lg form-group-select-plus">
                                      <label>Guests</label>
                                      <div
                                        className="btn-group btn-group-select-num"
                                        data-toggle="buttons"
                                      >
                                        <label className="btn btn-primary active">
                                          <input type="radio" name="options" />1
                                        </label>
                                        <label className="btn btn-primary">
                                          <input type="radio" name="options" />2
                                        </label>
                                        <label className="btn btn-primary">
                                          <input type="radio" name="options" />3
                                        </label>
                                        <label className="btn btn-primary">
                                          <input type="radio" name="options" />3+
                                        </label>
                                      </div>
                                      <select className="form-control hidden">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option value="selected">4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>
                                        <option>11</option>
                                        <option>12</option>
                                        <option>13</option>
                                        <option>14</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <button
                            className="btn btn-primary btn-lg"
                            type="submit"
                          >
                            Search for Hotels
                          </button>
                        </form>
                      </div>
                      <div className="tab-pane fade" id="tab-2">
                        <h2>Search for Cheap Flights</h2>
                        <form>
                          <div className="tabbable">
                            <ul
                              className="nav nav-pills nav-sm nav-no-br mb10"
                              id="flightChooseTab"
                            >
                              <li className="active">
                                <a href="#flight-search-1" data-toggle="tab">
                                  Round Trip
                                </a>
                              </li>
                              <li>
                                <a href="#flight-search-2" data-toggle="tab">
                                  One Way
                                </a>
                              </li>
                            </ul>
                            <div className="tab-content">
                              <div
                                className="tab-pane fade in active"
                                id="flight-search-1"
                              >
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-group form-group-lg form-group-icon-left">
                                          <i className="fa fa-map-marker input-icon" />
                                          <label>From</label>
                                          <input
                                            className="typeahead form-control"
                                            placeholder="City, Airport, U.S. Zip"
                                            type="text"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-group form-group-lg form-group-icon-left">
                                          <i className="fa fa-map-marker input-icon" />
                                          <label>To</label>
                                          <input
                                            className="typeahead form-control"
                                            placeholder="City, Airport, U.S. Zip"
                                            type="text"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div
                                      className="input-daterange"
                                      data-date-format="M d, D"
                                    >
                                      <div className="row">
                                        <div className="col-md-4">
                                          <div className="form-group form-group-lg form-group-icon-left">
                                            <i className="fa fa-calendar input-icon input-icon-highlight" />
                                            <label>Departing</label>
                                            <input
                                              className="form-control"
                                              name="start"
                                              type="text"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-4">
                                          <div className="form-group form-group-lg form-group-icon-left">
                                            <i className="fa fa-calendar input-icon input-icon-highlight" />
                                            <label>Returning</label>
                                            <input
                                              className="form-control"
                                              name="end"
                                              type="text"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-4">
                                          <div className="form-group form-group-lg form-group-select-plus">
                                            <label>Passngers</label>
                                            <div
                                              className="btn-group btn-group-select-num"
                                              data-toggle="buttons"
                                            >
                                              <label className="btn btn-primary active">
                                                <input type="radio" name="options" />1
                                              </label>
                                              <label className="btn btn-primary">
                                                <input type="radio" name="options" />2
                                              </label>
                                              <label className="btn btn-primary">
                                                <input type="radio" name="options" />3
                                              </label>
                                              <label className="btn btn-primary">
                                                <input type="radio" name="options" />3+
                                              </label>
                                            </div>
                                            <select className="form-control hidden">
                                              <option>1</option>
                                              <option>2</option>
                                              <option>3</option>
                                              <option value="selected">
                                                4
                                              </option>
                                              <option>5</option>
                                              <option>6</option>
                                              <option>7</option>
                                              <option>8</option>
                                              <option>9</option>
                                              <option>10</option>
                                              <option>11</option>
                                              <option>12</option>
                                              <option>13</option>
                                              <option>14</option>
                                            </select>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="tab-pane fade"
                                id="flight-search-2"
                              >
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="form-group form-group-lg form-group-icon-left">
                                          <i className="fa fa-map-marker input-icon" />
                                          <label>From</label>
                                          <input
                                            className="typeahead form-control"
                                            placeholder="City, Airport, U.S. Zip"
                                            type="text"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-group form-group-lg form-group-icon-left">
                                          <i className="fa fa-map-marker input-icon" />
                                          <label>To</label>
                                          <input
                                            className="typeahead form-control"
                                            placeholder="City, Airport, U.S. Zip"
                                            type="text"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div
                                      className="input-daterange"
                                      data-date-format="M d, D"
                                    >
                                      <div className="row">
                                        <div className="col-md-4">
                                          <div className="form-group form-group-lg form-group-icon-left">
                                            <i className="fa fa-calendar input-icon input-icon-highlight" />
                                            <label>Departing</label>
                                            <input
                                              className="date-pick form-control"
                                              data-date-format="M d, D"
                                              type="text"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-4">
                                          <div className="form-group form-group-lg form-group-select-plus">
                                            <label>Passngers</label>
                                            <div
                                              className="btn-group btn-group-select-num"
                                              data-toggle="buttons"
                                            >
                                              <label className="btn btn-primary active">
                                                <input type="radio" name="options" />1
                                              </label>
                                              <label className="btn btn-primary">
                                                <input type="radio" name="options" />2
                                              </label>
                                              <label className="btn btn-primary">
                                                <input type="radio" name="options" />3
                                              </label>
                                              <label className="btn btn-primary">
                                                <input type="radio" name="options" />3+
                                              </label>
                                            </div>
                                            <select className="form-control hidden">
                                              <option>1</option>
                                              <option>2</option>
                                              <option>3</option>
                                              <option value="selected">
                                                4
                                              </option>
                                              <option>5</option>
                                              <option>6</option>
                                              <option>7</option>
                                              <option>8</option>
                                              <option>9</option>
                                              <option>10</option>
                                              <option>11</option>
                                              <option>12</option>
                                              <option>13</option>
                                              <option>14</option>
                                            </select>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <button
                            className="btn btn-primary btn-lg"
                            type="submit"
                          >
                            Search for Flights
                          </button>
                        </form>
                      </div>
                      <div className="tab-pane fade" id="tab-3">
                        <h2>Find Your Perfect Home</h2>
                        <form>
                          <div className="row">
                            <div className="col-md-4">
                              <div className="form-group form-group-lg form-group-icon-left">
                                <i className="fa fa-map-marker input-icon" />
                                <label>Where are you going?</label>
                                <input
                                  className="typeahead form-control"
                                  placeholder="City, Airport, Point of Interest or U.S. Zip Code"
                                  type="text"
                                />
                              </div>
                            </div>
                            <div className="col-md-8">
                              <div
                                className="input-daterange"
                                data-date-format="M d, D"
                              >
                                <div className="row">
                                  <div className="col-md-3">
                                    <div className="form-group form-group-lg form-group-icon-left">
                                      <i className="fa fa-calendar input-icon input-icon-highlight" />
                                      <label>Check-in</label>
                                      <input
                                        className="form-control"
                                        name="start"
                                        type="text"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-3">
                                    <div className="form-group form-group-lg form-group-icon-left">
                                      <i className="fa fa-calendar input-icon input-icon-highlight" />
                                      <label>Check-out</label>
                                      <input
                                        className="form-control"
                                        name="end"
                                        type="text"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-3">
                                    <div className="form-group form-group-lg form-group-select-plus">
                                      <label>Rooms</label>
                                      <div
                                        className="btn-group btn-group-select-num"
                                        data-toggle="buttons"
                                      >
                                        <label className="btn btn-primary active">
                                          <input type="radio" name="options" />1
                                        </label>
                                        <label className="btn btn-primary">
                                          <input type="radio" name="options" />2
                                        </label>
                                        <label className="btn btn-primary">
                                          <input type="radio" name="options" />3
                                        </label>
                                        <label className="btn btn-primary">
                                          <input type="radio" name="options" />3+
                                        </label>
                                      </div>
                                      <select className="form-control hidden">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option value="selected">4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>
                                        <option>11</option>
                                        <option>12</option>
                                        <option>13</option>
                                        <option>14</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-md-3">
                                    <div className="form-group form-group-lg form-group-select-plus">
                                      <label>Guests</label>
                                      <div
                                        className="btn-group btn-group-select-num"
                                        data-toggle="buttons"
                                      >
                                        <label className="btn btn-primary active">
                                          <input type="radio" name="options" />1
                                        </label>
                                        <label className="btn btn-primary">
                                          <input type="radio" name="options" />2
                                        </label>
                                        <label className="btn btn-primary">
                                          <input type="radio" name="options" />3
                                        </label>
                                        <label className="btn btn-primary">
                                          <input type="radio" name="options" />3+
                                        </label>
                                      </div>
                                      <select className="form-control hidden">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option value="selected">4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10</option>
                                        <option>11</option>
                                        <option>12</option>
                                        <option>13</option>
                                        <option>14</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <button
                            className="btn btn-primary btn-lg"
                            type="submit"
                          >
                            Search for Vacation Rentals
                          </button>
                        </form>
                      </div>
                      <div className="tab-pane fade" id="tab-4">
                        <h2>Search for Cheap Rental Cars</h2>
                        <form>
                          <div className="row">
                            <div className="col-md-8">
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="form-group form-group-lg form-group-icon-left">
                                    <i className="fa fa-map-marker input-icon" />
                                    <label>Pick-up Location</label>
                                    <input
                                      className="typeahead form-control"
                                      placeholder="City, Airport, U.S. Zip"
                                      type="text"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group form-group-lg form-group-icon-left">
                                    <i className="fa fa-map-marker input-icon" />
                                    <label>Drop-off Location</label>
                                    <input
                                      className="typeahead form-control"
                                      placeholder="City, Airport, U.S. Zip"
                                      type="text"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div
                                className="input-daterange"
                                data-date-format="M d, D"
                              >
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="form-group form-group-lg form-group-icon-left">
                                      <i className="fa fa-calendar input-icon input-icon-highlight" />
                                      <label>Pick-up Date</label>
                                      <input
                                        className="form-control"
                                        name="start"
                                        type="text"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group form-group-lg form-group-icon-left">
                                      <i className="fa fa-calendar input-icon input-icon-highlight" />
                                      <label>Drop-ff Date</label>
                                      <input
                                        className="form-control"
                                        name="end"
                                        type="text"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <button
                            className="btn btn-primary btn-lg"
                            type="submit"
                          >
                            Search for Rental Cars
                          </button>
                        </form>
                      </div>
                      <div className="tab-pane fade" id="tab-5">
                        <h2>Search for Activities</h2>
                        <form>
                          <div className="row">
                            <div className="col-md-8">
                              <div className="form-group form-group-lg form-group-icon-left">
                                <i className="fa fa-map-marker input-icon" />
                                <label>Where are you going?</label>
                                <input
                                  className="typeahead form-control"
                                  placeholder="City, Airport, Point of Interest or U.S. Zip Code"
                                  type="text"
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div
                                className="input-daterange"
                                data-date-format="M d, D"
                              >
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="form-group form-group-lg form-group-icon-left">
                                      <i className="fa fa-calendar input-icon input-icon-highlight" />
                                      <label>From</label>
                                      <input
                                        className="form-control"
                                        name="start"
                                        type="text"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group form-group-lg form-group-icon-left">
                                      <i className="fa fa-calendar input-icon input-icon-highlight" />
                                      <label>To</label>
                                      <input
                                        className="form-control"
                                        name="end"
                                        type="text"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <button
                            className="btn btn-primary btn-lg"
                            type="submit"
                          >
                            Search for Activities
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
