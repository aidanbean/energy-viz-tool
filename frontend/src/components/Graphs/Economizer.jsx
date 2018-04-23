// Pre-Baked Graph #1:
// Average Hourly Mixed Air Temperature  vs. Corresponding Average Hourly OAT (economizer function)
// Let's you visualize whether the economizers are working properly.
import React, { Component } from 'react';
import moment from 'moment-timezone';
import {Row, Col, Jumbotron } from 'react-bootstrap';
import { BarLoader } from 'react-spinners';
import ReactHighcharts from 'react-highcharts';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {Card} from '../../components/Card/Card.jsx';

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
                chart: {
                    height: 400,
                    type: 'scatter',
                    zoomType: 'xy'
                },
                xAxis: {
                    title: {
                        enabled: true,
                        text: 'Outside Air Temperature'
                    },
                    startOnTick: true,
                    endOnTick: true,
                    showLastLabel: true
                },
                yAxis: {
                    title: {
                        text: 'Mixed Air Temperature'
                    }
                },
                series: [{
                    data: [],
                    color: '#9acd32'
                }]
            },
            time: new Date()
        }
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
        console.log(nextProps);
        this.props.data.refetch();
        if(this.props.data.selectBuilding == 'undefined') {
            console.log("loading");
            return;
        }
        var series = [];
        var config = {
            legend: {
                enabled: true
            },
            chart: {
                height: 400,
                type: 'scatter',
                zoomType: 'xy'
            },
            xAxis: {
                title: {
                    enabled: true,
                    text: 'Outside Air Temperature'
                }
            },
            yAxis: {
                title: {
                    enabled: true,
                    text: 'Mixed Air Temperature'
                }
            }
        };
        for(var i = 0; i < nextProps.data.selectBuilding.length; i+=2) {
            var points = [];
            for(var j = 0; j < nextProps.data.selectBuilding[i].stream.length; j++) {
                var point = [];
                point.push(nextProps.data.selectBuilding[i+1].stream[j].Value);
                point.push(nextProps.data.selectBuilding[i].stream[j].Value);
                points.push(point);
            }
            // generate a random color.
            var color = '#'+Math.floor(Math.random()*16777215).toString(16);
            var name = `${nextProps.data.selectBuilding[i].equipmentNumber}`;
            var serie = {
                data: points,
                color: color,
                name: name
            };
            series.push(serie);
        }
        config["series"] = series;
        this.setState({
                config: config
        }, () => {
            console.log(this.state.config);
        });
    }

    refresh() {
        this.props.data.refetch();
    }

    componentDidMount() {
        this.setState({ didMount: true });
    }

    render() {

        this.props.data.refetch();

        if (this.props.data && this.props.data.loading) {
            return (
                <div>
                    <Row style={{'height': '200px', 'marginRight': '0px', 'marginLeft': '0px'}}>
                        <Col md={1}></Col>
                        <Col md={10}>
                            <Card
                                statsIcon="fa fa-refresh"
                                id="chartHours"
                                title={this.props.building}
                                category="Economizer Analysis"
                                content={
                                    <center>
                                        <h3><center><font color="#9acd32">Loading</font></center></h3>
                                        <BarLoader
                                            color={'#3C4858'}
                                            loading={this.props.data.loading}
                                        />
                                    </center>
                                }
                            />
                        </Col>
                        <Col md={1}></Col>
                    </Row>
                </div>
            );
        }

        if (this.props.data && this.props.data.error) {
            return (
                <div>
                    <Jumbotron>
                      <h3><center><font color="red">Error</font></center></h3>
                        <center>
                        There was an error.
                        </center>
                    </Jumbotron>;
                </div>
            );
        }

        return (
            <div>
                <Row style={{'marginRight': '0px', 'marginLeft': '0px'}}>
                    <Col md={1}></Col>
                    <Col md={12}>
                        <Card
                            statsIcon="fa fa-refresh"
                            id="chartHours"
                            title={this.props.building}
                            category="Economizer Evaluation"
                            content={
                                <div className="ct-chart">
                                    <ReactHighcharts
                                        config={this.state.config}
                                        ref = 'ct-chart'
                                    />
                                </div>
                                }
                            legend={
                                <div>
                                    <p>padding</p>
                                    <p>padding</p>
                                    <p>padding</p>
                                    <p>padding</p>
                                </div>
                            }
                        />
                    </Col>
                    <Col md={1}></Col>
                </Row>
            </div>
        );
    }
}

const DATA_QUERY = gql`
    query DataQuery(
        $building       : String,
        $sensorType     : String,
        $startTime      : String,
        $endTime        : String,
        $interval       : String
    ) {
        selectBuilding
        (
            building       : $building,
            sensorType     : $sensorType,
            startTime      : $startTime,
            endTime        : $endTime,
            interval       : $interval
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
    options: (props) => ({
        variables: {
            building       : props.building,
            sensorType     : "Mixed Air Temp,Outside Air Temp",
            startTime      : "01-01-2017-6am",
            endTime        : "02-01-2017-6am",
            interval       : "1h"
        }
    }),
})(EconGraph);
