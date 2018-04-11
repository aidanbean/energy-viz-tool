import React, { Component } from 'react';
import moment from 'moment-timezone';
import { Grid, Row, Col, ProgressBar, Button, Jumbotron } from 'react-bootstrap';
import { BarLoader } from 'react-spinners';
import ReactHighcharts from 'react-highcharts';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import HeaderLinks from '../../components/Header/HeaderLinks.jsx';
import Building from '../../components/SearchBar/BuidlingSearchBar'
import EquipType from '../../components/SearchBar/EquipmentTypeSearchBar'
import EquipNum from '../../components/SearchBar/EquipmentNumberSearchBar'
import Sensor from '../../components/SearchBar/SensorTypeSearchBar'
import Start from '../../components/SearchBar/StartForm';
import End from '../../components/SearchBar/EndForm';
import Interval from '../../components/SearchBar/IntervalForm';
import {Card} from '../../components/Card/Card.jsx';


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.headerCallback = this.headerCallback.bind(this);
        this.state = {
            didMount: false,
            progress: 0,
            config: {
                chart: {
                    height: 400,
                    type: 'line',
                    zoomType: 'x'
                },
                xAxis: {
                    categories: []
                },
                series: [{
                    data: [],
                    color: '#9acd32'
                }],
                title: {
                    text: null
                }
            }
        }
    }

    createLegend(json){
        var legend = [];
        for(var i = 0; i < json["names"].length; i++){
            var type = "fa fa-circle text-"+json["types"][i];
            legend.push(
                <i className={type} key={i}></i>
            );
            legend.push(" ");
            legend.push(
                json["names"][i]
            );
        }
        return legend;
    }

    // componentDidMount() {
    //
    // }

    componentWillReceiveProps(nextProps) {
        this.props.data.refetch()
        if(typeof nextProps.data.dataByMinutes === 'undefined') {
            console.log("Invalid Data");
            return;
        }
        console.log("Here!!");
        console.log(nextProps);
        const x = [];
        (nextProps.data.dataByMinutes).forEach(function(element) {
            x.push(moment.tz(element.Timestamp, "US/Pacific").format('YYYY-MM-DDTHH:MM'));
        });
        const y = [];
        (nextProps.data.dataByMinutes).forEach(function(element) {
            y.push(element.Value);
        });
        this.setState({
            progress: 0,
            config: {
                chart: {
                    height: 400,
                    type: 'line',
                    zoomType: 'x'
                },
                xAxis: {
                    categories: x
                },
                series: [{
                    data: y,
                     color: '#9acd32'
                }],
                title: {
                    text: null
                }
            }
        });
    }

    refresh() {
        this.props.data.refetch();
    }

    componentDidMount() {
        this.setState({ didMount: true });
    }

    headerCallback(dataFromHeader) {
        console.log("In Header.jsx");
        console.log(dataFromHeader);
        this.props.callback(dataFromHeader);
    }

    render() {

        if (this.state.didMount) {
            this.refresh();
        }

        if (this.props.data && this.props.data.loading) {
            return (
                <div>
                    <Row> d </Row>
                    <Row>
                        <HeaderLinks callback={this.headerCallback} initialState={this.props.headerData}/>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Loading"
                                content={
                                    <BarLoader
                                        color={'#3C4858'}
                                        loading={this.props.data.loading}
                                    />
                                }
                            />
                        </Col>
                    </Row>
                </div>
            );
        }

        if (this.props.data && this.props.data.error) {
            clearTimeout();
            return (
                <div>
                    <Row> d </Row>
                    <Row>
                        <HeaderLinks callback={this.headerCallback} initialState={this.props.headerData}/>
                    </Row>
                    <Jumbotron>
                      <h1><center><font color="red">Error</font></center></h1>
                        <center>
                        All forms need to be filled out.  Also, make sure your time range is valid.
                        </center>
                    </Jumbotron>;
                </div>
            );
        }

        return (
            <div>
                <Row> d </Row>
                <Row>
                    <HeaderLinks callback={this.headerCallback} initialState={this.props.headerData}/>
                </Row>
                <Row>
                    <Col md={12}>
                        <Card
                            statsIcon="fa fa-refresh"
                            id="chartHours"
                            title={this.props.headerData.sensorType}
                            category={this.props.headerData.building}
                            stats="Updated just now"
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
                </Row>
            </div>
        );
    }
}

const MINUTES_QUERY = gql`
    query MinutesQuery(
        $building       : String,
        $equipmentType  : String,
        $equipmentNumber: String,
        $sensorType     : String,
        $startTime      : String,
        $endTime        : String,
        $interval       : String
    ) {
        dataByMinutes
        (
            building       : $building,
            equipmentType  : $equipmentType,
            equipmentNumber: $equipmentNumber,
            sensorType     : $sensorType,
            startTime      : $startTime,
            endTime        : $endTime,
            interval       : $interval
        ) {
            Timestamp
            Value
        }
    }
`;

export default graphql(MINUTES_QUERY, {
    options: (props) => ({
        variables: {
            building       : props.headerData.building,
            equipmentType  : props.headerData.equipmentType,
            equipmentNumber: props.headerData.equipmentNumber,
            sensorType     : props.headerData.sensorType,
            startTime      : props.headerData.startTime,
            endTime        : props.headerData.endTime,
            interval       : props.headerData.interval
        }
    }),
})(Dashboard);
