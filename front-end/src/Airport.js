import React from 'react';
import ReactDOM from 'react-dom';
import Config from './config.js'
import './index.css';

const axios = require('axios');
const config = new Config();
const url = `${config.base_url}:${config.port}/`;

function FlightInfo(props) {
  return(
    <li> Flight #{props.count} - {props.value} </li>
    );
}

// Function component for controls
function FlightControls(props) {
  return (
    <div className="controls">
      <button onClick={props.add}> Add Flight </button>
      <button onClick={props.remove}> Remove Flight </button>
      <button onClick={props.update}> Update Flights </button>
    </div>
  );
}

function FlightList({cities}) {
  return(
    <div>
      <ul>
        { 
          cities.map((city, i) => <FlightInfo count={i+1} value={city} />)
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
      cities: ["Toronto", "Amsterdam", "Paris", "Barcelona", "Los Angeles", "Saskatoon"],
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
      params: {
      },
      baseURL: `${config.base_url}`
    })
    .then((response) => {
      console.log(`Sending response to ${config.base_url}`);
      console.log(response);
    })
    .catch((error) => {
      console.log(`Sending response to ${config.base_url}`);
      console.log(error);
    })
    .finally(() => {
      console.log(`Sending response to ${config.base_url}`);
      // always executed
    }); 
  }

  render() {
    const { cities, count } = this.state;

    return (
      <div className="AirportApp">
        <div className="flight-table">
            <p> FLIGHT INFO </p>
            <FlightList cities={cities.slice(0, count+1)}/>
        </div>
        <div className="table-controls">
            <p> FLIGHT CONTROLS </p>
            <FlightControls add={this.incrementCount} remove={this.decrementCount} update={this.updateCall}/>
        </div>
      </div>
    );
  }
}

export default Airport;


// ========================================