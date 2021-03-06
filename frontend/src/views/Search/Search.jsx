import React, { Component } from "react";
import moment from "moment";
import { Row, Col, Jumbotron, Glyphicon } from "react-bootstrap";
import { BarLoader } from "react-spinners";
import Button from "../../elements/CustomButton/CustomButton.jsx";
import Highcharts from "react-highcharts";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import HeaderLinks from "../../components/Header/HeaderLinks.jsx";
import { Card } from "../../components/Card/Card.jsx";
import DraggableTable from "../TableList/DraggableTable";
import { CSVLink } from "react-csv";
import matchSorter from "match-sorter";
import { colors } from "../../variables/colors";

import TimeAgo from "timeago-react";

require("highcharts/modules/exporting")(Highcharts.Highcharts);
require("highcharts/modules/export-data")(Highcharts.Highcharts);
var Stats = require("fast-stats").Stats;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.headerCallback = this.headerCallback.bind(this);
    this.removeChart = this.removeChart.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.state = {
      tableData: [],
      config: [],
      updateFlag: null,
      firstRender: this.props.headerData.firstRender
    };
  }

  componentDidMount() {
    this._loadGraphData(this.props);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.updateFlag === null) {
      this._loadGraphData(this.props);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // Store prevId in state so we can compare when props change.
    // Reset the updateFlag: indicate there is a update request

    if (nextProps.headerData != prevState.headerData) {
      return {
        updateFlag: null,
        headerData: nextProps.headerData
      };
    }
    // No state update necessary
    return null;
  }

  /* when new query parameters are received in the props,
      we refetch the graphQL query and convert the timezone. */
  _loadGraphData(props) {
    this.props.data.refetch();
    if (props.data.dataStream === undefined || props.data.loading) {
      return;
    }
    let config = {},
      xLines = [],
      x = [];
    let tableData = this.state.tableData;
    const variables = props.data.variables,
      fileName = `${variables.building}_${variables.equipmentType}_${
        variables.equipmentNumber
      }_${variables.sensorType}`;
    for (let i = 0; i < props.data.dataStream.length; i++) {
      let unit, avg, min, max, stddev;
      let tableRow = {};
      props.data.dataStream[i].summary.forEach(function(element) {
        const value = element.Value.Value.toFixed(2);
        switch (element.Type) {
          case "Average":
            avg = value;
            tableRow["Average"] = value;
            break;
          case "Minimum":
            min = value;
            tableRow["Minimum"] = value;
            break;
          case "Maximum":
            max = value;
            tableRow["Maximum"] = value;
            break;
          case "StdDev":
            stddev = value;
            tableRow["StdDev"] = value;
            break;
          default:
            break;
        }
      });

      const y = [];
      const nonNullData = []; // separate array for nonNullData from data set

      props.data.dataStream[i].stream.forEach(function(element) {
        let processedDate =  moment(element.Timestamp).valueOf();
        if (element.Value !== null) {
          nonNullData.push(element.Value);
        }
        y.push([processedDate,element.Value]);
        unit = element.UnitsAbbreviation;
      });

      const median = new Stats()
        .push(nonNullData)
        .median()
        .toFixed(2); // calculating median from non null value data set
      tableRow["Median"] = median;

      // set the color
      let color = colors[i % 10];
      let dataStream = props.data.dataStream[i];
      let name = `${dataStream.building}.${dataStream.equipmentNumber}.${
        dataStream.sensorType
      }`;
      if (
        dataStream.equipmentType === "CHW" ||
        dataStream.equipmentType === "HHW"
      ) {
        name = `${dataStream.building}.${dataStream.equipmentType}.${
          dataStream.sensorType
        }`;
      }
      tableRow["Building"] = name;
      let serie = {
        data: y,
        color: color,
        name: name,
        tooltip: {
          headerFormat: "<small>{point.key}</small><table>",
          pointFormat:
            '<tr><td style="color: {series.color}">{series.name}: </td>' +
            '<td style="text-align: right"><b>{point.y} {unit}</b></td></tr>' +
            '<tr><td style="color: {series.color}"> Average</td>' +
            '<td style="text-align: right"><b>' +
            avg +
            "</b></td></tr>" +
            '<tr><td style="color: {series.color}"> Minimum </td>' +
            '<td style="text-align: right"><b>' +
            min +
            "</b></td></tr>" +
            '<tr><td style="color: {series.color}"> Maximum</td>' +
            '<td style="text-align: right"><b>' +
            max +
            "</b></td></tr>" +
            '<tr><td style="color: {series.color}"> Median</td>' +
            '<td style="text-align: right"><b>' +
            median +
            "</b></td></tr>" +
            '<tr><td style="color: {series.color}"> Standard Deviation</td>' +
            '<td style="text-align: right"><b>' +
            stddev +
            "</b></td></tr>",
          footerFormat: "</table>"
        }
      };
      xLines.push(serie);
      tableData.push(tableRow);
    }

    config = {
      legend: {
        enabled: true,
        title: {
          text:
            'Sensor number <br/><span style="font-size: 9px; color: #666; font-weight: normal">(Click to hide)</span>'
        }
      },
      chart: {
        height: 500,
        type: "line",
        zoomType: "xy"
      },
      credits: {
        enabled: false
      },
      xAxis: {
        type: "datetime",
        dateTimeLabelFormats: {
          hour: '%e. %b %H:%M',
          day: '%e. %b',
          week: '%e. %b',
          month: '%b \'%y',
          year: '%Y'
        }
      },
      title: {
        text: `${variables.building}`,
        style: {
          fontSize: "2em",
          fontWeight: "bold"
        }
      },
      subtitle: {
        text: `${variables.equipmentType}`
      },
      exporting: {
        filename: fileName
      },
      tooltip: {
        useHTML: true
      }
    };
    config["series"] = xLines;
    if (this.state.firstRender && config.series.length > 0) {
      this.setState({
        config: [],
        tableData: [],
        updateFlag: true,
        firstRender: false
      });
    } else {
      this.setState({
        config: [config, ...this.state.config],
        tableData: tableData,
        updateFlag: true
      });
    }
  }

  headerCallback(dataFromHeader) {
    this.props.callback3(dataFromHeader);
  }

  removeChart(index) {
    var config = this.state.config;
    var tableData = this.state.tableData;
    config[index].series
      .map(function(e) {
        return e.name;
      })
      .forEach(function(element) {
        tableData = tableData.filter((row) => row.Building !== element);
      });
    config.splice(index, 1);
    this.setState({
      config: config,
      tableData: tableData
    });
  }

  clearAll() {
    this.setState({
      config: [],
      tableData: []
    });
  }

  render() {
    if (
      (this.state.updateFlag === null || this.props.data.loading) &&
      !this.state.firstRender
    ) {
      return (
        <div>
          <Row style={{ marginRight: "0px", marginLeft: "0px" }}>
            <Col md={12} xsHidden style={{ minHeight: "50px" }} />
            <Col md={12}>
              <HeaderLinks
                callback={this.headerCallback}
                selection={this.props.headerData}
                clearCallback={this.clearAll}
                isLoading={false}
              />
            </Col>
          </Row>
          <Row
            style={{ height: "200px", marginRight: "0px", marginLeft: "0px" }}
          >
            <Col md={12}>
              <Card
                content={
                  <center>
                    <h3>
                      <center>
                        <font color="#1dc7ea">Loading</font>
                      </center>
                    </h3>
                    <p>
                      <center>
                        <font>
                          If this is taking too long, you may want to refine
                          your query.
                        </font>
                      </center>
                    </p>
                    <BarLoader
                      color={"#3C4858"}
                      loading={this.props.data.loading}
                    />
                  </center>
                }
              />
            </Col>
          </Row>
        </div>
      );
    } else if (this.props.data && this.props.data.error) {
      return (
        <div>
          <Row style={{ marginRight: "0px", marginLeft: "0px" }}>
            <HeaderLinks
              callback={this.headerCallback}
              selection={this.props.headerData}
              clearCallback={this.clearAll}
              isLoading={false}
            />
          </Row>
          <Jumbotron>
            <h3>
              <center>
                <font color="red">Error</font>
              </center>
            </h3>
            <center>
              All forms need to be filled out. Also, make sure your time range
              is valid.
            </center>
          </Jumbotron>;
        </div>
      );
    }

    return (
      <div>
        <Row style={{ marginRight: "0px", marginLeft: "0px" }}>
          <Col md={12} xsHidden style={{ minHeight: "50px" }} />
          <Col md={12}>
            <HeaderLinks
              callback={this.headerCallback}
              selection={this.props.headerData}
              clearCallback={this.clearAll}
              isLoading={false}
            />
          </Col>
        </Row>
        <Row style={{ marginRight: "0px", marginLeft: "0px" }}>
          {this.state.config.map((item) => (
            <Col md={12} key={this.state.config.indexOf(item)}>
              <Card
                category={
                  <Button
                    simple
                    icon
                    onClick={() =>
                      this.removeChart(this.state.config.indexOf(item))
                    }
                  >
                    <Glyphicon glyph="remove-circle" />
                  </Button>
                }
                content={<Highcharts config={item} ref="ct-chart" />}
                stats={<TimeAgo datetime={new Date()} />}
              />
            </Col>
          ))}
          <Col md={12}>
            <Card
              title="Statistics"
              ctTableFullWidth
              ctTableResponsive
              downloadLink={
                <CSVLink data={this.state.tableData}>Download me</CSVLink>
              }
              content={
                <DraggableTable
                  filterable
                  defaultFilterMethod={(filter, row) =>
                    String(row[filter.id]).toLocaleLowerCase() ===
                    filter.value.toLocaleLowerCase()
                  }
                  rows={this.state.tableData}
                  columns={[
                    {
                      Header: "Sensor Name",
                      accessor: "Building",
                      filterMethod: (filter, row) =>
                        String(row[filter.id])
                          .toLocaleLowerCase()
                          .includes(filter.value.toLocaleLowerCase())
                    },
                    {
                      // Header: "Equipment Type",
                      Header: "Maximum",
                      accessor: "Maximum",
                      // accessor: d => d.Maximum,
                      filterMethod: (filter, row) =>
                        String(row[filter.id])
                          .toLocaleLowerCase()
                          .includes(filter.value.toString().toLocaleLowerCase())
                      // filterAll: true,
                    },
                    {
                      Header: "Minimum",
                      accessor: "Minimum",
                      filterMethod: (filter, row) =>
                        String(row[filter.id])
                          .toLocaleLowerCase()
                          .includes(filter.value.toString().toLocaleLowerCase())
                    },
                    {
                      Header: "Median",
                      accessor: "Median",
                      filterMethod: (filter, row) =>
                        String(row[filter.id])
                          .toLocaleLowerCase()
                          .includes(filter.value.toString().toLocaleLowerCase())
                    },
                    {
                      Header: "Average",
                      accessor: "Average",
                      filterMethod: (filter, row) =>
                        String(row[filter.id])
                          .toLocaleLowerCase()
                          .includes(filter.value.toString().toLocaleLowerCase())
                    },
                    {
                      Header: "Standard Deviation",
                      accessor: "StdDev",
                      filterMethod: (filter, row) =>
                        String(row[filter.id])
                          .toLocaleLowerCase()
                          .includes(filter.value.toString().toLocaleLowerCase())
                    }
                  ]}
                  defaultPageSize={10}
                  className="-striped -highlight"
                />
              }
            />
          </Col>
        </Row>
      </div>
    );
  }
}

const DATA_QUERY = gql`
  query DataQuery(
    $building: String
    $equipmentType: String
    $equipmentNumber: String
    $sensorType: String
    $startTime: String
    $endTime: String
    $interval: String
  ) {
    dataStream(
      building: $building
      equipmentType: $equipmentType
      equipmentNumber: $equipmentNumber
      sensorType: $sensorType
      startTime: $startTime
      endTime: $endTime
      interval: $interval
    ) {
      building
      equipmentType
      equipmentNumber
      sensorType
      stream {
        Timestamp
        Value
        UnitsAbbreviation
      }
      summary {
        Type
        Value {
          Value
        }
      }
    }
  }
`;

export default graphql(DATA_QUERY, {
  options: (props) => ({
    variables: {
      building: props.headerData.building,
      equipmentType: props.headerData.equipmentType,
      equipmentNumber: props.headerData.equipmentNumber,
      sensorType: props.headerData.sensorType,
      startTime: props.headerData.startTime.format("MM-DD-YYYY-Ha"),
      endTime: props.headerData.endTime.format("MM-DD-YYYY-Ha"),
      interval: props.headerData.interval
    }
  })
})(Dashboard);
