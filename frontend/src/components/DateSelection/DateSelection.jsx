import React, {Component} from 'react';
import WeekdayPicker from './WeekdayPicker';
import HourPicker from './HourPicker';
import MonthDayPicker from './MonthDayPicker';
import MonthPicker from './MonthPicker';
import {Grid, Row, Col, Button} from 'react-bootstrap';

class DateSelection extends Component {
    constructor(props) {
        super(props);
        window.monthOfYear = [];
        window.dayOfMonth = [];
        window.dayOfWeek = [];
        window.hourOfDay = ['1'];
        window.refetchData = 0;
    }

    shouldComponentUpdate = (nextProps, nextState) => { // preventing re-render when parents state change
        return false;
    };


    render() {
        return (
            <div>
                <Col md={3}>
                    <span>Month of Year</span>
                    <MonthPicker/>
                </Col>
                <Col md={8}>
                    <span>Day of Month</span>
                    <MonthDayPicker/>
                </Col>
                <Col md={8}>
                    <span>Day of Week</span>
                    <WeekdayPicker/>
                </Col>
                <Col md={8}>
                    <span>Hour of day</span>
                    <HourPicker/>
                </Col>
                <Col md={8}>
                    <Button
                        bsStyle="success"
                        style={{marginTop: '8px'}}
                        block
                        onClick={this.props.applySelection}
                    >
                        Apply
                    </Button>
                </Col>
            </div>
        );
    }
}

export default DateSelection;


