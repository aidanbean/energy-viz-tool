import Button from '../CustomButtons/Button.jsx'
import React, {Component} from 'react';
import {WEEKDAYS} from './utils'

class WeekdayPicker extends Component {
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
        const textStyle = {
            height: '17px',
            fontFamily: 'ProximaNova',
            fontSize: '14px',
            fontWeight: '300',
            color: '#2d323c',
            cursor: 'pointer',
        };
        function DayList(props) {
            const week = props.week;
            const listItems = week.map((day) =>
                <Button name={'w_' + day.NUM.toString()} text={day.SHORT} enable={props.enable}/>
            );
            return (
                <div>{listItems}</div>
            );
        }

        return (
            <div style={{marginBottom:'10px'}}>
                <span style={textStyle} onClick={this.toggleButton}>Day of Week</span>
            <DayList week={WEEKDAYS} enable={this.state.enable}/>
            </div>
        );
    }
}

export default WeekdayPicker;

