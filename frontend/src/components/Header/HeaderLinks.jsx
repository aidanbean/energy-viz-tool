import React, {Component} from 'react';
import { NavItem, Nav, NavDropdown, MenuItem, Button } from 'react-bootstrap';
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
        const notification = (
            <div>
                <i className="fa fa-globe"></i>
                <b className="caret"></b>
                <span className="notification">5</span>
                <p className="hidden-lg hidden-md">Notification</p>
            </div>
        );
        return (
            <div>
                <Nav>
                    {/*<NavItem eventKey={1} href="#">*/}
                        {/*<i className="fa fa-dashboard"></i>*/}
                        {/*<p className="hidden-lg hidden-md">Dashboard</p>*/}
                    {/*</NavItem>*/}
                    {/*<NavDropdown eventKey={2} title={notification} noCaret id="basic-nav-dropdown">*/}
                        {/*<MenuItem eventKey={2.1}>Notification 1</MenuItem>*/}
                        {/*<MenuItem eventKey={2.2}>Notification 2</MenuItem>*/}
                        {/*<MenuItem eventKey={2.3}>Notification 3</MenuItem>*/}
                        {/*<MenuItem eventKey={2.4}>Notification 4</MenuItem>*/}
                        {/*<MenuItem eventKey={2.5}>Another notifications</MenuItem>*/}
                    {/*</NavDropdown>*/}

                    {/*<NavItem eventKey={3} href="#">*/}
                        {/*<i className="fa fa-search"></i>*/}
                        {/*<p className="hidden-lg hidden-md">Search</p>*/}
                    {/*</NavItem>*/}
                </Nav>
                <Nav style={{marginLeft:5}}>
                    <Building label="Building" callback={this.buildingHandler} searchable />
                </Nav>
                <Nav style={{marginLeft:5}}>
                    <EquipType label="Equipment Type" building={this.state.building} callback={this.equipTypeHandler} searchable />
                </Nav>
                <Nav style={{marginLeft:5}}>
                    <EquipNum label="Equipment Number" building={this.state.building} equipType={this.state.equipNum} callback={this.equipNumHandler} searchable />
                </Nav>
                <Nav style={{marginLeft:5}}>
                    <Sensor label="Sensor Type" building={this.state.building} equipNum={this.state.equpNum} equipType={this.state.equipType} callback={this.sensorTypeHandler} searchable />
                </Nav>
                <Nav style={{marginLeft:5, marginTop:8}}>
                    <Start label="Start" callback={this.startHandler}/>
                </Nav>
                <Nav style={{marginLeft:5, marginTop:8}}>
                    <End label="End" callback={this.endHandler}/>
                </Nav>
                <Nav style={{marginLeft:5, marginTop:8}}>
                    <Interval label="Interval" callback={this.intervalHandler}/>
                </Nav>
                <Nav style={{marginLeft:5, marginTop:-6}}>
                    <Button bsStyle="primary" onClick={this.buttonHandler}>Submit</Button>
                </Nav>
                <Nav pullRight>
                    <NavDropdown eventKey={2} title="Account" id="basic-nav-dropdown-right">
                        <MenuItem eventKey={2.1}>Account</MenuItem>
                        <MenuItem eventKey={2.2}>Log out</MenuItem>
                        <MenuItem eventKey={2.3}>Something</MenuItem>
                        <MenuItem eventKey={2.4}>Another action</MenuItem>
                        <MenuItem eventKey={2.5}>Something</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={2.5}>Separated link</MenuItem>
                    </NavDropdown>

                </Nav>
            </div>
        );
    }
}

export default HeaderLinks;
