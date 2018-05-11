import React, {Component} from 'react';
import WeekdayPicker from './WeekdayPicker';
import HourPicker from './HourPicker';
import MonthDayPicker from './MonthDayPicker';
import MonthPicker from './MonthPicker';
import {Col,Row} from 'react-bootstrap';

class DateSelection extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate = () => { // preventing re-render when parents state change
        return false;
    };

    render() {
        return (
            <div>
                <Row>
                    <Col md={1} />
                <Col md={3}>
                    <span>Month of Year</span>
                    <MonthPicker/>
                </Col>
                <Col md={7}>
                    <span>Day of Month</span>
                    <MonthDayPicker/>
                </Col>
                    <Col md={1} />
                </Row>
                <Row>
                <Col md={1} />
                <Col md={3}>
                    <span>Day of Week</span>
                    <WeekdayPicker/>
                </Col>
                <Col md={7}>
                    <span>Hour of day</span>
                    <HourPicker/>
                </Col>
                <Col md={1} />
                </Row>
                <Row>
                <Col md={2} mdOffset={4} xs={4} xsOffset={4}>
                    <button
                        type="button"
                        bsSize="large"
                        class="btn btn-primary btn-block"
                        style={{marginBottom: "20px", marginTop: "20px"}}
                        block
                        onClick={this.props.applySelection}
                    >
                        Apply
                    </button>
                </Col>
                </Row>
            </div>
        );
    }
}

export default DateSelection;


