import Button from '../CustomButtons/Button.jsx'
import React, {Component} from 'react';

class HourPicker extends Component {


    render() {
        function HourList(props) {
            const hour = props.hour;
            const listItems = hour.map((hour) =>
                <Button text={hour}/>
            );
            return (
                <div>{listItems}</div>
            );
        }

        var hours = [];
        for (var i = 1; i < 25; i++) {
            hours.push(i);
        }


        return (
            <HourList hour={hours}/>
        );


    }
}

export default HourPicker;

