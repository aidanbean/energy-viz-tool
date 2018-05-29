import Button from '../CustomButtons/Button.jsx'
import React, {Component} from 'react';
import {textStyle} from '../../variables/styles';

class MonthDayPicker extends Component {
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
                Select/UnSelect all Days
            </Tooltip>
        );
        function MonthList(props) {
            const day = props.day;
            const listItems = day.map((day) =>
                <Button name={'d_' + day.toString()} text={day} enable={props.enable}/>
            );
            return (
                <div>{listItems}</div>
            );
        }

        var hours = [];
        for (var i = 1; i < 32; i++) {
            hours.push(i);
        }

        return (
            <div>
                <OverlayTrigger placement="bottom" overlay={tooltip}>
                <span style={textStyle} onClick={this.toggleButton}>Day of Month</span>
                </OverlayTrigger>
            <MonthList day={hours} enable={this.state.enable}/>
            </div>
        );


    }
}

export default MonthDayPicker;

