import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import BuildingForm from '../SearchBar/BuildingSearchBar.jsx';
import StartForm from '../../components/SearchBar/StartForm.jsx';
import EndForm from '../../components/SearchBar/EndForm.jsx';

class SelectHeader extends Component {
  constructor(props) {
    super(props);
    this.buttonHandler = this.buttonHandler.bind(this);
    this.startHandler = this.startHandler.bind(this);
    this.endHandler = this.endHandler.bind(this);
    this.buildingHandler = this.buildingHandler.bind(this);
    this.state = {
      building: this.props.selection.building,
      equipmentType: null,
      equipmentNumber: null,
      sensorType: null,
      startTime: this.props.selection.startTime,
      endTime: this.props.selection.endTime,
      interval: this.props.selection.interval,
    };

    /* The following are different callbacks that are triggered
    whenever the user makes a new selection in a search bar. */
  }

  buildingHandler(selection) {
    this.setState({
      building: selection,
    });
  }

  startHandler(selection) {
    this.setState({
      startTime: selection,
    });
  }

  endHandler(selection) {
    this.setState({
      endTime: selection,
    });
  }

  buttonHandler() {
    this.props.callback(this.state);
  }

  render() {
    const tagStyle = {
      fontFamily: 'ProximaNova',
      fontSize: '14px',
      fontWeight: '400',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      color: '#2d323c',
      textAlign: 'left',
      marginTop: '10px',
      display: 'inline',
    };
    return (
      <div>
        <Row>
          <Col md={12} xsHidden style={{ minHeight: '50px' }} />
          <Col md={3} xs={12}>
            <Col md={3} xsHidden />
            <Col md={9} xs={12} style={{ paddingLeft: 0 }}>
              <p style={tagStyle}>Select a Building</p>
            </Col>
          </Col>
          <Col md={6}>
            <BuildingForm
              selection={this.state}
              callback={this.buildingHandler}
            />
          </Col>
        </Row>

        <Row>
          <Col md={3} xs={12}>
            <Col md={3} xsHidden />
            <Col md={9} xs={12} style={{ paddingLeft: 0 }}>
              <p style={tagStyle}>Select a Time Range</p>
            </Col>
          </Col>
          <Col md={3} xs={6}>
            <StartForm
              startTime={this.state.startTime}
              callback={this.startHandler}
            />
          </Col>
          <Col md={3} xs={6}>
            <EndForm endTime={this.state.endTime} callback={this.endHandler} />
          </Col>
          <Col md={2} xs={4} xsOffset={8} mdOffset={0}>
            <Button
              bsStyle="default"
              className="btn-fill"
              block
              onClick={this.buttonHandler}
              disabled={this.props.isLoading}
            >
              Submit
            </Button>
          </Col>
          <Col md={12} xsHidden style={{ minHeight: '20px' }} />
        </Row>
      </div>
    );
  }
}

export default SelectHeader;
