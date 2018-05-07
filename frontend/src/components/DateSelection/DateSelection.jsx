import React, {Component} from 'react';
import WeekdayPicker from './WeekdayPicker';
import HourPicker from './HourPicker';
import MonthDayPicker from './MonthDayPicker';
import MonthPicker from './MonthPicker';
import {Col, Button} from 'react-bootstrap';

class DateSelection extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate = () => { // preventing re-render when parents state change
        return false;
    };

    render() {
        return (
            <div style={{backgroundColor: "#FFFFFF"}}>
                <Col md={4}>
                    <span>Month of Year</span>
                    <MonthPicker/>
                </Col>
                <Col md={8}>
                    <span>Day of Month</span>
                    <MonthDayPicker/>
                </Col>
                <Col md={4}>
                    <span>Day of Week</span>
                    <WeekdayPicker/>
                </Col>
                <Col md={8}>
                    <span>Hour of day</span>
                    <HourPicker/>
                </Col>
                <Col md={1}>
                </Col>
                <Col md={2}>
                    <button
                        type="button"
                        class="btn btn-primary"
                        style={{marginBottom: "20px"}}
                        block
                        onClick={this.props.applySelection}
                    >
                        Apply
                    </button>
                </Col>
            </div>
        );
    }
}

export default DateSelection;


