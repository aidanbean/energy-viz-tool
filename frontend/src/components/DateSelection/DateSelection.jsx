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
        const textStyle = {
            height: '17px',
            fontFamily: 'ProximaNova',
            fontSize: '14px',
            fontWeight: '300',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: 'normal',
            letterSpacing: 'normal',
            color: '#2d323c'
        };

        const tagStyle = {
            height: '17px',
            fontFamily: 'ProximaNova',
            fontSize: '14px',
            fontWeight: '600',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: 'normal',
            letterSpacing: 'normal',
            color: '#2d323c',
            textAlign: 'center'
        };

        return (
            <div>
                <Row>
                    <Col md={2}>
                        <p style={tagStyle}>Refine Filters</p>
                    </Col>
                    <Col md={5} style={{paddingRight: '5%'}}>
                        <span style={textStyle}>Hour of day</span>
                        <HourPicker/>
                    </Col>
                    <Col md={4}>
                        <span style={textStyle}>Day of Week</span>
                        <WeekdayPicker/>
                    </Col>
                    <Col md={1} />
                </Row>
                <Row between="md">
                <Col md={2} />
                    <Col md={5} style={{paddingRight: '5%'}}>
                        <span style={textStyle}>Month of Year</span>
                        <MonthPicker/>
                    </Col>
                    <Col md={4}>
                        <span style={textStyle}>Day of Month</span>
                        <MonthDayPicker/>
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


