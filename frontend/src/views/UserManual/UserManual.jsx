import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Card from "../../components/Card/Card";

class UserManual extends Component {
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="All Building"
                category="How to embed a visualization"
                footer='no'
                content={
                  <div>
                    <ol>
                      <li>
                        {" "}
                        Copy the visualization link and paste to the input
                        section
                      </li>
                      <li>
                        {" "}
                        Render the page by clicking on <b>Apply</b>
                      </li>
                    </ol>
                    <a href={"#/user-guide/img1"}>
                      <img
                        src={require("../../assets/img/all-building.png")}
                        className="help-img"
                        alt={"all-building-page-help-img"}
                      />
                    </a>
                    <a href={"/#/user-guide"} className="light-box" id="/user-guide/img1">
                      <img
                        src={require("../../assets/img/all-building.png")}
                        alt={"all-building-page-help-img"}
                      />
                    </a>
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
                footer='no'
                content={
                  <div>
                    <ol>
                      <li> Select one or multiple building(s) </li>
                      <li> Select your preferred time range </li>
                      <li> Click on `Submit` button to render the graphs</li>
                      <li>
                        If you are interested in specific
                        hours/days/weeks/months, you can click on `Refine
                        Filter, and unselect/select all times by hovering over
                        the titles.
                        <b>
                          Hour of day, Month of Year, Day of Week, and Day of
                          Month
                        </b>
                      </li>
                      <li>
                        {" "}
                        Click on <b>Apply</b> to refresh the graphs
                      </li>
                    </ol>
                    <a href={"#/user-guide/img2"}>
                      <img
                        src={require("../../assets/img/select-building.png")}
                        className="help-img"
                        alt={"select-building-page-help-img"}
                      />
                    </a>
                    <a href={"/#/user-guide"} className="light-box" id="/user-guide/img2">
                      <img
                        src={require("../../assets/img/select-building.png")}
                        alt={"select-building-page-help-img"}
                      />
                    </a>
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
                footer='no'
                content={
                  <div>
                    <ol>
                      <li>
                        Select related parameters.
                        <b>
                          {" "}
                          Building name(s), Equipment Type(s), Equipment
                          Number(s), and Sensor Type(s)
                        </b>
                      </li>
                      <li>Select a time range you are interested in</li>
                      <li>
                        Add graph(s) to the page by clicking on <b>Add</b>
                        <br />
                        Remove all graph(s) and data by clicking on <b>Clear</b>
                      </li>
                      <li>
                        {" "}
                        Click <b>x</b> on top left of a graph to remove it
                      </li>
                      <li>
                        {" "}
                        Click the top right icon to download csv file(s), png(s){" "}
                      </li>
                    </ol>

                    <a href={"#/user-guide/img3"}>
                      <img
                        src={require("../../assets/img/search.png")}
                        className="help-img"
                        alt={"search-page-help-img"}
                      />
                    </a>
                    <a href={"/#/user-guide"} className="light-box" id="/user-guide/img3">
                      <img
                        src={require("../../assets/img/search.png")}
                        alt={"search-page-help-img"}
                      />
                    </a>



                  </div>
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card
                title="Question & Answers"
                footer='no'
                content={
                  <div>
                    <ul>
                      <li>
                        <b>Why my graph is empty?</b>
                        <br />
                        Either data of the sensor is invalid or the sensor is
                        turned off during the selected time range.
                      </li>
                      <li>
                        <b>Why is my graph is not loading?</b>
                        <br />
                        Try to re-select a smaller time range, or select fewer
                        sensors.
                      </li>
                      <li>
                        <b>Where does data come from?</b>
                        <br />
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
                footer='no'
                content={
                  <div>
                    <p>
                      <b>Instructions</b>
                    </p>
                    <ol>
                      <li><a href="https://github.com/aTonyXiao/ECS193-EnergyVisTool-MobileApp/tree/master/EnergyViz-Android">Download souce code</a> and import a project</li>
                      <li>
                        Enable Developer Options In your Android Phone.
                        <br />
                        Open the Settings => developer options => development
                        mode
                      </li>
                      <li>Connect phone to computer</li>
                      <li>
                        Press the green play button to build and install the
                        app.
                      </li>
                      <li>
                        In the target device screen select your android phone.
                      </li>
                    </ol>
                  </div>
                }
              />
            </Col>
            <Col md={6}>
              <Card
                title="iPhone Installation"
                footer='no'
                content={
                  <div>
                    <p>
                      <b>Instructions</b>
                    </p>
                    <ol>
                      <li><a href="https://github.com/aTonyXiao/ECS193-EnergyVisTool-MobileApp/tree/master/EnergyViz-iOS">Download source code </a> and import the project.</li>
                      <li>Connect iPhone to computer</li>
                      <li>In the target selection choose your iPhone.</li>
                      <li>
                        Press the play button to build and install the app on
                        your iPhone.
                      </li>
                    </ol>
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
