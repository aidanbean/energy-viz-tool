import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Header from '../../components/Header/SelectBuildingHeader.jsx';
import PreBake1 from '../../components/Graphs/Economizer.jsx';
import PreBake2 from '../../components/Graphs/AirTemp-AirTempSP.jsx';

class SelectBuilding extends React.Component {
  constructor(props) {
    super(props);
    this.buildingHandler = this.buildingHandler.bind(this);
    this.state = {
      building: 'ACAD',
      equipmentType: null,
      equipmentNumber: null,
      sensorType: null,
      startTime: '',
      endTime: '',
      interval: '1h',
    };
  }
  buildingHandler(selection) {
    this.setState(
      {
        building: selection,
      }
    );
  }

  render() {
    return (
      <div>
        <Grid fluid>
         <Header selection={this.state} callback={this.buildingHandler} />
          <br />
          <Row>
            <Col md={12}>
              <PreBake1 building={this.state.building} />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <PreBake2 building={this.state.building} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default SelectBuilding;
