import React from 'react';
import ReactDOM from 'react-dom';
import Config from './config.js'
import './index.css';

const axios = require('axios');
const config = new Config();
const url = `${config.base_url}:${config.port}/`;

function FlightInfo(props) {
  return(
    <li> Flight #{props.id} - {props.src} -> {props.dest} </li>
    );
}

// Function component for controls
function FlightControls(props) {
  return (
    <div className="flightControls">
      <div className="add_remove">
        <button onClick={props.add}> Add Flight </button>
        <button onClick={props.remove}> Remove Flight </button>
      </div>
      <div className="update">
        <button onClick={props.update}> Update Flights </button>
        <label for="num_flights">Number of Flights:</label>
        <input onChange={props.onChange} type="text" id="num_flights" name="num_flights"></input>
      </div>
    </div>
  );
}

function FlightList({flights}) {
  return(
    <div>
      <ul>
        { 
          flights.map((flight, i) => <FlightInfo id={flight.id} src={flight.source} dest={flight.destination} />)
        }
      </ul>
    </div>
  );
}


class Airport extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      flights: null,
    }
  }

  incrementCount = () => {
    console.log("Count = " + this.state.count);
    if(this.state.count < 6) {
      this.setState({
        count: this.state.count + 1,
      });
    }
  }

  decrementCount = () => {
    console.log("Count = " + this.state.count);
    if(this.state.count > 0) {
      this.setState({
        count: this.state.count - 1,
      });
    }
  }

  updateCall = () => {
    axios.get(`${config.base_url}:${config.port}/`, {
      // No parameters necessary right now
      params: {
        num_flights: this.state.count,
      }
    })
    .then((response) => {
      console.log(response);
      this.setState({
        flights: response.data,
      });
    })
    .catch((error) => {
      console.log("ERROR getting response");
      console.log(error);
    })
    .finally(() => {
      // always executed
    }); 
  }

  onChange = (event) => {
    this.setState({
      count: event.target.value,
    });
  }

  render() {
    const { count, flights } = this.state;
    console.log(`Count = ${count}`);

    return (
      <div className="AirportApp">
        <div className="flight-table">
            <p> FLIGHT INFO </p>
            {flights && <FlightList flights={flights}/>}
        </div>
        <div className="table-controls">
            <p> FLIGHT CONTROLS </p>
            <FlightControls add={this.incrementCount} remove={this.decrementCount} update={this.updateCall} onChange={this.onChange} />
        </div>
      </div>
    );
  }
}

export default Airport;


// ========================================