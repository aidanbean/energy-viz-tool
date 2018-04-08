import React, {Component} from 'react';
import { Row, Col, NavItem, Nav, NavDropdown, MenuItem, Button } from 'react-bootstrap';
import Building from '../SearchBar/BuidlingSearchBar'
import EquipType from '../SearchBar/EquipmentTypeSearchBar'
import EquipNum from '../SearchBar/EquipmentNumberSearchBar'
import Sensor from '../SearchBar/SensorTypeSearchBar'
import Start from '../SearchBar/StartForm';
import End from '../SearchBar/EndForm';
import Interval from '../SearchBar/IntervalForm';

class HeaderLinks extends Component{
    constructor() {
        super();
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
    }
    buildingHandler(selection) {
        this.setState({
            building: selection,
        }, () => {
            console.log(this.state);
        });
    }
    equipTypeHandler(selection) {
        this.setState({
            equipmentType: selection,
        }, () => {
            console.log(this.state);
        });
    }
    equipNumHandler(selection) {
        this.setState({
            equipmentNumber: selection,
        }, () => {
            console.log(this.state);
        });
    }
    sensorTypeHandler(selection) {
        this.setState({
            sensorType: selection,
        }, () => {
            console.log(this.state);
        });
    }
    startHandler(selection) {
        this.setState({
            startTime: selection,
        }, () => {
            console.log(this.state);
        });
    }
    endHandler(selection) {
        this.setState({
            endTime: selection,
        }, () => {
            console.log(this.state);
        });
    }
    intervalHandler(selection) {
        this.setState({
            interval: selection,
        }, () => {
            console.log(this.state);
        });
    }
    buttonHandler() {
        this.props.callback(this.state);
        // console.log(this.state);
    }

    render(){
        return (
            <div className="content">
                <Row>
                    <Col md={2} > </Col>
                    <Col md={2}>
                        <Building/>
                    </Col>
                    <Col md={2}>
                        <EquipType />
                    </Col>
                    <Col md={2}>
                        <EquipNum/>
                    </Col>
                    <Col md={2}>
                        <Sensor/>
                    </Col>
                    <Col md={2}> </Col>
                </Row>
                <br />
                <Row>
                    <Col md={2} > </Col>
                    <Col md={2}>
                        <Start />
                    </Col>
                    <Col md={2}>
                        <End />
                    </Col>
                    <Col md={2}><Interval /> </Col>
                    <Col md={2}>
                        <Button bsStyle="success" bsSize="medium" block onClick={this.buttonHandler}>Submit</Button>
                    </Col>
                    <Col md={2}> </Col>
                </Row>
                <hr />
            </div>
        );
    }
}

export default HeaderLinks;
