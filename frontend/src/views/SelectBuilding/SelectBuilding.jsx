import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { BarLoader } from 'react-spinners';
import Building from '../../components/SearchBar/BuildingSearchBar';
// import Header from '../../components/Header/SelectBuildingHeader.jsx';
import PreBake1 from '../../components/Graphs/Economizer.jsx';
import PreBake2 from '../../components/Graphs/AirTemp-AirTempSP.jsx';


class SelectBuilding extends React.Component {
    constructor(props) {
        super(props);
        this.buildingHandler = this.buildingHandler.bind(this);
        this.state = {
            building: "ACAD",
            equipmentType: null,
            equipmentNumber: null,
            sensorType: null,
            startTime: "",
            endTime: "",
            interval: "1h"
        };
    }
    buildingHandler(selection) {
        this.setState({
            building: selection,
        }, () => {
            console.log(this.state);
        });
    }

    render() {
        return (
            <div>
            <Grid fluid>
                <Row>
                    <Col md={5}></Col>
                    <Col md={2}>
                        <h5><center> Select Building </center></h5>
                        <Building label={'Building'} callback={this.buildingHandler} selection={this.state} searchable />
                    </Col>
                    <Col md={5}></Col>
                </Row>
                <br/>
                <Row>
                    <Col md={12}>
                        <PreBake1 building={this.state.building} />
                    </Col>
                </Row>
                <Row>
                    <Col md={12}></Col>
                </Row>
            </Grid>
            </div>
        );
    }
}

export default SelectBuilding;
