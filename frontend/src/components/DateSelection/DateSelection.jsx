import React, {Component} from 'react';
import WeekdayPicker from './WeekdayPicker';
import HourPicker from './HourPicker';
import MonthDayPicker from './MonthDayPicker';
import MonthPicker from './MonthPicker';
import CustomButton from '../../elements/CustomButton/CustomButton.jsx'
class DateSelection extends Component {


    render() {

        var container_frame = {
            width: 300
        }
        
        return (
            <div>
                <div style={this.container_frame}>
                    <span>Month</span>
                    <MonthPicker/>
                </div>
                <div style={this.container_frame}>
                    <span>Day of Month</span>
                    <MonthDayPicker/>
                </div>
                <div style={this.container_frame}>
                    <span>Day of Week</span>
                    <WeekdayPicker/>
                </div>
                <div style={this.container_frame}>
                    <span>Hour of day</span>
                    <HourPicker/>
                </div>
            </div>

        );
    }
}

export default DateSelection;
