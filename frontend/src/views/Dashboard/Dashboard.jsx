import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';
import { Grid, Row, Col } from 'react-bootstrap';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import {Card} from '../../components/Card/Card.jsx';
import {StatsCard} from '../../components/StatsCard/StatsCard.jsx';
import {Tasks} from '../../components/Tasks/Tasks.jsx';
import {
    dataPie,
    legendPie,
    dataSales,
    optionsSales,
    responsiveSales,
    legendSales,
    dataBar,
    optionsBar,
    responsiveBar,
    legendBar,
    HighChartsDummyData
} from '../../variables/Variables.jsx';

const ReactHighcharts = require('react-highcharts');

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            config: {
                chart: {
                    height: 245,
                    type: 'line'
                },
                xAxis: {
                    categories: []
                },
                series: [{
                    data: []
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
        if(typeof nextProps.data.dataByMinutes === 'undefined') {
            console.log("Invalid Data");
            return;
        }
        // console.log(nextProps.data.dataByMinutes);
        // nextProps.data.dataByMinutes.forEach(function(element) {
        //     console.log(element.Timestamp);
        // });
        const x = [];
        (nextProps.data.dataByMinutes).forEach(function(element) {
            x.push(element.Timestamp);
        });
        const y = [];
        (nextProps.data.dataByMinutes).forEach(function(element) {
            y.push(element.Value);
        });
        this.setState({
            config: {
                chart: {
                    height: 245,
                    type: 'line'
                },
                xAxis: {
                    categories: x
                },
                series: [{
                    data: y
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
    // updateConfig(data) {
    //     this.setState({
    //         config: {
    //             chart: {
    //                 height: 245,
    //                 type: 'line'
    //             },
    //             xAxis: {
    //                 categories: data.Timestamp
    //             },
    //             series: [{
    //                 data: data.Value
    //             }],
    //             title: {
    //                 text: null
    //             }
    //         }
    //     });
    // }
    render() {
        // if (this.props.data.loading) {
        //     return (<div>Loading</div>)
        // }
        //
        // if (this.props.data.error) {
        //     console.log(this.props.data.error)
        //     return (<div>An unexpected error occurred</div>)
        // }
        // console.log(this.props.minutesQuery);
        this.refresh();

        if (this.props.data && this.props.data.loading) {
            return <div>Loading</div>
        }

        if (this.props.data && this.props.data.error) {
            return <div>Error</div>
        }

        const dataToRender = this.props.data.dataByMinutes;
        console.log(this.props.data.dataByMinutes[0].Value);
        // this.updateConfig(dataToRender);
        return (
            <div className="content">
                    <Row>
                        <Col md={12}>
                            <Card
                                statsIcon="fa fa-history"
                                id="chartHours"
                                title={this.props.headerData.sensorType}
                                category={this.props.headerData.building}
                                stats="Updated 3 minutes ago"
                                content={
                                    <div className="ct-chart">
                                        <ReactHighcharts
                                                config={this.state.config}
                                            ref = 'ct-chart'
                                        />
                                    </div>
                                    }
                                legend={
                                    <div className="legend">
                                        {this.createLegend(legendSales)}
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
