import React, { Component } from 'react';
import '../App.css';
import {GetCarDetails,GetCars,update_car,add_car,GetCarsByCity} from "../actions/Cars";
import {logOut} from "../actions/index";
import {connect} from 'react-redux';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import { Link } from 'react-router-dom';

class Cars extends Component {
	constructor(props) {
  super(props);
  this.state = {
      showModal: false,
      showAddModal:false,
      car_id:'',
      city: '',
      price: 0,
      brand: ''
  };
}
    openModal(item) {
            this.props.GetCarDetails(item);
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

    submitModal(carid,city,price,brand) {
        this.props.update_car(carid,city,price,brand);
        this.setState({showModal : false});
    }

    submitAddModal(city,price,brand) {

        this.props.add_car(city,price,brand);
        this.setState({showAddModal : false});
    }

    SearchCars(statename)
    {
        this.props.GetCarsByCity(statename);
    }

componentWillMount() {
    this.props.GetCars();
}
   componentDidMount() {
   }

   componentWillReceiveProps(newProps) {
       this.setState({
           car_id:newProps.cardetails._id,
           city:newProps.cardetails.location,
           price:newProps.cardetails.price,
           brand:newProps.cardetails.brand
       });
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
          this.props.all_cars.map((item,key)=>{
            return(<tr key={key}>
              <td>{item.brand}</td>
              <td>{item.location}</td>
                <td>{item.price}</td>
                <td><input type="submit" value="Update"  onClick={() => this.openModal(item._id)} className="btn btn-info"/></td>
                            
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
<h1 className="text-center">Cars</h1>
</div>



    <div className="col-md-8">
        <br/><br/>
        <div className="row">
            <div className="col-md-4">
                <label className="label-color">City Name:</label>
            </div>
            <div className="col-md-4">
                <input type="text" placeholder="Enter City name to search" className="form form-control" id="searchState"/>
            </div>
            <div className="col-md-4">
                <input type="submit" value="Search" className="btn btn-info" id="search" onClick={() => this.SearchCars(document.getElementById("searchState").value)}/><br/><br/>
            </div>
        </div>

        <div className="hr-line-dashed label-color"></div>

        <div className="row">
       
<table  className="table table-hover">
<tbody>
      {files}
      </tbody></table>
      </div>
      </div>

            <div className="pull-right col-md-4">
<input type="submit" value="Add New Car" className="btn btn-info" onClick={() => this.openAddModal()}/><br/><br/>

</div> 
      </div>


      <Modal show={this.state.showAddModal} onHide={() => this.closeAddModal()}>
  <Modal.Header closeButton>
      <Modal.Title>Add Car Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="col-md-12">
          <div className="row">
          <div className="col-md-4">
          <label className="form-control">Car brand:</label>
      </div>
      <div className="col-md-8">
          <input className="form form-control" type="text" id="brand" / >
      </div>
      </div>

      <div className="row">
          <div className="col-md-4">
          <label className="form-control">Car city:</label>
      </div>
      <div className="col-md-8">
          <input className="form form-control" type="text" id="city"    / >
          </div>
          </div>

          <div className="row">
          <div className="col-md-4">
          <label className="form-control">Car Price:</label>
      </div>
      <div className="col-md-8">
          <input className="form form-control" pattern="[0-9]*"  type="text" id="price" / >
      </div>
      </div>


      </div>
          </Modal.Body>
          <Modal.Footer>
          <Button bsStyle="danger" onClick={() => this.closeAddModal()}>Close</Button>

      <Button className="btn btn-info" onClick={() => this.submitAddModal(document.getElementById("city").value,document.getElementById("price").value,
          document.getElementById("brand").value)
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
          <label className="form-control">Car Brand:</label>
      </div>
      <div className="col-md-8">
          <input className="form form-control" type="text" id="brand" value={this.state.brand}  onChange={(e) => {
          this.setState({
              brand : e.target.value
          })
      }}/ >
      </div>
      </div>

      <div className="row">
          <div className="col-md-4">
          <label className="form-control">City:</label>
      </div>
      <div className="col-md-8">
          <input className="form form-control" type="text" id="city"  value ={this.state.city}  onChange={(e) => {
          this.setState({
              city : e.target.value
          })
      }}  / >
      </div>
      </div>

      <div className="row">
          <div className="col-md-4">
          <label className="form-control">Price:</label>
      </div>
      <div className="col-md-8">
          <input className="form form-control" type="text" pattern="[0-9]*" id="price" value={this.state.price} onChange={(e) => {
          this.setState({
              //price : e.target.value
              price :(e.target.validity.valid) ? e.target.value : this.state.price
          })
      }}/ >
      </div>
      </div>


      </div>
      </Modal.Body>
      <Modal.Footer>
      <Button bsStyle="danger" onClick={() => this.closeModal()}>Close</Button>

      <Button className="btn btn-info" onClick={() => this.submitModal(this.props.cardetails._id,
          document.getElementById("city").value,document.getElementById("price").value,document.getElementById("brand").value)
  } >Update</Button>
      </Modal.Footer>
      </Modal>

</div> //end of main div
        
    );
  }
}

const mapStateToProps=(state)=> {
    return {
      all_cars:state.reducer2.all_cars,
        Username:state.reducer.Username,
        isAuthenticated:state.reducer.isAuthenticated,
        cardetails:state.reducer3.cardetails
    };
};

const mapDispatchToProps=(dispatch)=> {
    return {
        logOut:()=>dispatch(logOut()),
        GetCars:()=>dispatch(GetCars()),
      GetCarsByCity:(location)=>dispatch(GetCarsByCity(location)),
      GetCarDetails:(car_id)=>dispatch(GetCarDetails(car_id)),
      update_car:(car_id,city,price,brand)=>dispatch(update_car(car_id,city,price,brand)),
      add_car:(city,price,brand)=>dispatch(add_car(city,price,brand))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cars);

