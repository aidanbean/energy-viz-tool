import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <Grid>
          <nav className="pull-left">
            <ul>
              <li>
                <a href="https://github.com/aidanbean">Aidan</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/dishabendre/">Disha</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/tony-xiao-xbh/">Tony</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/yepuxie/">Yepu</a>
              </li>
            </ul>
          </nav>
          <p className="copyright pull-right">
            &copy; {new Date().getFullYear()} ECS 193 Team, made with love
          </p>
        </Grid>
      </footer>
    );
  }
}

export default Footer;
