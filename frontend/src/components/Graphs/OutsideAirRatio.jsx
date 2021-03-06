// Pre-Baked Graph #3:
// Outside Air Ratio:
// Outside Air Temp - Return Air Temp vs. Mixed Air Temp - Return Air Temp
import React, { Component } from 'react';
import { Row, Col, Jumbotron } from 'react-bootstrap';
import { BarLoader } from 'react-spinners';
import Highcharts from 'react-highcharts';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Card } from '../../components/Card/Card.jsx';
import { DateTime } from 'luxon';
import { colors } from '../../variables/colors';
import TimeAgo from 'timeago-react';

require('highcharts/modules/exporting')(Highcharts.Highcharts);
require('highcharts/modules/export-data')(Highcharts.Highcharts);

class OARGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      config: null,
      building: null,
      selectBuilding: null,
      dateSelection: null,
    };
  }

  componentDidMount() {
    this._loadGraphData(this.props);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.config === null) {
      this._loadGraphData(this.props);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // Store prevId in state so we can compare when props change.
    // Clear out previously-loaded data (so we don't render stale stuff).

    if (
      nextProps.building !== prevState.building ||
      nextProps.dateSelection != prevState.dateSelection ||
      (nextProps.data.selectBuilding != undefined &&
        nextProps.data.selectBuilding != prevState.selectBuilding)
    ) {
      return {
        config: null,
        building: nextProps.building,
        dateSelection: nextProps.dateSelection,
        selectBuilding: nextProps.data.selectBuilding,
      };
    }
    // No state update necessary
    return null;
  }

  /* when new query parameters are recieved in the props,
      we refetch the graphQL query and convert the timezone. */
  _loadGraphData(props) {
    this.props.data.refetch();
    var fileName = `$(props.data.variables.building)_SupplyTemp_data`;
    if (props.data.selectBuilding == undefined) {
      console.log('loading');
      return;
    }
    var series = [];
    var config = {
      legend: {
        enabled: true,
        title: {
          text:
            'Sensor number <br/><span style="font-size: 9px; color: #666; font-weight: normal">(Click to hide)</span>',
        },
      },
      exporting: {
        showTable: false,
        fileName: fileName,
      },
      chart: {
        height: 800,
        zoomType: 'xy',
      },
      credits: {
        enabled: false,
      },
      xAxis: {
        title: {
          enabled: true,
          text: 'Outside Air Temp - Return Air Temp °F',
        },
      },
      yAxis: {
        title: {
          enabled: true,
          text: 'Mixed Air Temp - Return Air Temp °F',
        },
      },
      title: {
        text: props.data.variables.building,
      },
      subtitle: {
        text: 'Outside Air Ratio',
      },
      tooltip: {
        useHTML: true,
      },
    };

    let month = this.props.dateSelection.monthOfYear;
    let day = this.props.dateSelection.dayOfMonth;
    let weekday = this.props.dateSelection.dayOfWeek;
    let hour = this.props.dateSelection.hourOfDay;

    for (var i = 0; i < props.data.selectBuilding.length; i += 3) {
      var points = [];
      for (var j = 0; j < props.data.selectBuilding[i].stream.length; j++) {
        // we can access sensor names alphabetically.
        var MAT = props.data.selectBuilding[i].stream[j].Value;
        var OAT = props.data.selectBuilding[i + 1].stream[j].Value;
        var RAT = props.data.selectBuilding[i + 2].stream[j].Value;
        var Time = props.data.selectBuilding[i].stream[j].Timestamp;
        if (RAT == null || MAT == null || OAT == null) {
          continue;
        }
        var point = {};
        point['x'] = Number((OAT - RAT).toFixed(2));
        point['y'] = Number((MAT - RAT).toFixed(2));
        point['Timestamp'] = DateTime.fromISO(Time);
        points.push(point);
      }

      if (
        month.size !== undefined ||
        day.size !== undefined ||
        weekday.size !== undefined ||
        hour.size !== undefined
      ) {
        points = points.filter(obj => {
          // filter by month
          return (
            month.has(obj.Timestamp.month.toString()) &&
            day.has(obj.Timestamp.day.toString()) &&
            weekday.has(obj.Timestamp.weekday.toString()) &&
            hour.has(obj.Timestamp.hour.toString())
          );
        });
      }

      points.forEach(point => {
        point.Timestamp = point.Timestamp.toFormat('yyyy-LLL-dd HH:mm:ss');
      });

      // choose a color
      var color = colors[(i / 3) % 10];
      var data = props.data.selectBuilding[i];
      var name = `${data.building}.${data.equipmentNumber}`;
      var serie = {
        data: points,
        color: color,
        name: name,
        type: 'scatter',
        turboThreshold: 0,
        tooltip: {
          headerFormat: '<small></small><table>',
          pointFormat:
            '<tr><td style="color: {series.color}">{series.name} </td></tr>' +
            '<small>{point.Timestamp}</small><table>' +
            '<tr><td style="color: {series.color}">Supply Air Temp :</td>' +
            '<td style="text-align: right"><b> {point.y} </b></td></tr>' +
            '<tr><td style="color: {series.color}">Supply Air Temp SP :</td>' +
            '<td style="text-align: right"><b>{point.x} </b></td></tr>',
          footerFormat: '</table>',
        },
      };
      series.push(serie);
    }
    // Define the different slope reference lines.
    var tenPercent = {
      type: 'line',
      name: '10% Line',
      color: '#A9A9A9',
      data: [[-30, -3], [30, 3]],
      marker: {
        enabled: false,
      },
      states: {
        hover: {
          lineWidth: 0,
        },
      },
      enableMouseTracking: false,
    };
    var twentyPercent = {
      type: 'line',
      name: '20% Line',
      color: '#A9A9A9',
      data: [[-30, -6], [30, 6]],
      marker: {
        enabled: false,
      },
      states: {
        hover: {
          lineWidth: 0,
        },
      },
      enableMouseTracking: false,
    };
    var thirtyPercent = {
      type: 'line',
      name: '30% Line',
      color: '#A9A9A9',
      data: [[-30, -9], [30, 9]],
      marker: {
        enabled: false,
      },
      states: {
        hover: {
          lineWidth: 0,
        },
      },
      enableMouseTracking: false,
    };
    var hundredPercent = {
      type: 'line',
      name: '100% Line',
      color: '#A9A9A9',
      data: [[-30, -30], [30, 30]],
      marker: {
        enabled: false,
      },
      states: {
        hover: {
          lineWidth: 0,
        },
      },
      enableMouseTracking: false,
    };
    series.push(tenPercent);
    series.push(twentyPercent);
    series.push(thirtyPercent);
    series.push(hundredPercent);
    config['series'] = series;

    this.setState({
      config: config,
    });
  }

  render() {
    if (this.state.config === null || this.props.data.loading) {
      return (
        <div>
          <Row
            style={{ height: '200px', marginRight: '0px', marginLeft: '0px' }}
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
                    <BarLoader
                      color={'#3C4858'}
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
          <Jumbotron>
            <h3>
              <center>
                <font color="red">Error</font>
              </center>
            </h3>
            <center>There was an error.</center>
          </Jumbotron>
        </div>
      );
    }

    if (this.state.config.series.length == 4) {
      return (
        <div>
          <Jumbotron>
            <h3>
              <center>
                <font>No Air Ratio Data</font>
              </center>
            </h3>
          </Jumbotron>
        </div>
      );
    }

    return (
      <div>
        <Row style={{ marginRight: '0px', marginLeft: '0px' }}>
          <Col md={12}>
            <Card
              content={<Highcharts config={this.state.config} ref="ct-chart" />}
              stats={<TimeAgo datetime={new Date()} />}
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
    $sensorType: String
    $startTime: String
    $endTime: String
    $interval: String
  ) {
    selectBuilding(
      building: $building
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
      }
    }
  }
`;

export default graphql(DATA_QUERY, {
  options: props => ({
    variables: {
      building: props.selection.building,
      sensorType: 'Outside Air Temp,Mixed Air Temp,Return Air Temp',
      startTime: props.selection.startTime.format('MM-DD-YYYY-Ha'),
      endTime: props.selection.endTime.format('MM-DD-YYYY-Ha'),
      interval: '1h',
    },
  }),
})(OARGraph);
