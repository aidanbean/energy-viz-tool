import React, {Component} from 'react';
import {Navbar, NavDropdown, Nav, MenuItem} from 'react-bootstrap';

import appRoutes from '../../routes/app.jsx';

class Header extends Component {
    constructor(props) {
    super(props);
    this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
    this.headerCallback = this.headerCallback.bind(this);
    this.state = {
      sidebarExists: false,
    };
  }
  mobileSidebarToggle(e) {
    if (this.state.sidebarExists === false) {
      this.setState({
        sidebarExists: true,
      });
    }
    e.preventDefault();
    document.documentElement.classList.toggle('nav-open');
    var node = document.createElement('div');
    node.id = 'bodyClick';
    node.onclick = function() {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle('nav-open');
    };
    document.body.appendChild(node);
  }
  getBrand() {
    var name;
    appRoutes.map((prop, key) => {
      if (prop.collapse) {
        prop.views.map((prop, key) => {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
          return null;
        });
      } else {
        if (prop.redirect) {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
        } else {
          if (prop.path === this.props.location.pathname) {
            name = prop.name;
          }
        }
      }
      return null;
    });
    return name;
  }
  headerCallback(dataFromHeader) {
    console.log('In Header.jsx');
    console.log(dataFromHeader);
    this.props.callback(dataFromHeader);
  }
  render() {
    // const notification = (
    //     <div>
    //         <i className="fa fa-globe"></i>
    //         <b className="caret"></b>
    //         <span className="notification">5</span>
    //         <p className="hidden-lg hidden-md">Notification</p>
    //     </div>
    // );
    return (
      <Navbar fluid>
        <Navbar.Header>
        {/*
          <Navbar.Brand>
            <a href="#pablo">{this.getBrand()}</a>
          </Navbar.Brand>
          <Navbar.Toggle onClick={this.mobileSidebarToggle} />
          */}
        </Navbar.Header>
        {/*
        <Nav pullRight>
          <NavDropdown
            eventKey={2}
            title="Account"
            id="basic-nav-dropdown-right"
          >
            <MenuItem eventKey={2.1}>Account</MenuItem>
            <MenuItem eventKey={2.2}>Log out</MenuItem>
            <MenuItem eventKey={2.3}>Something</MenuItem>
            <MenuItem eventKey={2.4}>Another action</MenuItem>
            <MenuItem eventKey={2.5}>Something</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={2.5}>Separated link</MenuItem>
          </NavDropdown>
        </Nav>
        */}
      </Navbar>
    );
  }
}

export default Header;
