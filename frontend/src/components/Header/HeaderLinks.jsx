import React, {Component} from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Building from '../SearchBar/BuildingSearchBar'
import EquipType from '../SearchBar/EquipmentTypeSearchBar'
import EquipNum from '../SearchBar/EquipmentNumberSearchBar'
import Sensor from '../SearchBar/SensorTypeSearchBar'
import Start from '../SearchBar/StartForm';
import End from '../SearchBar/EndForm';
import Interval from '../SearchBar/IntervalForm';

class HeaderLinks extends Component{
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
            building: '',
            equipmentType: '',
            equipmentNumber: '',
            sensorType: '',
            startTime: '',
            endTime: '',
            interval: ''
        };

    /* The following are different callbacks that are triggered
    whenever the user makes a new selection in a search bar. */
    }
    buildingHandler(selection) {
        this.setState({
            building: selection,
        });
    }
    equipTypeHandler(selection) {
        this.setState({
            equipmentType: selection,
        });
    }
    equipNumHandler(selection) {
        this.setState({
            equipmentNumber: selection,
        }, () => {
            console.log(this.state);
            console.log(typeof this.state.equipmentNumber);
        });
    }
    sensorTypeHandler(selection) {
        this.setState({
            sensorType: selection,
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
    intervalHandler(selection) {
        this.setState({
            interval: selection,
        });
    }
    buttonHandler() {
        this.props.callback(this.state);
    }

    render(){
        return (
            <div className="content">
                <br/>
                <Row style={{'marginRight': '0px', 'marginLeft': '0px'}}>
                    <Col md={2} > </Col>
                    <Col md={2}>
                        <Building label="Building" callback={this.buildingHandler} searchable />
                    </Col>
                    <Col md={2}>
                        <EquipType label="Equipment Type" building={this.state.building} callback={this.equipTypeHandler} searchable />
                    </Col>
                    <Col md={2}>
                        <EquipNum label="Equipment Number" building={this.state.building} equipType={this.state.equipmentType} callback={this.equipNumHandler} searchable />
                    </Col>
                    <Col md={2}>
                        <Sensor label="Sensor Type" building={this.state.building} equipNum={this.state.equipmentNumber} equipType={this.state.equipmentType} callback={this.sensorTypeHandler} searchable />
                    </Col>
                    <Col md={2}> </Col>
                </Row>
                <br />
                <Row style={{'marginRight': '0px', 'marginLeft': '0px'}}>
                    <Col md={2} > </Col>
                    <Col md={2}>
                        <Start label="Start" callback={this.startHandler}/>
                    </Col>
                    <Col md={2}>
                        <End label="End" startTime={this.state.startTime} callback={this.endHandler}/>
                    </Col>
                    <Col md={2}>
                        <Interval label="Interval" callback={this.intervalHandler}/>
                    </Col>
                    <Col md={2}>
                        <Button bsStyle="success" block onClick={this.buttonHandler} disabled={this.props.isLoading}>Submit</Button>
                    </Col>
                    <Col md={2}> </Col>
                </Row>
                <br/>
            </div>
        );
    }
}

export default HeaderLinks;
