import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Building from '../SearchBar/BuildingSearchBar';
import Sensor from '../SearchBar/SensorTypeSearchBar';
import Start from '../SearchBar/StartForm';
import End from '../SearchBar/EndForm';
import Interval from '../SearchBar/IntervalForm';

class SelectHeader extends Component {
  constructor(props) {
    super(props);
    // bind the different callbacks and set initial state.
    // this.buttonHandler = this.buttonHandler.bind(this);
    this.buildingHandler = this.buildingHandler.bind(this);
    // this.sensorTypeHandler = this.sensorTypeHandler.bind(this);
    // this.startHandler = this.startHandler.bind(this);
    // this.endHandler = this.endHandler.bind(this);
    // this.intervalHandler = this.intervalHandler.bind(this);
    this.state = {
      building: null,
      equipmentType: null,
      equipmentNumber: null,
      sensorType: null,
      startTime: null,
      endTime: null,
      interval: null,
    };

    /* The following are different callbacks that are triggered
    whenever the user makes a new selection in a search bar. */
  }
  buildingHandler(selection) {
    this.setState(
      {
        building: selection,
      },
      () => {
        this.props.callback(this.state);
      }
    );
  }
  // sensorTypeHandler(selection) {
  //     this.setState({
  //         sensorType: selection,
  //     }, () => {
  //         console.log(this.state);
  //     });
  // }
  // startHandler(selection) {
  //     this.setState({
  //         startTime: selection,
  //     }, () => {
  //         console.log(this.state);
  //     });
  // }
  // endHandler(selection) {
  //     this.setState({
  //         endTime: selection,
  //     }, () => {
  //         console.log(this.state);
  //     });
  // }
  // intervalHandler(selection) {
  //     this.setState({
  //         interval: selection,
  //     }, () => {
  //         console.log(this.state);
  //     });
  // }
  // buttonHandler() {
  //     this.props.callback(this.state);
  // }

  render() {
    return (
      <div>
        <Row>
          <Col md={4} />
          <Col md={2}>
            <h5>
              <center> Select Building </center>
            </h5>
            <Building
              label={'Building'}
              callback={this.buildingHandler}
              selection={this.state}
              searchable
            />
          </Col>
          <Col md={6} />
        </Row>
        <br />
      </div>
    );
  }
}

export default SelectHeader;
