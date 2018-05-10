// Pre-Baked Graph #2:
// Average Hourly Supply Air Temp. vs. Average Hourly Supply Air Temp SP  (is it controlling well?)
import React, {Component} from "react";
import moment from "moment-timezone";
import {Row, Col, Jumbotron} from "react-bootstrap";
import {BarLoader} from "react-spinners";
import Highcharts from "react-highcharts";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import {Card} from "../../components/Card/Card.jsx";
import {DateTime} from "luxon";


require("highcharts/modules/exporting")(Highcharts.Highcharts);
require("highcharts/modules/export-data")(Highcharts.Highcharts);

class EconGraph extends Component {
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

    static getDerivedStateFromProps(nextProps, prevState){
        // Store prevId in state so we can compare when props change.
        // Clear out previously-loaded data (so we don't render stale stuff).

        if (nextProps.building !== prevState.building || nextProps.dateSelection != prevState.dateSelection
            || (nextProps.data.selectBuilding != undefined && nextProps.data.selectBuilding != prevState.selectBuilding)) {
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
    _loadGraphData(props){
        this.props.data.refetch();
        var fileName = `$(props.data.variables.building)_SupplyTemp_data`;
        if (props.data.selectBuilding == undefined) {
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
                    text: "Supply Air Temperature Set Point"
                }
            },
            yAxis: {
                title: {
                    enabled: true,
                    text: "Supply Air Temperature"
                }
            },
            title: {
                text: props.data.variables.building
            },
            subtitle: {
                text: "Supply Air Temperature Evaluation"
            },
            tooltip: {
                useHTML: true
            }
        };

        let month = this.props.dateSelection.monthOfYear;
        let day = this.props.dateSelection.dayOfMonth;
        let weekday = this.props.dateSelection.dayOfWeek;
        let hour = this.props.dateSelection.hourOfDay;

        for (var i = 0; i < props.data.selectBuilding.length; i += 2) {
            var points = [];
            for (var j = 0; j < props.data.selectBuilding[i].stream.length; j++) {
                var point = {};
                point["x"] = (props.data.selectBuilding[i + 1].stream[j].Value);
                point["y"] = (props.data.selectBuilding[i].stream[j].Value);
                point["Timestamp"] = (props.data.selectBuilding[i + 1].stream[j].Timestamp);
                points.push(point);
            }

            if (month.length != 0 || day.length != 0 || weekday.length != 0 || hour.length != 0) {
                points = points.filter(obj => {// filter by month
                    if (month.length == 0) {
                        return true;
                    }
                    let dateTime = DateTime.fromISO(obj.Timestamp, {zone: 'utc'});
                    return month.has(dateTime.month.toString());
                }).filter(obj => {
                    if (day.length == 0) {
                        return true;
                    }
                    let dateTime = DateTime.fromISO(obj.Timestamp, {zone: 'utc'});
                    return day.has(dateTime.day.toString());
                }).filter(obj => {
                    if (weekday.length == 0) {
                        return true;
                    }
                    let dateTime = DateTime.fromISO(obj.Timestamp, {zone: 'utc'});
                    return weekday.has(dateTime.weekday.toString());
                }).filter(obj => {
                    if (hour.length == 0) {
                        return true;
                    }
                    let dateTime = DateTime.fromISO(obj.Timestamp, {zone: 'utc'});
                    return hour.has(dateTime.hour.toString());
                });
            }

            // generate a random color.
            var color = "#" + Math.floor(Math.random() * 16777215).toString(16);
            var data = props.data.selectBuilding[i];
            var name = `${data.building}.${data.equipmentNumber}`;
            var serie = {
                data: points,
                color: color,
                name: name,
                turboThreshold: 0,
                tooltip: {
                    headerFormat: "<small></small><table>",
                    pointFormat:
                    '<tr><td style="color: {series.color}">{series.name} </td></tr>' +
                    '<small>{point.Timestamp}</small><table>' +
                    '<tr><td style="color: {series.color}">Supply Air Temp :</td>' +
                    '<td style="text-align: right"><b> {point.y} </b></td></tr>' +
                    '<tr><td style="color: {series.color}">Supply Air Temp SP :</td>' +
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

    render() {
        if (this.state.config === null || this.props.data.loading) {
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
            sensorType: "Supply Air Temp,Supply Air Temp Sp",
            startTime: moment().subtract(2, 'months').format("MM-DD-YYYY-Ha"),
            endTime: moment().format("MM-DD-YYYY-Ha"),
            interval: "1h"
        }
    })
})(EconGraph);
