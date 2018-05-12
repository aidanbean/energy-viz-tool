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
    // var node = document.createElement('div');
    // node.id = 'bodyClick';
    // node.onclick = function() {
    //   this.parentElement.removeChild(this);
    //   document.documentElement.classList.toggle('nav-open');
    // };
    // document.body.appendChild(node);
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
    // console.log('In Header.jsx');
    // console.log(dataFromHeader);
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
        <Navbar.Header>
            <Navbar.Toggle onClick={this.mobileSidebarToggle} />
        </Navbar.Header>
    );
  }
}

export default Header;
