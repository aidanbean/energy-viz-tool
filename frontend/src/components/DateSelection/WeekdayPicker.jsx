import Button from '../CustomButtons/Button.jsx'
import React, {Component} from 'react';

class WeekdayPicker extends Component {


    render() {
        function DayList(props) {
            const week = props.week;
            const listItems = week.map((day) =>
                <Button name={'w_' + day.toString()} text={day}/>
            );
            return (
                <div>{listItems}</div>
            );
        }

        // const WEEKDAYS_SHORT = ['U', 'M', 'T', 'W', 'R', 'F', 'S'];
        const WEEKDAYS_SHORT = ['7', '1', '2', '3', '4', '5', '6'];

        return (
            <DayList week={WEEKDAYS_SHORT}/>
        );


    }
}

export default WeekdayPicker;

