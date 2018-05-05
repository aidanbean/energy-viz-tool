import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Building from '../SearchBar/BuildingSearchBar';
import EquipType from '../SearchBar/EquipmentTypeSearchBar';
import EquipNum from '../SearchBar/EquipmentNumberSearchBar';
import Sensor from '../SearchBar/SensorTypeSearchBar';
import Start from '../SearchBar/StartForm';
import End from '../SearchBar/EndForm';
import Interval from '../SearchBar/IntervalForm';
import moment from 'moment';

class HeaderLinks extends Component {
  constructor() {
    super();
    // bind the different callbacks and set initial state.
    this.buttonHandler = this.buttonHandler.bind(this);
    this.buildingHandler = this.buildingHandler.bind(this);
    this.equipTypeHandler = this.equipTypeHandler.bind(this);
    this.equipNumHandler = this.equipNumHandler.bind(this);
    this.sensorTypeHandler = this.sensorTypeHandler.bind(this);
    this.startHandler = this.startHandler.bind(this);
    this.endHandler = this.endHandler.bind(this);
    this.intervalHandler = this.intervalHandler.bind(this);
    this.state = {
      building: null,
      equipmentType: null,
      equipmentNumber: null,
      sensorType: null,
      startTime: moment().subtract(2, 'months').format("MM-DD-YYYY-Ha"),
      endTime: moment().subtract(1, 'months').format("MM-DD-YYYY-Ha"),
      interval: '1h',
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
        // console.log(this.state);
      }
    );
  }
  equipTypeHandler(selection) {
    this.setState(
      {
        equipmentType: selection,
      },
      () => {
        // console.log(this.state);
      }
    );
  }
  equipNumHandler(selection) {
    this.setState(
      {
        equipmentNumber: selection,
      },
      () => {
        // console.log(this.state);
      }
    );
  }
  sensorTypeHandler(selection) {
    this.setState(
      {
        sensorType: selection,
      },
      () => {
        // console.log(this.state);
      }
    );
  }
  startHandler(selection) {
    this.setState(
      {
        startTime: selection,
      },
      () => {
        // console.log(this.state);
      }
    );
  }
  endHandler(selection) {
    this.setState(
      {
        endTime: selection,
      },
      () => {
        // console.log(this.state);
      }
    );
  }
  intervalHandler(selection) {
    this.setState(
      {
        interval: selection,
      },
      () => {
        // console.log(this.state);
      }
    );
  }
  buttonHandler() {
    this.props.callback(this.state);
  }

  render() {
    return (
      <div className="content">
        <br />
        <Row style={{ marginRight: '0px', marginLeft: '0px' }}>
          <Col md={2}> </Col>
          <Col md={2}>
            <Building
              label="Building"
              callback={this.buildingHandler}
              selection={this.state}
              searchable
            />
          </Col>
          <Col md={2}>
            <EquipType
              label="Equipment Type"
              callback={this.equipTypeHandler}
              selection={this.state}
              searchable
            />
          </Col>
          <Col md={2}>
            <EquipNum
              label="Equipment Number"
              callback={this.equipNumHandler}
              selection={this.state}
              searchable
            />
          </Col>
          <Col md={2}>
            <Sensor
              label="Sensor Type"
              callback={this.sensorTypeHandler}
              selection={this.state}
              searchable
            />
          </Col>
          <Col md={2}> </Col>
        </Row>
        <br />
        <Row style={{ marginRight: '0px', marginLeft: '0px' }}>
          <Col md={2}> </Col>
          <Col md={2}>
            <Start label="Start" callback={this.startHandler} />
          </Col>
          <Col md={2}>
            <End
              label="End"
              startTime={this.state.startTime}
              callback={this.endHandler}
            />
          </Col>
          <Col md={2}>
            <Interval label="Interval" callback={this.intervalHandler} />
          </Col>
          <Col md={2}>
            <Button
              bsStyle="success"
              block
              onClick={this.buttonHandler}
              disabled={this.props.isLoading}
            >
              Submit
            </Button>
          </Col>
          <Col md={2}> </Col>
        </Row>
        <br />
      </div>
    );
  }
}

export default HeaderLinks;
