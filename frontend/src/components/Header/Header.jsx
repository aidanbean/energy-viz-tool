import React, { Component } from 'react';
import { Navbar, NavDropdown, Nav, MenuItem } from 'react-bootstrap';

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

    if (document.getElementsByClassName('nav-open').length === 1) {
      document.body.appendChild(node);
    }
  }

  headerCallback(dataFromHeader) {
    // console.log('In Header.jsx');
    // console.log(dataFromHeader);
    this.props.callback(dataFromHeader);
  }
  render() {
    return (
      <Navbar.Header>
        <Navbar.Toggle onClick={this.mobileSidebarToggle} />
      </Navbar.Header>
    );
  }
}

export default Header;
