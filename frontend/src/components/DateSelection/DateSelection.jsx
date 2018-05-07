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
        //     this.observer = ReactObserver();

    }

    state = {showing: true};


    shouldComponentUpdate = (nextProps, nextState) => {
        return false;
    };


    render() {
        const {showing} = this.state;
        console.log('DateSelection Render');
        return (
            <div>

                <div>
                    <span>Month</span>
                    <MonthPicker/>
                </div>
                <div>
                    <span>Day of Month</span>
                    <MonthDayPicker/>
                </div>
                <div>
                    <span>Day of Week</span>
                    <WeekdayPicker/>
                </div>
                <div>
                    <span>Hour of day</span>
                    <HourPicker/>
                </div>
                <Col md={2}>
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


