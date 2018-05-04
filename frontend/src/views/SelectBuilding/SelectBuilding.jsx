import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { BarLoader } from 'react-spinners';
import Building from '../../components/SearchBar/BuildingSearchBar';
import Header from '../../components/Header/SelectBuildingHeader.jsx';
import PreBake1 from '../../components/Graphs/Economizer.jsx';
import PreBake2 from '../../components/Graphs/AirTemp-AirTempSP.jsx';
import DateSelection from '../../components/DateSelection/DateSelection.jsx'
import PropTypes from 'prop-types';
import Button from "../../components/CustomButtons/Button";


const ButtonContext = React.createContext({
    monthOfYear: [],
    dayOfMonth: [],
    dayOfWeek: [],
    hourOfDay: [],

    ButtonEnableHandler: (name) => {
        let tag = name.substr(0,1);
        let button = name.substr(2);
        switch (tag){
            case 'm':
                this.monthOfYear.push(button);
                break;
            case 'd':
                this.dayOfMonth.push(button);
                break;
            case 'w':
                this.dayOfWeek.push(button);
                break;
            case 'h':
                this.hourOfDay.push(button);
                break;
            default:
                break;
        }
    },

    ButtonDisableHandler: (name) => {
        let tag = name.substr(0,1);
        let button = name.substr(2);
        switch (tag){
            case 'm':
                this.monthOfYear.splice(this.monthOfYear.indexOf(button), 1);
                break;
            case 'd':
                this.dayOfMonth.splice(this.dayOfMonth.indexOf(button), 1);
                break;
            case 'w':
                this.dayOfWeek.splice(this.dayOfWeek.indexOf(button), 1);
                break;
            case 'h':
                this.hourOfDay.splice(this.hourOfDay.indexOf(button), 1);
                break;
            default:
                break;
        }
    }
});

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
    <ButtonContext.Provider value={this.state}>
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
    </ButtonContext.Provider>
    );
  }
}

SelectBuilding.childContextTypes(
    monthOfYear = PropTypes.array,
    dayOfMonth = PropTypes.array,
    dayOfWeek = PropTypes.array
    // hourOfDay: []
}

export default SelectBuilding;
