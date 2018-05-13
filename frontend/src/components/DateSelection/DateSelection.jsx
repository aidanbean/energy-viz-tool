import React, {Component} from 'react';
import WeekdayPicker from './WeekdayPicker';
import HourPicker from './HourPicker';
import MonthDayPicker from './MonthDayPicker';
import MonthPicker from './MonthPicker';
import {Col, Row, Button} from 'react-bootstrap';

class DateSelection extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate = () => { // preventing re-render when parents state change
        return false;
    };




    render() {
        const textStyle = {
            height: '17px',
            fontFamily: 'ProximaNova',
            fontSize: '14px',
            fontWeight: '300',
            color: '#2d323c'
        };

        const componentStyle = {
          marginBottom: '10px'
        };

        return (
            <div>
                <Row>
                    <Col md={6}>
                        <span style={textStyle}>Hour of day</span>
                        <HourPicker/>
                        <div style={componentStyle}/>
                        <span style={textStyle}>Month of Year</span>
                        <MonthPicker/>
                    </Col>
                    <Col md={6}>
                        <span style={textStyle}>Day of Week</span>
                        <WeekdayPicker/>
                        <div style={componentStyle}/>
                        <span style={textStyle}>Day of Month</span>
                        <MonthDayPicker/>
                    </Col>
                </Row>
                <Row>
                    <Col md={12} xs={12} style={{marginTop: "20px"}} />
                <Col md={3} mdOffset={9} xs={4} xsOffset={8}>
                    <Button
                        bsStyle="default btn-fill"
                        style={{marginBottom: "30px"}}
                        block
                        onClick={this.props.applySelection}
                    >
                        Apply
                    </Button>
                </Col>
                </Row>
            </div>
        );
    }
}

export default DateSelection;


