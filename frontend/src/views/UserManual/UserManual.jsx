import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Card from '../../components/Card/Card';

class UserManual extends Component {
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            {/*<Col md={12}>*/}
              {/*<Card*/}
                {/*title="User Manual"*/}
                {/*category="created by ECS 193 team"*/}
                {/*content={*/}
                  {/*<div>*/}
                    {/*<div className="typo-line">*/}
                      {/*<h1><p className="category">Header 1</p>Light Bootstrap Table Heading </h1>*/}
                    {/*</div>*/}

                    {/*<div className="typo-line">*/}
                      {/*<h2>*/}
                        {/*<p className="category">Header 2</p>Light Bootstrap*/}
                        {/*Table Heading*/}
                      {/*</h2>*/}
                    {/*</div>*/}
                    {/*<div className="typo-line">*/}
                      {/*<h3>*/}
                        {/*<p className="category">Header 3</p>Light Bootstrap*/}
                        {/*Table Heading*/}
                      {/*</h3>*/}
                    {/*</div>*/}
                    {/*<div className="typo-line">*/}
                      {/*<h4>*/}
                        {/*<p className="category">Header 4</p>Light Bootstrap*/}
                        {/*Table Heading*/}
                      {/*</h4>*/}
                    {/*</div>*/}
                    {/*<div className="typo-line">*/}
                      {/*<h5>*/}
                        {/*<p className="category">Header 5</p>Light Bootstrap*/}
                        {/*Table Heading*/}
                      {/*</h5>*/}
                    {/*</div>*/}
                    {/*<div className="typo-line">*/}
                      {/*<h6>*/}
                        {/*<p className="category">Header 6</p>Light Bootstrap*/}
                        {/*Table Heading*/}
                      {/*</h6>*/}
                    {/*</div>*/}
                    {/*<div className="typo-line">*/}
                      {/*<p>*/}
                        {/*<span className="category">Paragraph</span>Lorem ipsum*/}
                        {/*dolor sit amet, consectetuer adipiscing elit, sed diam*/}
                        {/*nonummy nibh euismod tincidunt ut laoreet dolore magna*/}
                        {/*aliquam erat volutpat. Ut wisi enim ad minim veniam.*/}
                      {/*</p>*/}
                    {/*</div>*/}
                    {/*<div className="typo-line">*/}
                      {/*<p className="category">Quote</p>*/}
                      {/*<blockquote>*/}
                        {/*<p>*/}
                          {/*Lorem ipsum dolor sit amet, consectetuer adipiscing*/}
                          {/*elit, sed diam nonummy nibh euismod tincidunt ut*/}
                          {/*laoreet dolore magna aliquam erat volutpat. Ut wisi*/}
                          {/*enim ad minim veniam.*/}
                        {/*</p>*/}
                        {/*<small>Steve Jobs, CEO Apple</small>*/}
                      {/*</blockquote>*/}
                    {/*</div>*/}

                    {/*<div className="typo-line">*/}
                      {/*<p className="category">Muted Text</p>*/}
                      {/*<p className="text-muted">*/}
                        {/*Lorem ipsum dolor sit amet, consectetuer adipiscing*/}
                        {/*elit, sed diam nonummy nibh euismod tincidunt ut*/}
                        {/*laoreet.*/}
                      {/*</p>*/}
                    {/*</div>*/}
                    {/*<div className="typo-line">*/}
                      {/*<p className="category">Coloured Text</p>*/}
                      {/*<p className="text-primary">*/}
                        {/*Text Primary - Light Bootstrap Table Heading and complex*/}
                        {/*bootstrap dashboard you've ever seen on the internet.*/}
                      {/*</p>*/}
                      {/*<p className="text-info">*/}
                        {/*Text Info - Light Bootstrap Table Heading and complex*/}
                        {/*bootstrap dashboard you've ever seen on the internet.*/}
                      {/*</p>*/}
                      {/*<p className="text-success">*/}
                        {/*Text Success - Light Bootstrap Table Heading and complex*/}
                        {/*bootstrap dashboard you've ever seen on the internet.*/}
                      {/*</p>*/}
                      {/*<p className="text-warning">*/}
                        {/*Text Warning - Light Bootstrap Table Heading and complex*/}
                        {/*bootstrap dashboard you've ever seen on the internet.*/}
                      {/*</p>*/}
                      {/*<p className="text-danger">*/}
                        {/*Text Danger - Light Bootstrap Table Heading and complex*/}
                        {/*bootstrap dashboard you've ever seen on the internet.*/}
                      {/*</p>*/}
                    {/*</div>*/}

