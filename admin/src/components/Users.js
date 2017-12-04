import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import {UpdateUser,logOut,GetUsers,getUserDetails} from "../actions/index";
import {connect} from 'react-redux';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import { Link } from 'react-router-dom';

class Users extends Component {
	constructor(props) {
  super(props);
  this.state = {
   //message:this.props.location.state.message,

    all_files:[],
    file_id:0,
      showModal: false,
      email:'',
      firstname:'' ,
      lastname:'' ,
      address:'' ,
      city:'' ,
      state:'' ,
      zipcode:'' ,
      phone:'' ,
      image:'' ,
      isActive:''
  };
}
    openModal(item) {
	    this.props.getUserDetails(item);
        console.log('called');
        this.setState({showModal: true});
    }
    closeModal() {
        this.setState({showModal : false});
    }

    submitModal(email ,firstname,lastname,address,city,state,zipcode,phone) {
        this.props.UpdateUser(email ,firstname,lastname,address,city,state,zipcode,phone);
        this.setState({showModal : false});
    }

componentWillMount() {
    this.props.GetUsers();
   }

   componentDidMount() {
   }

   componentWillReceiveProps(newProps) {
       this.setState({
           email: newProps.userinfo.email,
           firstname: newProps.userinfo.firstname,
           lastname: newProps.userinfo.lastname,
           address: newProps.userinfo.address,
           city: newProps.userinfo.city,
           state: newProps.userinfo.state,
           zipcode: newProps.userinfo.zipcode,
           phone: newProps.userinfo.phone,
           image: newProps.userinfo.image,
           isActive: newProps.userinfo.isActive
       })
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
          this.props.users.map((item,key)=>{
            return(<tr key={key}>
              <td>{item.email}</td>
              <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td><Link to={{ pathname: '/Tripdetails', state: { Username:item.email},target:"_blank"}} className="btn btn-info" >View Trip History</Link></td>
                <td><input type="submit" value="View Details"  onClick={() => this.openModal(item.email)} className="btn btn-info"/></td>

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
<h1 className="text-center">All Users</h1>
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
      <Modal.Title>Update Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="col-md-12">
          <div className="row">
          <div className="col-md-4">
          <label className="form-control">User Firstname:</label>
      </div>
      <div className="col-md-8">
          <input className="form form-control" type="text" id="firstname" value={this.state.firstname}  onChange={(e) => {
          this.setState({
              firstname : e.target.value
          })
      }}/ >
      </div>
      </div>

      <div className="row">
          <div className="col-md-4">
          <label className="form-control">User Lastname:</label>
      </div>
      <div className="col-md-8">
          <input className="form form-control" type="text" id="lastname"  value ={this.state.lastname}  onChange={(e) => {
          this.setState({
              lastname : e.target.value
          })
      }}  / >
      </div>
      </div>

      <div className="row">
          <div className="col-md-4">
          <label className="form-control">User Address:</label>
      </div>
      <div className="col-md-8">
          <input className="form form-control" type="text" id="address" value={this.state.address} onChange={(e) => {
          this.setState({
              address : e.target.value
          })
      }}/ >
      </div>
      </div>

      <div className="row">
          <div className="col-md-4">
          <label className="form-control">City:</label>
      </div>
      <div className="col-md-8">
          <input className="form form-control" type="text" id="city" value={this.state.city} onChange={(e) => {
          this.setState({
              city : e.target.value
          })
      }}/ >
      </div>
      </div>

      <div className="row">
          <div className="col-md-4">
          <label className="form-control">State:</label>
      </div>
      <div className="col-md-8">
          <input className="form form-control" type="text" id="state" value={this.state.state} onChange={(e) => {
          this.setState({
              state : e.target.value
          })
      }}/ >
      </div>
      </div>

      <div className="row">
          <div className="col-md-4">
          <label className="form-control">Zipcode:</label>
      </div>
      <div className="col-md-8">
          <input className="form form-control" type="text" pattern="[0-9]*"  id="zipcode" value={this.state.zipcode} onChange={(e) => {
          this.setState({
              zipcode : (e.target.validity.valid) ? e.target.value : this.state.zipcode
          })
      }}/ >
      </div>
      </div>

      <div className="row">
          <div className="col-md-4">
          <label className="form-control">Phone:</label>
      </div>
      <div className="col-md-8">
          <input className="form form-control" type="text" id="phone" value={this.state.phone} onChange={(e) => {
          this.setState({
              phone : e.target.value
          })
      }}/ >
      </div>
      </div>


      </div>
      </Modal.Body>
      <Modal.Footer>
      <Button bsStyle="danger" onClick={() => this.closeModal()}>Close</Button>

      <Button className="btn btn-info" onClick={() => this.submitModal(this.props.userinfo.email,document.getElementById("firstname").value,
          document.getElementById("lastname").value,document.getElementById("address").value,document.getElementById("city").value,
          document.getElementById("state").value,document.getElementById("zipcode").value,
          document.getElementById("phone").value)} >Update</Button>
      </Modal.Footer>
      </Modal>

</div> //end of main div
        
    );
  }
}

const mapStateToProps=(state)=> {
    return {
        users:state.reducer2.users,
      userinfo:state.reducer3.userinfo
    };
};

const mapDispatchToProps=(dispatch)=> {
    return {
        logOut:()=>dispatch(logOut()),
        GetUsers:()=>dispatch(GetUsers()),
        getUserDetails:(email)=>dispatch(getUserDetails(email)),
        UpdateUser:(email ,firstname,lastname,address,city,state,zipcode,phone)=>dispatch(UpdateUser(email ,firstname,lastname,address,city,state,zipcode,phone))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Users);

