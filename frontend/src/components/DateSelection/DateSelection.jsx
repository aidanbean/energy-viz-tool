import React, {Component} from 'react';
import WeekdayPicker from './WeekdayPicker';
import HourPicker from './HourPicker';
import MonthDayPicker from './MonthDayPicker';
import MonthPicker from './MonthPicker';
import CustomButton from '../../elements/CustomButton/CustomButton.jsx'
class DateSelection extends Component {
    render() {

        return (
            <div>
                <WeekdayPicker/>
                <HourPicker/>
                <MonthDayPicker/>
                <MonthPicker/>
            </div>

        );
    }
}

export default DateSelection;
