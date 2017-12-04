import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import {GetFlightDetails,logOut,GetFiles,update_flight,add_flight,GetUsers} from "../actions/index";
import {connect} from 'react-redux';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import { Link } from 'react-router-dom';

class Home extends Component {
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
    openModal(item) {
            this.props.GetFlightDetails(item);
        this.setState({showModal: true});
    }
    closeModal() {
        this.setState({showModal : false});
    }

    openAddModal() {

        this.setState({showAddModal: true});
    }
    closeAddModal() {
        console.log('modal called');
        this.setState({showAddModal : false});
    }

    submitModal(flightid,duration,cost,dest,src,fligtName,srcIata,time,Date,destIata,Day) {
        this.props.update_flight(flightid,duration,cost,dest,src,fligtName,srcIata,time,Date,destIata,Day);
        this.setState({showModal : false});
    }

    submitAddModal(duration,cost,dest,src,fligtName,srcIata,time,Date,destIata,Day) {
        console.log("duration:"+duration)
        console.log("cost:"+cost)
        console.log("destination:"+dest)
        console.log("src:"+src)

        this.props.add_flight(duration,cost,dest,src,fligtName,srcIata,time,Date,destIata,Day);
        this.setState({showAddModal : false});
    }

componentWillMount() {
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
          this.props.all_files.map((item,key)=>{
            return(<tr key={key}>
              <td>{item.fligtName}</td>
              <td>{item.source}</td>
                <td>{item.destination}</td>
                <td><input type="submit" value="Update"  onClick={() => this.openModal(item._id)} className="btn btn-info" name="create_dir" id="create_dir"/></td>
                            
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
<h1 className="text-center">Home</h1>
</div>


<div className="col-md-8">
        <div className="row pull-left">Recent Files</div> <br/><br/>
        <div className="row"></div>  

      <div className="row">
       
<table  className="table table-hover">
<tbody>
      {files}
      </tbody></table>
      </div>
      </div>

            <div className="pull-right col-md-4">
<input type="submit" value="Add New Flight" className="btn btn-info" name="create_dir" id="create_dir" onClick={() => this.openAddModal()}/><br/><br/>

</div> 
      </div>


      <Modal show={this.state.showAddModal} onHide={() => this.closeAddModal()}>
  <Modal.Header closeButton>
      <Modal.Title>Add Flight Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="col-md-12">
          <div className="row">
          <div className="col-md-4">
          <label className="form-control">Airlines:</label>
      </div>
      <div className="col-md-8">
          <input className="form form-control" type="text" id="flight_name" / >
      </div>
      </div>

      <div className="row">
          <div className="col-md-4">
          <label className="form-control">Flight duration:</label>
      </div>
      <div className="col-md-8">
          <input className="form form-control" type="text" id="dur"    / >
          </div>
          </div>

          <div className="row">
          <div className="col-md-4">
          <label className="form-control">Flight cost:</label>
      </div>
      <div className="col-md-8">
          <input className="form form-control" type="text" id="cost" / >
      </div>
      </div>

      <div className="row">
          <div className="col-md-4">
          <label className="form-control">Flight source:</label>
      </div>
      <div className="col-md-8">
          <input className="form form-control" type="text" id="src" / >
      </div>
      </div>

      <div className="row">
          <div className="col-md-4">
          <label className="form-control">Flight destination:</label>
      </div>
      <div className="col-md-8">
          <input className="form form-control" type="text" id="dest" / >
      </div>
      </div>

      <div className="row">
          <div className="col-md-4">
          <label className="form-control">Flight time:</label>
      </div>
      <div className="col-md-8">
          <input className="form form-control" type="text" id="_time" / >
      </div>
      </div>

      <div className="row">
          <div className="col-md-4">
          <label className="form-control">Flight Date:</label>
      </div>
      <div className="col-md-8">
          <input className="form form-control" type="text" id="_Date" / >
      </div>
      </div>


      </div>
          </Modal.Body>
          <Modal.Footer>
          <Button bsStyle="danger" onClick={() => this.closeAddModal()}>Close</Button>

      <Button className="btn btn-info" onClick={() => this.submitAddModal(document.getElementById("dur").value,document.getElementById("cost").value,
          document.getElementById("dest").value,document.getElementById("src").value,document.getElementById("flight_name").value,document.getElementById("src").value,
          document.getElementById("_time").value,document.getElementById("_Date").value,document.getElementById("dest").value)
  } >Add</Button>
      </Modal.Footer>
      </Modal>

      <Modal show={this.state.showModal} onHide={() => this.closeModal()}>
  <Modal.Header closeButton>
      <Modal.Title>Update Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="col-md-12">
          <div className="row">
          <div className="col-md-4">
          <label className="form-control">Airlines:</label>
      </div>
      <div className="col-md-8">
          <input className="form form-control" type="text" id="flight_name" value={this.state.fligtName}  onChange={(e) => {
          this.setState({
              fligtName : e.target.value
          })
      }}/ >
      </div>
      </div>

      <div className="row">
          <div className="col-md-4">
          <label className="form-control">Flight duration:</label>
      </div>
      <div className="col-md-8">
          <input className="form form-control" type="text" id="dur"  value ={this.state.duration}  onChange={(e) => {
          this.setState({
              duration : e.target.value
          })
      }}  / >
      </div>
      </div>

      <div className="row">
          <div className="col-md-4">
          <label className="form-control">Flight cost:</label>
      </div>
      <div className="col-md-8">
          <input className="form form-control" type="text" id="cost" value={this.state.costFlight} onChange={(e) => {
          this.setState({
              costFlight : e.target.value
          })
      }}/ >
      </div>
      </div>

      <div className="row">
          <div className="col-md-4">
          <label className="form-control">Flight source:</label>
      </div>
      <div className="col-md-8">
          <input className="form form-control" type="text" id="src" value={this.state.source} onChange={(e) => {
          this.setState({
              source : e.target.value
          })
      }}/ >
      </div>
      </div>

      <div className="row">
          <div className="col-md-4">
          <label className="form-control">Flight destination:</label>
      </div>
      <div className="col-md-8">
          <input className="form form-control" type="text" id="dest" value={this.state.destination} onChange={(e) => {
          this.setState({
              destination : e.target.value
          })
      }}/ >
      </div>
      </div>

      <div className="row">
          <div className="col-md-4">
          <label className="form-control">Flight time:</label>
      </div>
      <div className="col-md-8">
          <input className="form form-control" type="text" id="_time" value={this.state.time} onChange={(e) => {
          this.setState({
              time : e.target.value
          })
      }}/ >
      </div>
      </div>

      <div className="row">
          <div className="col-md-4">
          <label className="form-control">Flight Date:</label>
      </div>
      <div className="col-md-8">
          <input className="form form-control" type="text" id="_Date" value={this.state.Date} onChange={(e) => {
          this.setState({
              Date : e.target.value
          })
      }}/ >
      </div>
      </div>


      </div>
      </Modal.Body>
      <Modal.Footer>
      <Button bsStyle="danger" onClick={() => this.closeModal()}>Close</Button>

      <Button className="btn btn-info" onClick={() => this.submitModal(this.props.flightdetails._id,document.getElementById("dur").value,document.getElementById("cost").value,
          document.getElementById("dest").value,document.getElementById("src").value,document.getElementById("flight_name").value,document.getElementById("src").value,
          document.getElementById("_time").value,document.getElementById("_Date").value,document.getElementById("dest").value)
  } >Update</Button>
      </Modal.Footer>
      </Modal>

</div> //end of main div
        
    );
  }
}

const mapStateToProps=(state)=> {
    return {
        all_files:state.reducer2.all_files,
        Username:state.reducer.Username,
        isAuthenticated:state.reducer.isAuthenticated,
        flightdetails:state.reducer3.flightdetails
    };
};

const mapDispatchToProps=(dispatch)=> {
    return {
        logOut:()=>dispatch(logOut()),
        GetFiles:(user_name)=>dispatch(GetFiles(user_name)),
        GetUsers:()=>dispatch(GetUsers()),
        GetFlightDetails:(flight_id)=>dispatch(GetFlightDetails(flight_id)),
        update_flight:(flight_id,duration,costFlight,destination,source,fligtName,srcIata,time,Date,destIata,Day)=>dispatch(update_flight(flight_id,duration,costFlight,destination,source,fligtName,srcIata,time,Date,destIata,Day)),
        add_flight:(duration,costFlight,destination,source,fligtName,srcIata,time,Date,destIata,Day)=>dispatch(add_flight(duration,costFlight,destination,source,fligtName,srcIata,time,Date,destIata,Day))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);