                    {/*<div className="typo-line">*/}
                      {/*<h2>*/}
                        {/*<p className="category">Small Tag</p>Header with small*/}
                        {/*subtitle <br />*/}
                        {/*<small>".small" is a tag for the headers</small>{' '}*/}
                      {/*</h2>*/}
                    {/*</div>*/}
                  {/*</div>*/}
                {/*}*/}
              {/*/>*/}
            {/*</Col>*/}
          </Row>
          <Row>
            <Col md={12}>
            <Card
              title="All Building"
              category="How to embed a visualization"
              content={
                <div>
                  <ol>
                    <li> Copy the visualization link and paste to the input section</li>
                    <li> Render the page by clicking on <b>Apply</b></li>
                  </ol>
                  <img src={require('../../assets/img/all-building.png')} className="app-demo"></img>
                </div>
              }

            />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card
                title="Select Buildings"
                category="pre-baked data visualization graphs"
                content={
                  <div>
                    <ol>
                      <li> Select one or multiple building(s) </li>
                      <li> Select your preferred time range </li>
                      <li> Click on `Submit` button to render the graphs</li>
                      <li>
                        If you are interested in specific hours/days/weeks/months, you can click
                        on `Refine Filter, and unselect/select all times by hovering over the titles.
                        <b>Hour of day, Month of Year, Day of Week, and Day of Month</b>
                      </li>
                      <li> Click on <b>Apply</b> to refresh the graphs</li>
                    </ol>
                    <img src={require('../../assets/img/select-building.png')} className="app-demo"></img>
                  </div>
                }

              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card
                title="Select"
                category="custom visualization graphs"
                content={
                  <div>
                    <ol>
                      <li>Select related parameters.
                        <b> Building name(s), Equipment Type(s), Equipment Number(s), and Sensor Type(s)
                        </b>
                      </li>
                      <li>
                        Select a time range you are interested in
                      </li>
                      <li>
                        Add graph(s) to the page by clicking on <b>Add</b>
                        <br/>
                        Remove all graph(s) and data by clicking on <b>Clear</b>
                      </li>
                      <li> Click <b>x</b> on top left of a graph to remove it</li>
                      <li> Click the top right icon to download csv file(s), png(s) </li>

                    </ol>
                    <img src={require('../../assets/img/search.png')} className="app-demo"></img>
                  </div>
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card
                title="Question & Answers"
                content={
                  <div>
                    <ul>
                      <li>
                        <b>Why my graph is empty?</b>
                        <br/>
                        Either data of the sensor is invalid or the sensor is turned off during the selected time range.
                      </li>
                      <li>
                        <b>Why is my graph is not loading?</b>
                        <br/>
                        Try to re-select a smaller time range, or select fewer sensors.
                      </li>
                      <li>
                        <b>Where does data come from?</b>
                        <br/>
                        On-campus building HVAC sensor data from the Pi system
                      </li>
                    </ul>
                  </div>
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
            <Card
              title="Android Installation"
              content={
                <div>
                  <p><b>Instructions</b></p>
                  <ol>
                    <li>
                      Download souce code and import a project
                    </li>
                    <li>
                      Enable Developer Options In your Android Phone.
                      <br/>
                      Open the Settings => developer options => development mode
                    </li>
                    <li>
                      Connect phone to computer
                    </li>
                    <li>Press the green play button to build and install the app.
                    </li>
                    <li>
                      In the target device screen select your android phone.
                    </li>
                  </ol>
                  <a href="https://github.com/aTonyXiao/ECS193-EnergyVisTool-MobileApp/tree/master/EnergyViz-Android">
                    Download
                  </a>
                </div>
              }
            />
            </Col>
            <Col md={6}>
            <Card
              title="iPhone Installation"
              content={
                <div>
                  <p><b>Instructions</b></p>
                  <ol>
                    <li>
                      Download source code and import the project.
                    </li>
                    <li>
                      Connect iPhone to computer
                    </li>
                    <li>
                      In the target selection choose your iPhone.
                    </li>
                    <li>
                      Press the play button to build and install the app on your iPhone.
                    </li>
                  </ol>
                  <a href="https://github.com/aTonyXiao/ECS193-EnergyVisTool-MobileApp/tree/master/EnergyViz-iOS">
                    Download
                  </a>
                  <br />
                  <br />
                  <br />
                </div>
              }
            />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserManual;
