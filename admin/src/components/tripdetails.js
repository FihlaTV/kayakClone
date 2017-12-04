import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import {GetFlightDetails,logOut,GetFiles,update_flight,add_flight,GetUsers,GetTripdetails,GetReceipt} from "../actions/index";
import {connect} from 'react-redux';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import { Link } from 'react-router-dom';

class Tripdetails extends Component {
	constructor(props) {
  super(props);
  this.state = {
   //message:this.props.location.state.message,
      user_name:this.props.location.state.Username,
    all_files:[],
    file_id:0,
      showModal: false,
      showAddModal:false,
      flight_id:'',
      duration: 0,
      costFlight: 0,
      destination:'',
      source: '',
      fligtName: '',
      srcIata: '',
      time: 0,
      Date: '',
      destIata: '',
      Day: '',
      flightdetails:{}
  };
}
    openModal(tripid,bookingtype) {
          //  this.props.GetFlightDetails(item);
        console.log('called:'+tripid+":"+bookingtype);
        this.props.GetReceipt(tripid,bookingtype);
        this.setState({showModal: true});
    }
    closeModal() {
        this.setState({showModal : false});
    }

componentWillMount() {
	    console.log('email:'+this.state.user_name)
    this.props.GetTripdetails(this.state.user_name);
   }

   componentDidMount() {
   }

   componentWillReceiveProps(newProps) {
       this.setState({flightdetails:this.props.flightdetails,
           flight_id:newProps.flightdetails._id,
           duration: newProps.flightdetails.duration,
           costFlight: newProps.flightdetails.costFlight,
           destination:newProps.flightdetails.destination,
           source: newProps.flightdetails.source,
           fligtName: newProps.flightdetails.fligtName,
           srcIata: newProps.flightdetails.srcIata,
           time: newProps.flightdetails.time,
           Date: newProps.flightdetails.Date,
           destIata: newProps.flightdetails.destIata,
           Day: newProps.flightdetails.Day});
   }

   shouldComponentUpdate(newProps, newState) {
      return true;
   }

   componentWillUpdate(nextProps, nextState) {
}

   componentDidUpdate(prevProps, prevState) {
      if(this.props.isAuthenticated===false)
        {
          console.log("called logout");
          this.props.history.push("/");
        }
   }

   componentWillUnmount() {
   }

  render() {
    var files=
          this.props.tripdata.map((item,key)=>{
            return(<tr key={key}>
              <td>{item.email}</td>
              <td>{item.bookingtype}</td>
                <td>{item.totalamount}</td>
                <td><input type="submit" value="View Details"  onClick={() => this.openModal(item.tripid,item.bookingtype)} className="btn btn-info" name="create_dir" id="create_dir"/></td>
                            
              </tr>)
          }
          );

    return (
      <div className="App col-md-12">
      <div className="col-md-2">

          <div className="maestro-nav__feature-wrap"><Link to="/Flights"><label className="label-color">Flights</label></Link></div>
          <div className="maestro-nav__feature-wrap"><Link to="/Hotels"><label className="label-color">Hotels</label></Link></div>
          <div className="maestro-nav__feature-wrap"><Link to="/Cars"><label className="label-color">Cars</label></Link></div>
          <div className="maestro-nav__feature-wrap"><Link to="/Users" className="label-color">Users</Link></div>
          <div className="maestro-nav__feature-wrap"><Link to="/Dashboard"><label className="label-color">Analysis</label></Link></div>

          <div className="maestro-nav__feature-wrap">
              <input type="submit" className="btn btn-info" value="sign out" onClick={() => {
                  this.props.logOut()}} />
          </div>
      </div>
      <div className="col-md-10">
<div>
<h1 className="text-center">Recent trip details for:{ this.state.user_name}</h1>
</div>


<div className="col-md-8">
         <br/><br/>
        <div className="row"></div>  

      <div className="row">
       
<table  className="table table-hover">
<tbody>
      {files}
      </tbody></table>
      </div>
      </div>

            <div className="pull-right col-md-4">
</div> 
      </div>

      <Modal show={this.state.showModal} onHide={() => this.closeModal()}>
  <Modal.Header closeButton>
      <Modal.Title>Flight Ticket</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="col-md-12">
          <div className="row">
      {this.props.flightticket.map((item,key)=>{
          return(<tr key={key}>
          <tr>
          <td>Email:</td>
          <td>{item.email}</td>
          </tr>
          <tr>
          <td>Passenger Name:</td>
      <td>{item.flightpassengerfirstname} {item.flightpassengerlastname}</td>
          </tr>
          <tr>
      <td>Passenger Gender:</td>
      <td>{item.flightpassengergender}</td>
          </tr>
          <tr>
      <td>Journey Date:</td>
      <td>{item.journeydate}</td>
          </tr>
          <tr>
      <td>Airlines:</td>
      <td>{item.airlines}</td>
</tr>
      <tr>
      <td>Source:</td>
      <td>{item.flightsource}</td>
      </tr>

      <tr>
      <td>Destination:</td>
      <td>{item.flightdestination}</td>
      </tr>
          <tr>
      <td>Amount:</td>
      <td>{item.totalamount}</td>
          </tr>
      <br/>
          </tr>)
      }
      )}

  </div>
      </div>
      </Modal.Body>
      <Modal.Footer>
      <Button bsStyle="danger" onClick={() => this.closeModal()}>Close</Button>
      </Modal.Footer>
      </Modal>

</div> //end of main div
        
    );
  }
}

const mapStateToProps=(state)=> {
    return {
        tripdata:state.reducer2.tripdata,
        users:state.reducer2.users,
        Username:state.reducer.Username,
        isAuthenticated:state.reducer.isAuthenticated,
        flightdetails:state.reducer3.flightdetails,
        flightticket:state.reducer2.flightticket
    };
};

const mapDispatchToProps=(dispatch)=> {
    return {
        logOut:()=>dispatch(logOut()),
        GetFiles:(user_name)=>dispatch(GetFiles(user_name)),
        GetTripdetails:(user_name)=>dispatch(GetTripdetails(user_name)),
        GetReceipt:(tripid,bookingtype)=>dispatch(GetReceipt(tripid,bookingtype)),
        GetUsers:()=>dispatch(GetUsers()),
        GetFlightDetails:(flight_id)=>dispatch(GetFlightDetails(flight_id)),
        update_flight:(flight_id,duration,costFlight,destination,source,fligtName,srcIata,time,Date,destIata,Day)=>dispatch(update_flight(flight_id,duration,costFlight,destination,source,fligtName,srcIata,time,Date,destIata,Day)),
        add_flight:(duration,costFlight,destination,source,fligtName,srcIata,time,Date,destIata,Day)=>dispatch(add_flight(duration,costFlight,destination,source,fligtName,srcIata,time,Date,destIata,Day))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Tripdetails);

