export function GetCars() {

    return function(dispatch){
        fetch("http://localhost:3001/listoffcars",{
            method:"GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials:'include'
        })
            .then(res => res.json())
            .then(data =>
                dispatch({
                    type: "ALLCARS",
                    payload: data.cars
                })
            )
            .catch(function(err){
                console.log(err);
            });
    }
}

export function add_car(city,price,brand) {

    return function(dispatch){
        fetch("http://localhost:3001/addCardata1",{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials:'include',
            body:    JSON.stringify({city:city,price:price,brand:brand})
        })
            .then(res => res.json())
            .then(data =>

                dispatch({
                    type: "STARRED1",
                    payload: data.status
                })
            )
            .catch(function(err){
                console.log(err);
            });
    }
}

export function update_car(carid,city,price,brand) {

    console.log("price:"+price);
    console.log("city:"+city);
    console.log("brand:"+brand);
    console.log("carid:"+carid);

    return function(dispatch){
        fetch("http://localhost:3001/updateCardata1",{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials:'include',
            body:    JSON.stringify({car_id:carid,city:city,price:price,brand:brand})
        })
            .then(res => res.json())
            .then(data =>

                dispatch({
                    type: "STARRED1",
                    payload: data.status
                })
            )
            .catch(function(err){
                console.log(err);
            });
    }
}

export function GetCarDetails(car_id) {
    console.log("file_id:"+car_id);

    return function(dispatch){
        fetch("http://localhost:3001/cardetails",{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials:'include',
            body:    JSON.stringify({car_id:car_id})
        })
            .then(res => res.json())
            .then(data =>


                dispatch({
                    type: "CARDATA",
                    payload: data.cardata
                })

            )
            .catch(function(err){
                console.log(err);
            });
    }
}

export function GetCarsByCity(stateName) {
    console.log('stateName:'+stateName);
    return function(dispatch){
        fetch("http://localhost:3001/getCarsByCity",{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials:'include',
            body:    JSON.stringify({stateName:stateName})
        })
            .then(res => res.json())
            .then(data =>
                dispatch({
                    type: "ALLCARS",
                    payload: data.cars
                })

            )
            .catch(function(err){
                console.log(err);
            });
    }
}