import {createStore , applyMiddleware } from "redux";
import {combineReducers} from 'redux'
import {createLogger as logger} from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { BrowserRouter} from 'react-router-dom';
import { Router, Route, browserHistory ,hashHistory} from 'react-router';

const data = {FirstName:'',
				LastName:'',
				Username:'',
				Password:'',
				isAuthenticated:'',
				}
const files={
	all_files:[],
	users:[],
	tripdata:[],
	flightticket:[],
	hotelrecipt:{},
    carreceipt:{},
	carbooking:{},
    all_hotels:[],
	all_cars:[]

}

const flightdata={
	flightdetails:{},
	hoteldetails:{},
	revenue:[],
    userinfo:{},
    cardetails:{}
}
const flightdetails={
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
    Day: ''
}

const hoteldetails={
    hotel_id:'',
    city: '',
    price: 0,
    reviews: 0,
    hotelName: '',
    stars: 0
}

const cardetails={
    car_id:'',
    city: '',
    price: 0,
    brand: ''
}

const userinfo={
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
}

const reducer = (state = data, action) => {
	switch(action.type)
	{
		case "USERNAME":
console.log("received"+action.payload);
		return Object.assign({},state,{Username:action.payload})

		case "PASSWORD":
			return Object.assign({},state,{Password:action.payload})

		case "LOGIN":
		console.log("Login Status:"+action.payload);
		if(action.payload==="valid Login")
		{
			return Object.assign({},state,{result:action.payload,
				isAuthenticated:true})
		}
		else
		{
			return state;
		}

		case "SET_CURRENT_USER":
			console.log("blank user test:"+action.payload.user);
			if(action.payload.user!==undefined)
			{
				console.log("undefined:ccccc");
			return Object.assign({},state,{isAuthenticated:true,user:action.payload.user,Username:action.payload.user.username})		
			}
			else
			{
				console.log("undefined:dddd");
				return Object.assign({},state,{result:"Logout",isAuthenticated:false})			
			}
			break;

		case "SIGNUP":
		console.log("Register Status:"+action.payload);
		return Object.assign({},state,{result:action.payload})

		case "LOGOUT":
			return Object.assign({},state,{result:0,isAuthenticated:false})

		default:
		console.log("No action found");
	}
    return state;
};

const reducer2 = (state = files, action) => {
	switch(action.type)
	{
		case "UPLOAD_DOCUMENT_SUCCESS":
		console.log("Upload success");
		return Object.assign({},state,{all_files:[...action.payload]})

		case "ALLFILES":
		console.log("Files success"+action.payload);
		return Object.assign({},state,{all_files:[...action.payload]})

        case "ALLHOTELS":
            console.log("Hotels success"+action.payload);
            return Object.assign({},state,{all_hotels:[...action.payload]})
        case "ALLCARS":
            console.log("cars success"+action.payload);
            return Object.assign({},state,{all_cars:[...action.payload]})

case "USERS":
    console.log("user success"+action.payload);
    return Object.assign({},state,{users:[...action.payload]})

case "TRIPDATA":
    console.log("user success"+action.payload);
    return Object.assign({},state,{tripdata:[...action.payload]})

		case "DELETE":
		console.log("Files deleted"+action.payload);
		return Object.assign({},state,{all_files:[...action.payload]})

		case "FLIGHTDATA":
		console.log("GROUPMEMBERS"+action.payload.group_members);
		return Object.assign({},state,{flight_id:action.payload._id,
            duration: action.payload.duration,
            costFlight: action.payload.costFlight,
            destination:action.payload.destination,
            source: action.payload.source,
            fligtName: action.payload.fligtName,
            srcIata: action.payload.srcIata,
            time: action.payload.time,
            Date: action.payload.Date,
            destIata: action.payload.destIata,
            Day: action.payload.Day})

	case "FLIGHTTICKET":
    console.log("FLIGHTTICKET"+action.payload);
    return Object.assign({},state,{flightticket:[...action.payload]})

case "HOTELRECEIPT":
    console.log("HOTELRECEIPT"+action.payload);
    return Object.assign({},state,{hotelrecipt:[...action.payload]})

        case "CARRECEIPT":
            console.log("CARRECEIPT"+action.payload);
            return Object.assign({},state,{carreceipt:[...action.payload]})
case "CARBOOKING":
    console.log("CARBOOKING"+action.payload);
    return Object.assign({},state,{carbooking:[...action.payload]})

        case "REVENUE":
            console.log("Hotels success"+action.payload);
            return Object.assign({},state,{revenue:[...action.payload]})

		default:
		console.log("No action found");
	}
    return state;
};

const reducer3 = (state = flightdata, action) => {
    switch(action.type)
    {
case "FLIGHTDATA":
    console.log("GROUPMEMBERS"+action.payload.flightdata);
    return Object.assign({},state,{flightdetails:{...action.payload}})
        case "HOTELDATA":
            return Object.assign({},state,{hoteldetails:{...action.payload}})
        case "CARDATA":
            return Object.assign({},state,{cardetails:{...action.payload}})
        case "USERDETAILS":
        	console.log(action.payload)
            return Object.assign({},state,{userinfo:{...action.payload[0]}})
default:
    console.log("No action found");
}
    return state;
};

const middleware=applyMiddleware(promise(),thunk,logger());

const combine=combineReducers({reducer,reducer2,reducer3})
const store=createStore(combine,middleware);
export default store;