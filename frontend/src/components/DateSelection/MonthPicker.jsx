import Button from '../CustomButtons/Button.jsx'
import React, {Component} from 'react';
import {MONTHS} from './utils';
import {textStyle} from '../../variables/styles';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

class MonthPicker extends Component {

    constructor(props) {
        super(props);

        this.state ={
            enable: true,
        };

        this.toggleButton = () => {
            this.setState({
                enable: !this.state.enable,
            })
        };
    }

    render() {
        const tooltip = (
            <Tooltip id="tooltip">
                Select/Unselect all Months
            </Tooltip>
        );
        function MonthList(props) {
            const months = props.months;
            const listItems = months.map((month) =>
                <Button name = {'m_' + month.NUM.toString()} text={month.SHORT} enable={props.enable}/>
            );
            return (
                <div>{listItems}</div>
            );
        }

        return (
            <div>
                <OverlayTrigger placement="top" overlay={tooltip}>
                <span style={textStyle} onClick={this.toggleButton}>Month of Year</span>
                </OverlayTrigger>
            <MonthList months={MONTHS} enable={this.state.enable}/>
            </div>
        );
    }
}

export default MonthPicker;