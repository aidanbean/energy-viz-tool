import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Building from '../SearchBar/BuildingSearchBar';
// import Sensor from '../SearchBar/SensorTypeSearchBar';
// import Start from '../SearchBar/StartForm';
// import End from '../SearchBar/EndForm';
// import Interval from '../SearchBar/IntervalForm';

class SelectHeader extends Component {
  constructor(props) {
    super(props);
    this.buttonHandler = this.buttonHandler.bind(this);
    this.buildingHandler = this.buildingHandler.bind(this);
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
      }
    );
  }

  buttonHandler() {
      this.props.callback(this.state.building);
  }

  render() {
    return (
      <div>
        <Row style={{ marginTop: '18px', marginRight: '0px', marginLeft: '0px' }}>
          <Col md={4} />
          <Col md={2}>
            <Building
              label={'Building'}
              callback={this.buildingHandler}
              selection={this.props.selection}
              searchable
            />
          </Col>
            <Col md={2}>
              <Button
                bsStyle="success"
                style={{ marginTop: '8px' }}
                block
                onClick={this.buttonHandler}
                disabled={this.props.isLoading}
              >
                Submit
              </Button>
            </Col>
          <Col md={4} />
        </Row>
        <br />
      </div>
    );
  }
}

export default SelectHeader;
