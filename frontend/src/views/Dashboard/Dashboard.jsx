import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';
import { Grid, Row, Col } from 'react-bootstrap';

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
    render() {
        return (
            <div className="content">
                    <Row>
                        <Col md={12}>
                            <Card
                                statsIcon="fa fa-history"
                                id="chartHours"
                                title="Kemper_Baseline_Modeled_Electricity"
                                category="Predicted value from MLR model"
                                stats="Updated 3 minutes ago"
                                content={
                                    <div className="ct-chart">
                                        <ReactHighcharts
                                            config={HighChartsDummyData}
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

export default Dashboard;
