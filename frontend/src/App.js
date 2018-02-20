import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';


class App extends Component {
  state = {data: []}

  componentDidMount() {
    fetch('/api/v2/resource_summary')
      .then(res => res.json())
      .then(data => this.setState({ data }));
  }

  render() {
    return (
      <div className="App">
        <h1>Data</h1>
          <div>{this.state.data.message}</div>
      </div>
    );
  }
}

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

export default App;
