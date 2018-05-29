import React, {Component} from 'react';
import WeekdayPicker from './WeekdayPicker';
import HourPicker from './HourPicker';
import MonthDayPicker from './MonthDayPicker';
import MonthPicker from './MonthPicker';
import {Col, Row, Button, Collapse, Tooltip, OverlayTrigger} from 'react-bootstrap';
import {tagStyle} from '../../variables/styles'

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
        const tooltip = (
            <Tooltip id="tooltip">
                Expend/Collapse
            </Tooltip>
        );
        return (
            <Row style={{marginBottom:'30px'}}>
                <Col md={3}>
                    <Col md={3} />
                    <Col md={9} xs={12} style={{paddingLeft: 0}}>
                        <OverlayTrigger placement="right" overlay={tooltip}>
                                <div style={tagStyle} onClick={this.toggleCollapse}>
                                    Refine filters
                                    <i className="pe-7s-angle-down" style={{fontWeight: 'bold', fontSize: '15px'}} />
                                </div>
                        </OverlayTrigger>
                    </Col>
                </Col>

                <Col md={8}>
                    <Collapse in={this.state.isOpened}>
                        <div>
                            <Row>
                                <Col md={6}>
                                    <HourPicker/>
                                    <MonthPicker/>
                                </Col>
                                <Col md={6}>
                                    <WeekdayPicker/>
                                    <MonthDayPicker/>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12} xs={12} style={{marginTop: "20px"}} />
                                <Col md={3} mdOffset={9} xs={4} xsOffset={8}>
                                    <Button
                                        bsStyle="default"
                                        className="btn-fill"
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


