import Button from '../CustomButtons/Button.jsx'
import React, {Component} from 'react';

class WeekdayPicker extends Component {


    render() {
        function DayList(props) {
            const week = props.week;
            const listItems = week.map((day) =>
                <Button text={day}/>
            );
            return (
                <div>{listItems}</div>
            );
        }

        const WEEKDAYS_SHORT = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

        return (
            <DayList week={WEEKDAYS_SHORT}/>
        );


    }
}

export default WeekdayPicker;

