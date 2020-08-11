import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function FlightInfo(props) {
  return(
    <li> Flight #{props.count} - {props.value} </li>
    );
}

// Function component for controls
function FlightControls(props) {
  return (
    <div className="controls">
      <button onClick={props.onClick_Add}> Add Flight </button>
      <button onClick={props.onClick_Remove}> Remove Flight </button>
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
            <FlightControls onClick_Add={this.incrementCount} onClick_Remove={this.decrementCount}/>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Airport />,
  document.getElementById('root')
);