import React, { Component } from 'react';
import moment from 'moment-timezone';
import {Row, Col, Jumbotron } from 'react-bootstrap';
import { BarLoader } from 'react-spinners';
import ReactHighcharts from 'react-highcharts';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import HeaderLinks from '../../components/Header/HeaderLinks.jsx';
import {Card} from '../../components/Card/Card.jsx';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.headerCallback = this.headerCallback.bind(this);
        this.state = {
            didMount: false,
            progress: 0,
            config: {
                legend: {
                    enabled: false
                },
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
        this.props.data.refetch();
        if(typeof nextProps.data.dataByMinutes === 'undefined') {
            return;
        }
        const x = [];
        (nextProps.data.dataByMinutes).forEach(function(element) {
            x.push(moment.tz(element.Timestamp, "US/Pacific").format('YYYY-MM-DDTHH:mm'));
        });
        const y = [];
        (nextProps.data.dataByMinutes).forEach(function(element) {
            y.push(element.Value);
        });
        this.setState({
            progress: 0,
            config: {
                legend: {
                    enabled: false
                },
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
        this.props.callback(dataFromHeader);
    }

    render() {

        if (this.state.didMount) {
            this.refresh();
        }

        if (this.props.data && this.props.data.loading) {
            return (
                <div>
                    <Row style={{'marginRight': '0px', 'marginLeft': '0px'}}>
                        <HeaderLinks callback={this.headerCallback} initialState={this.props.headerData}/>
                    </Row>
                    <Row style={{'height': '200px', 'marginRight': '0px', 'marginLeft': '0px'}}>
                        <Col md={1}></Col>
                        <Col md={10}>
                            <Card
                                statsIcon="fa fa-refresh"
                                id="chartHours"
                                title={this.props.headerData.sensorType}
                                category={this.props.headerData.building}
                                content={
                                    <center>
                                        <h3><center><font color="GREEN">Loading</font></center></h3>
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
            clearTimeout();
            return (
                <div>
                    <Row style={{'marginRight': '0px', 'marginLeft': '0px'}}>
                        <HeaderLinks callback={this.headerCallback} initialState={this.props.headerData}/>
                    </Row>
                    <Jumbotron>
                      <h3><center><font color="red">Error</font></center></h3>
                        <center>
                        All forms need to be filled out.  Also, make sure your time range is valid.
                        </center>
                    </Jumbotron>;
                </div>
            );
        }


        return (
            <div>
                <Row style={{'marginRight': '0px', 'marginLeft': '0px'}}>
                    <HeaderLinks callback={this.headerCallback} initialState={this.props.headerData}/>
                </Row>
                <Row style={{'marginRight': '0px', 'marginLeft': '0px'}}>
                    <Col md={1}></Col>
                    <Col md={10}>
                        <Card
                            statsIcon="fa fa-refresh"
                            id="chartHours"
                            title={this.props.headerData.sensorType}
                            category={this.props.headerData.building}
                            // stats={}
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
