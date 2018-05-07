// Pre-Baked Graph #1:
// Average Hourly Mixed Air Temperature  vs. Corresponding Average Hourly OAT (economizer function)
// Let's you visualize whether the economizers are working properly.
import React, {Component} from "react";
import moment from "moment-timezone";
import {Row, Col, Jumbotron} from "react-bootstrap";
import {BarLoader} from "react-spinners";
import Highcharts from "react-highcharts";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {Card} from "../../components/Card/Card.jsx";
import {DateTime} from 'luxon';

require("highcharts/modules/exporting")(Highcharts.Highcharts);
require("highcharts/modules/export-data")(Highcharts.Highcharts);

class EconGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            didMount: false,
            progress: 0,
            config: {
                legend: {
                    enabled: true
                },
                exporting: {
                    showTable: false
                },
                chart: {
                    height: 400,
                    type: "scatter",
                    zoomType: "xy"
                },
                xAxis: {
                    title: {
                        enabled: true,
                        text: "Outside Air Temperature"
                    },
                    startOnTick: true,
                    endOnTick: true,
                    showLastLabel: true
                },
                yAxis: {
                    title: {
                        text: "Mixed Air Temperature"
                    }
                },
                series: [
                    {
                        data: [],
                        color: "#9acd32"
                    }
                ]
            },
            time: new Date()
        };
    }

    // static createLegend(json){
    //     var legend = [];
    //     for(var i = 0; i < json["names"].length; i++){
    //         var type = "fa fa-circle text-"+json["types"][i];
    //         legend.push(
    //             <i className={type} key={i}></i>
    //         );
    //         legend.push(" ");
    //         legend.push(
    //             json["names"][i]
    //         );
    //     }
    //     return legend;
    // }

    /* when new query parameters are recieved in the props,
      we refetch the graphQL query and convert the timezone. */
    componentWillReceiveProps(nextProps) {
        console.log('nextProps');
        console.log(nextProps);
        this.props.data.refetch();
        var fileName = `$(nextProps.data.variables.building)_Economizer_data`;
        if (this.props.data.selectBuilding == "undefined") {
            console.log("loading");
            return;
        }
        var series = [];
        var config = {
            legend: {
                enabled: true
            },
            exporting: {
                showTable: false,
                fileName: fileName
            },
            chart: {
                height: 400,
                type: "scatter",
                zoomType: "xy"
            },
            xAxis: {
                title: {
                    enabled: true,
                    text: "Outside Air Temperature"
                }
            },
            yAxis: {
                title: {
                    enabled: true,
                    text: "Mixed Air Temperature"
                }
            },
            title: {
                text: nextProps.data.variables.building
            },
            subtitle: {
                text: "Economizer Evaluation"
            },
            tooltip: {
                useHTML: true
            }
        };


        let month = this.props.dateSelection.monthOfYear;
        let day = this.props.dateSelection.dayOfMonth;
        let weekday = this.props.dateSelection.dayOfWeek;
        let hour = this.props.dateSelection.hourOfDay;

        for (var i = 0; i < nextProps.data.selectBuilding.length; i += 2) {
            var points = [];
            for (var j = 0; j < nextProps.data.selectBuilding[i].stream.length; j++) {
                var point = {};

                point["x"] = (nextProps.data.selectBuilding[i + 1].stream[j].Value);
                point["y"] = (nextProps.data.selectBuilding[i].stream[j].Value);
                point["Timestamp"] = (nextProps.data.selectBuilding[i + 1].stream[j].Timestamp);
                points.push(point);
            }

            if (month.length != 0 || day.length != 0 || weekday.length != 0 || hour.length != 0) {
                points = points.filter(obj => {// filter by month
                    if (month.length == 0) {
                        return true;
                    }
                    let dateTime = DateTime.fromISO(obj.Timestamp, {zone: 'utc'});
                    for (var m = 0; i < month.length; i++) {
                        if (dateTime.month == month[i]) {
                            return true;
                        }
                    }
                    return false;
                }).filter(obj => {
                    if (day.length == 0) {
                        return true;
                    }
                    let dateTime = DateTime.fromISO(obj.Timestamp, {zone: 'utc'});
                    for (var m = 0; m < day.length; m++) {// by day
                        if (dateTime.day == day[m]) {
                            return true;
                        }
                    }
                    return false;
                }).filter(obj => {
                    if (weekday.length == 0) {
                        return true;
                    }
                    let dateTime = DateTime.fromISO(obj.Timestamp, {zone: 'utc'});
                    for (var m = 0; m < weekday.length; m++) { // by weekday
                        if (dateTime.weekday == weekday[m]) {
                            return true;
                        }
                    }
                    return false;
                }).filter(obj => {
                    if (hour.length == 0) {
                        return true;
                    }
                    let dateTime = DateTime.fromISO(obj.Timestamp, {zone: 'utc'});
                    for (var m = 0; m < hour.length; m++) {// by hour
                        if (dateTime.hour == hour[m]) {
                            return true;
                        }
                    }
                    return false;
                });
            }

            // generate a random color.
            var color = "#" + Math.floor(Math.random() * 16777215).toString(16);
            var data = nextProps.data.selectBuilding[i];
            var name = `${data.building}.${data.equipmentNumber}`;
            // debugger;
            var serie = {
                data: points,
                color: color,
                name: name,
                turboThreshold: 0,
                tooltip: {
                    headerFormat: '<small></small><table>',
                    pointFormat:
                    '<tr><td style="color: {series.color}">{series.name} </td></tr>' +
                    '<small>{point.Timestamp}</small><table>' +
                    '<tr><td style="color: {series.color}">Mixed Air Temp :</td>' +
                    '<td style="text-align: right"><b> {point.y} </b></td></tr>' +
                    '<tr><td style="color: {series.color}">Outside Air Temp :</td>' +
                    '<td style="text-align: right"><b>{point.x} </b></td></tr>',
                    footerFormat: "</table>"
                }
            };
            series.push(serie);
        }

        config["series"] = series;
        this.setState({
            config: config
        });
    }

    refresh() {
        this.props.data.refetch();
    }

    componentDidMount() {
        this.setState({didMount: true});
    }


    // componentWillUpdate(nextProps, value) {
    //   console.log('will update');
    //   console.log(nextProps);
    //   console.log(value);
    //     return true;
    // }
    //
    // shouldComponentUpdate(nextProps, nextState) {
    //     if nextProps.dateSelection
    // }

    render() {
        this.props.data.refetch();

        if (this.props.data && this.props.data.loading) {
            return (
                <div>
                    <Row
                        style={{height: "200px", marginRight: "0px", marginLeft: "0px"}}
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
                    <Jumbotron>
                        <h3>
                            <center>
                                <font color="red">Error</font>
                            </center>
                        </h3>
                        <center>There was an error.</center>
                    </Jumbotron>;
                </div>
            );
        }

        return (
            <div>
                <Row style={{marginRight: "0px", marginLeft: "0px"}}>
                    <Col md={12}>
                        <Card
                            content={<Highcharts config={this.state.config} ref="ct-chart"/>}
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
            building: props.building,
            sensorType: "Mixed Air Temp,Outside Air Temp",
            startTime: moment().subtract(2, 'months').format("MM-DD-YYYY-ha"),
            endTime: moment().format("MM-DD-YYYY-ha"),
            interval: "1h"
        }
    })
})(EconGraph);