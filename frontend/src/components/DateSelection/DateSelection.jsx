import React, {Component} from 'react';
import WeekdayPicker from './WeekdayPicker';

class DateSelection extends Component {
    render() {
        var modifiers = {
            'weekend': function (weekday) {
                return weekday == 0 || weekday == 6;
            }
        };

        return (
            <WeekdayPicker/>
        );
    }
}

export default DateSelection;
