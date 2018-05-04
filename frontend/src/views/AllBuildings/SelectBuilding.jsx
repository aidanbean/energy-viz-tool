import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import DateSelection from '../../components/DateSelection/DateSelection.jsx'
import Card from '../../components/Card/Card.jsx'
import '../../stylesheets/select.less'
import Highcharts from 'react-highcharts';

class AllBuildings extends Component {
    render() {
        var config = {
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            series: [{
                data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
            }]
        };
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                content={
                                    <div style={{display: 'flex'}}>
                                        <div style={{width: '66%'}}>
                                            <Highcharts config={config}/>
                                        </div>

                                        <div style={{width: '30%', marginLeft:'5%'}}>
                                            <DateSelection/>
                                        </div>
                                    </div>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default AllBuildings;
