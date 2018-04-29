import Button from '../CustomButtons/Button.jsx'
import React, {Component} from 'react';

class MonthDayPicker extends Component {


    render() {
        function MonthList(props) {
            const day = props.day;
            const listItems = day.map((day) =>
                <Button id={day} text={day}/>
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
            <MonthList day={hours}/>
        );


    }
}

export default MonthDayPicker;

