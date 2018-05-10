import React, { Component } from "react";
import moment from "moment-timezone";
import { Row, Col, Jumbotron, Glyphicon } from "react-bootstrap";
import { BarLoader } from "react-spinners";
import Button from '../../elements/CustomButton/CustomButton.jsx';
import Highcharts from "react-highcharts";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import HeaderLinks from "../../components/Header/HeaderLinks.jsx";
import { Card } from "../../components/Card/Card.jsx";
import DraggableTable from "../TableList/DraggableTable";
import { CSVLink } from 'react-csv';
import matchSorter from 'match-sorter';


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
      renderCount: 0,
      didMount: false,
      tableData: [],
      config: []
    };
  }

  findMaxXaxisIndex (nextProps) {
    let index = 0, maxSize = 0, maxIndex = 0;
      nextProps.data.dataStream.forEach(function (element) {
        if (maxSize < element.stream.length) {
            maxSize =  element.stream.length;
            maxIndex = index;
        }
        index += 1;
      });

      return maxIndex;
  }
  /* when new query parameters are received in the props,
    we refetch the graphQL query and convert the timezone. */
  componentWillReceiveProps(nextProps) {
    this.props.data.refetch();
    if (typeof nextProps.data.dataStream === "undefined" || nextProps.data.loading) {
      return;
    }
    let config = {}, xLines = [], x = [];
    let tableData = this.state.tableData;
    const variables = nextProps.data.variables,
        maxIndex = this.findMaxXaxisIndex(nextProps),
        fileName = `${variables.building}_${variables.equipmentType}_${variables.equipmentNumber}_${variables.sensorType}`;
    for (let i = 0; i < nextProps.data.dataStream.length; i++) {
      let unit, avg, min, max, stddev;
      let tableRow = {};
      nextProps.data.dataStream[i].summary.forEach(function(element) {
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
      if (i === maxIndex) {
          nextProps.data.dataStream[i].stream.forEach(function(element) {
              x.push(
                  moment
                      .tz(element.Timestamp, "US/Pacific")
                      .format("YYYY-MM-DD HH:mm")
              );
          });
      }
      const y = [];

      nextProps.data.dataStream[i].stream.forEach(function(element) {
            y.push(element.Value);
            unit = element.UnitsAbbreviation;
        });
      const median = new Stats().push(y).median();

      // generate a random color.
      let color = "#" + Math.floor(Math.random() * 16777215).toString(16);
      let dataStream = nextProps.data.dataStream[i];
      let name = `${dataStream.building}.${dataStream.equipmentNumber}.${dataStream.sensorType}`;
      if(dataStream.equipmentType === "CHW" || dataStream.equipmentType === "HHW") {
          name = `${dataStream.building}.${dataStream.equipmentType}.${dataStream.sensorType}`;
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
            '</b></td></tr>' +
            '<tr><td style="color: {series.color}"> Minimum </td>' +
            '<td style="text-align: right"><b>' +
            min +
            '</b></td></tr>' +
            '<tr><td style="color: {series.color}"> Maximum</td>' +
            '<td style="text-align: right"><b>' +
            max +
            '</b></td></tr>' +
            '<tr><td style="color: {series.color}"> Standard Deviation</td>' +
            '<td style="text-align: right"><b>' +
            stddev +
            '</b></td></tr>',
            footerFormat: '</table>',
          }
      };
      xLines.push(serie);
      tableData.push(tableRow);
      this.setState(
          {
            renderCount: this.state.renderCount + 1
          }
      );
    }
    config = {
          legend: {
              enabled: true,
          },
          chart: {
              height: 500,
              type: "line",
              zoomType: "xy",

          },
          xAxis: {
              categories: x
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
              useHTML: true,
          }
      };
    config["series"] = xLines;

    this.setState(
      {
        config: [...this.state.config, config],
        tableData: tableData
    }, function () {
        console.log(this.state);
    }
    );
  }

  componentDidMount() {
    this.setState({ didMount: true });
  }

  headerCallback(dataFromHeader) {
    this.props.callback(dataFromHeader);
  }

  removeChart(index) {
      var config = this.state.config;
      var tableData = this.state.tableData;
      config[index].series.map(function(e) { return e.name; }).forEach( function(element) {
            tableData = tableData.filter(row => row.Building !== element);
      });
      config.splice(index, 1);
      this.setState({
         config: config,
         tableData: tableData
      });
  }

  clearAll () {
      this.setState({
         config: [],
         tableData: []
      });
  }

  render() {
    if (this.state.didMount) {
      this.props.data.refetch();
    }

    if (this.props.data && this.props.data.loading) {
      return (
        <div>
          <Row style={{ marginRight: "0px", marginLeft: "0px" }}>
            <HeaderLinks callback={this.headerCallback} isLoading={false} />
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
                        <font color="#9acd32">Loading</font>
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
    }

    if (this.props.data && this.props.data.error) {
      return (
        <div>
          <Row style={{ marginRight: "0px", marginLeft: "0px" }}>
            <HeaderLinks callback={this.headerCallback} isLoading={false} />
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
          <HeaderLinks callback={this.headerCallback} clearCallback={this.clearAll} isLoading={false} />
        </Row>
        <Row style={{ marginRight: "0px", marginLeft: "0px" }}>
              {
                  this.state.config.map((item) => (
                      <Col md={12} key={this.state.config.indexOf(item)}>
                      <Card
                        category={<Button simple icon onClick={() => this.removeChart(this.state.config.indexOf(item))}>
                                  <Glyphicon glyph="remove-circle" />
                                  </Button>}
                        content={<Highcharts config={item} ref="ct-chart" />}
                      />
                      </Col>
                  ))
              }
          <Col md={12}>
                      {/*https://medium.com/@ruthmpardee/passing-data-between-react-components-103ad82ebd17*/}
                  <CSVLink data={this.state.tableData}>Download me</CSVLink>
                  <Card
                      title="Sensor Statistics"
                      ctTableFullWidth
                      ctTableResponsive
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
                                      Header: 'Sensor Name',
                                      accessor: 'Building',
                                      filterMethod: (filter, row) =>
                                          String(row[filter.id])
                                              .toLocaleLowerCase()
                                              .includes(filter.value.toLocaleLowerCase()),
                                  },
                                  {
                                      // Header: "Equipment Type",
                                      Header: 'Maximum',
                                      accessor: 'Maximum',
                                      // accessor: d => d.Maximum,
                                      filterMethod: (filter, rows) =>
                                          matchSorter(rows, filter.value, {
                                              keys: ['Maximum'],
                                          }),
                                      // filterAll: true,
                                  },
                                  {
                                      Header: 'Minimum',
                                      accessor: 'Minimum'
                                  },
                                  {
                                      Header: 'Average',
                                      accessor: 'Average'
                                  },
                                  {
                                      Header: 'Standard Deviation',
                                      accessor: 'StdDev'
                                  },
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
  options: props => ({
    variables: {
      building: props.headerData.building,
      equipmentType: props.headerData.equipmentType,
      equipmentNumber: props.headerData.equipmentNumber,
      sensorType: props.headerData.sensorType,
      startTime: props.headerData.startTime,
      endTime: props.headerData.endTime,
      interval: props.headerData.interval
    }
  })

})(Dashboard);
