import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import {GetFlightDetails,logOut,GetFiles,update_flight,add_flight} from "../actions/index";
import {connect} from 'react-redux';

class Analysis extends Component {
	constructor(props) {
  super(props);
  this.state = {
   //message:this.props.location.state.message,
    all_files:[],
    file_id:0
  };
}

componentWillMount() {
   }

   componentDidMount() {
   }

   componentWillReceiveProps(newProps) {

   }

   shouldComponentUpdate(newProps, newState) {
      return true;
   }

   componentWillUpdate(nextProps, nextState) {
}

   componentDidUpdate(prevProps, prevState) {
      /*
	    if(this.props.isAuthenticated===false)
        {
          console.log("called logout");
          this.props.history.push("/");
        }
        */
   }

   componentWillUnmount() {
   }

   render() {



    return (
      <div className="App col-md-12">
      <div className="col-md-2">

<div className="maestro-nav__feature-wrap"><label className="label-color" onClick={() => {
          this.props.GetFiles()}}>Flights</label></div>
<div className="maestro-nav__feature-wrap"><label className="label-color" onClick={() => {
          this.props.GetFiles()}}>Hotels</label></div>
<div className="maestro-nav__feature-wrap"><label className="label-color" onClick={() => {
          this.props.GetFiles()}}>Cars</label></div>
<div className="maestro-nav__feature-wrap"><label className="label-color" onClick={() => {
          this.props.GetFiles()}}>Users</label></div>
<div className="maestro-nav__feature-wrap"><label className="label-color" onClick={() => {
          this.props.GetFiles()}}>Analysis</label></div>

<div className="maestro-nav__feature-wrap">
<input type="submit" className="btn btn-info" value="sign out" onClick={() => {
                                     this.props.logOut()}} />
                                     </div>
      </div>
      <div className="col-md-10">
<div>
<h1 className="text-center">Dashboard</h1>
</div>


<div className="col-md-8">
         <br/><br/>
        <div className="row"></div>  

      <div className="row">
       
<table  className="table table-hover">
<tbody>


      </tbody></table>
      </div>
      </div>

            <div className="pull-right col-md-4">

</div> 
      </div>

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
        GetFlightDetails:(flight_id)=>dispatch(GetFlightDetails(flight_id)),
        update_flight:(flight_id,duration,costFlight,destination,source,fligtName,srcIata,time,Date,destIata,Day)=>dispatch(update_flight(flight_id,duration,costFlight,destination,source,fligtName,srcIata,time,Date,destIata,Day)),
        add_flight:(duration,costFlight,destination,source,fligtName,srcIata,time,Date,destIata,Day)=>dispatch(add_flight(duration,costFlight,destination,source,fligtName,srcIata,time,Date,destIata,Day))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Analysis);

