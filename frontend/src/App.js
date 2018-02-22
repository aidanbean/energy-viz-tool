import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';


class App extends Component {
  state = {data: []}

  componentDidMount() {
    /*
    * use fetch as a POST to get data you want.
    * Current supported api calls:
    *
    * 'most_recent_summ': supply a tagName to get the most recent summary of
    * that resource.
    *
    * 'get_all_attributes': supply a wildcard (in the fetch body) to get all
    * the attributes of that wildcard (could be a building eg 'Geidt*').
    *
    * 'get_by_monthly': supply tagName, startTime, endTime, and interval, and
    * receive the data on the first of each month in the interval.
    *
    * more to come..
    */

    fetch('/api/v2/get_all_attributes', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            wildcard: 'Giedt*',
            tagName: 'Ghausi_ChilledWater_EUI',
            startTime: '2016-01-01',
            endTime: '2016-12-01',
            interval: '1mo'
        })
    })
    .then(res => res.json())
    .then(data => this.setState({ data }));
  }

  render() {
    return (
      <div className="App">
        <h1>Data</h1>
          <div><pre>{JSON.stringify(this.state.data, null, 2) }</pre></div>
      </div>
    );
  }
}


export default App;
