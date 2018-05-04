import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { BarLoader } from 'react-spinners';
import Building from '../../components/SearchBar/BuildingSearchBar';
import Header from '../../components/Header/SelectBuildingHeader.jsx';
import PreBake1 from '../../components/Graphs/Economizer.jsx';
import PreBake2 from '../../components/Graphs/AirTemp-AirTempSP.jsx';
import DateSelection from '../../components/DateSelection/DateSelection.jsx'
import PropTypes from 'prop-types';



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


  getChildContext() {
        return {
            monthOfYear: [],
            dayOfMonth: [],
            dayOfWeek: [],
            hourOfDay: []
        };
  }



  render() {
    return (
      <div>
        <Grid fluid>
         <Header selection={this.state} callback={this.buildingHandler} />
          <br />
            <DateSelection />
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

// SelectBuilding.childContextTypes(
//     monthOfYear = prototype.array,
//     dayOfMonth = prototype.array
//     // dayOfWeek: [],
//     // hourOfDay: []
// }

export default SelectBuilding;
