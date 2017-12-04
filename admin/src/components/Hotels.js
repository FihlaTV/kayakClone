import React, { Component } from 'react';
import '../App.css';
import {GetHotelDetails,logOut,GetHotels,update_hotel,add_hotel,GetHotelsByCity} from "../actions/index";
import {connect} from 'react-redux';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import { Link } from 'react-router-dom';

class Hotels extends Component {
	constructor(props) {
  super(props);
  this.state = {
   //message:this.props.location.state.message,
    //user_name:this.props.location.state.Username,
    all_files:[],
    file_id:0,
      showModal: false,
      showAddModal:false,
      hotel_id:'',
      city: '',
      price: 0,
      reviews: 0,
      hotelName: '',
      stars: 0
  };
}
    openModal(item) {
            this.props.GetHotelDetails(item);
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

    submitModal(hotelid,hotel_name,city,price,reviews,stars) {
        this.props.update_hotel(hotelid,hotel_name,city,price,reviews,stars);
        this.setState({showModal : false});
    }

    submitAddModal(hotel_name,city,price,reviews,stars) {

        this.props.add_hotel(hotel_name,city,price,reviews,stars);
        this.setState({showAddModal : false});
    }

    SearchHotels(statename)
    {
        this.props.GetHotelsByCity(statename);
    }

componentWillMount() {
    this.props.GetHotels();
}


   componentDidMount() {
   }

   componentWillReceiveProps(newProps) {
       this.setState({
           hotel_id:newProps.hoteldetails._id,
           city:newProps.hoteldetails.city,
           price:newProps.hoteldetails.price,
           reviews:newProps.hoteldetails.reviews,
           hotelName:newProps.hoteldetails.hotelName,
           stars:newProps.hoteldetails.stars
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
          this.props.all_hotels.map((item,key)=>{
            return(<tr key={key}>
              <td>{item.hotelName}</td>
              <td>{item.city}</td>
                <td>{item.price}</td>
                <td>{item.reviews}</td>
                <td>{item.stars}</td>
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
<h1 className="text-center">Hotels</h1>
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
                <input type="submit" value="Search" className="btn btn-info" id="search" onClick={() => this.SearchHotels(document.getElementById("searchState").value)}/><br/><br/>
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
<input type="submit" value="Add New Hotel" className="btn btn-info" name="create_dir" id="create_dir" onClick={() => this.openAddModal()}/><br/><br/>

</div> 
      </div>


      <Modal show={this.state.showAddModal} onHide={() => this.closeAddModal()}>
  <Modal.Header closeButton>
      <Modal.Title>Add Hotel Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="col-md-12">
          <div className="row">
          <div className="col-md-4">
          <label className="form-control">Hotel Name:</label>
      </div>
      <div className="col-md-8">
          <input className="form form-control" type="text" id="hotel_name" / >
      </div>
      </div>

      <div className="row">
          <div className="col-md-4">
          <label className="form-control">Hotel City:</label>
      </div>
      <div className="col-md-8">
          <input className="form form-control" type="text" id="city"    / >
          </div>
          </div>

          <div className="row">
          <div className="col-md-4">
          <label className="form-control">Hotel Price:</label>
      </div>
      <div className="col-md-8">
          <input className="form form-control" type="text" id="price" / >
      </div>
      </div>

      <div className="row">
          <div className="col-md-4">
          <label className="form-control">Hotel Review:</label>
      </div>
      <div className="col-md-8">
          <input className="form form-control" type="text" id="reviews" / >
      </div>
      </div>

      <div className="row">
          <div className="col-md-4">
          <label className="form-control">Stars:</label>
      </div>
      <div className="col-md-8">
          <input className="form form-control" type="text" id="stars" / >
      </div>
      </div>

      </div>
          </Modal.Body>
          <Modal.Footer>
          <Button bsStyle="danger" onClick={() => this.closeAddModal()}>Close</Button>

      <Button className="btn btn-info" onClick={() => this.submitAddModal(document.getElementById("hotel_name").value,document.getElementById("city").value,
          document.getElementById("price").value,document.getElementById("reviews").value,document.getElementById("stars").value)
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
          <label className="form-control">Hotel Name:</label>
      </div>
      <div className="col-md-8">
          <input className="form form-control" type="text" id="hotel_name" value={this.state.hotelName}  onChange={(e) => {
          this.setState({
              hotelName : e.target.value
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
          <input className="form form-control" type="text" id="price" value={this.state.price} onChange={(e) => {
          this.setState({
              price : e.target.value
          })
      }}/ >
      </div>
      </div>

      <div className="row">
          <div className="col-md-4">
          <label className="form-control">Hotel Reviews:</label>
      </div>
      <div className="col-md-8">
          <input className="form form-control" type="text" id="reviews" value={this.state.reviews} onChange={(e) => {
          this.setState({
              reviews : e.target.value
          })
      }}/ >
      </div>
      </div>

      <div className="row">
          <div className="col-md-4">
          <label className="form-control">Stars:</label>
      </div>
      <div className="col-md-8">
          <input className="form form-control" type="text" id="stars" value={this.state.stars} onChange={(e) => {
          this.setState({
              stars : e.target.value
          })
      }}/ >
      </div>
      </div>

      </div>
      </Modal.Body>
      <Modal.Footer>
      <Button bsStyle="danger" onClick={() => this.closeModal()}>Close</Button>

      <Button className="btn btn-info" onClick={() => this.submitModal(this.props.hoteldetails._id,document.getElementById("hotel_name").value,document.getElementById("city").value,
          document.getElementById("price").value,document.getElementById("reviews").value,document.getElementById("stars").value)
  } >Update</Button>
      </Modal.Footer>
      </Modal>

</div> //end of main div
        
    );
  }
}

const mapStateToProps=(state)=> {
    return {
      all_hotels:state.reducer2.all_hotels,
        Username:state.reducer.Username,
        isAuthenticated:state.reducer.isAuthenticated,
        hoteldetails:state.reducer3.hoteldetails
    };
};

const mapDispatchToProps=(dispatch)=> {
    return {
        logOut:()=>dispatch(logOut()),
        GetHotels:()=>dispatch(GetHotels()),
        GetHotelDetails:(hotel_id)=>dispatch(GetHotelDetails(hotel_id)),
        GetHotelsByCity:(location)=>dispatch(GetHotelsByCity(location)),
      update_hotel:(hotel_id,hotel_name,city,price,reviews,stars)=>dispatch(update_hotel(hotel_id,hotel_name,city,price,reviews,stars)),
      add_hotel:(hotel_name,city,price,reviews,stars)=>dispatch(add_hotel(hotel_name,city,price,reviews,stars))

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Hotels);

