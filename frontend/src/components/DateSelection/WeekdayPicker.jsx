import Button from '../CustomButtons/Button.jsx'
import React, {Component} from 'react';
import {WEEKDAYS} from './utils'

class WeekdayPicker extends Component {

        
    render() {
        function DayList(props) {
            const week = props.week;
            const listItems = week.map((day) =>
                <Button name={'w_' + day.NUM.toString()} text={day.SHORT}/>
            );
            return (
                <div>{listItems}</div>
            );
        }

        return (
            <DayList week={WEEKDAYS}/>
        );
    }
}

export default WeekdayPicker;

