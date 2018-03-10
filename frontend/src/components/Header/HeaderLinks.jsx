import React, {Component} from 'react';
import { NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import Building from '../SearchBar/BuidlingSearchBar'
import Equips from '../SearchBar/EquipmentsSearchBar'
import Data from '../SearchBar/EquipmentNumberSearchBar'
import Sensor from '../SearchBar/SensorTypeSearchBar'

class HeaderLinks extends Component{
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
                    <Building label="Building" searchable />
                </Nav>
                <Nav style={{marginLeft:5}}>
                    <Equips label="Equips" searchable />
                </Nav>
                <Nav style={{marginLeft:5}}>
                    <Data label="Data" searchable />
                </Nav>
                <Nav style={{marginLeft:5}}>
                    <Sensor label="Sensor" searchable />
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
