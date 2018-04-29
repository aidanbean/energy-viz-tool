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
                <div>
                    <span>Month</span>
                    <MonthPicker/>
                </div>
                <div>
                    <span>Day of Month</span>
                    <MonthDayPicker/>
                </div>
                <div>
                    <span>Day of Week</span>
                    <WeekdayPicker/>
                </div>
                <div>
                    <span>Hour of day</span>
                    <HourPicker/>
                </div>
            </div>

        );
    }
}

export default DateSelection;
