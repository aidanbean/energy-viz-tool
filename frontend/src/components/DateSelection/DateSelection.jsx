import React, {Component} from 'react';
import WeekdayPicker from './WeekdayPicker';
import HourPicker from './HourPicker';
import MonthDayPicker from './MonthDayPicker';
import MonthPicker from './MonthPicker';
import {Col, Row, Button, Collapse} from 'react-bootstrap';

class DateSelection extends Component {
    constructor(props) {
        super(props);

        this.state ={
            isOpened: false,
        };

        this.toggleCollapse = () => {
            this.setState({
                isOpened: !this.state.isOpened,
            })
        };
    }


    shouldComponentUpdate = (nextProps, nextState) => { // only redner when toggle collapse, preventing re-render when parents state change
        if(nextState.isOpened !== this.state.isOpened)
            return true;
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

        const tagStyle = {
            fontFamily: 'ProximaNova',
            fontSize: '14px',
            fontWeight: '600',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: 'normal',
            letterSpacing: 'normal',
            color: '#2d323c',
            textAlign: 'left',
            marginTop: '10px',
            marginBottom: '10px',
            display: 'inline',
        };

        const componentStyle = {
          marginBottom: '10px'
        };

        return (
            <Row>
                <Col md={3}>
                    <Col md={3} />
                    <Col md={9} xs={12} style={{paddingLeft: 0}}>
                                <span style={tagStyle} onClick={this.toggleCollapse}>
                                    Refine filters
                                    <i className="pe-7s-angle-down" style={{fontWeight: 'bold', fontSize: '15px'}} />
                                </span>
                    </Col>
                </Col>

                <Col md={8}>
                    <Collapse in={this.state.isOpened}>
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
                    </Collapse>
                </Col>
            </Row>
        );
    }
}

export default DateSelection;


