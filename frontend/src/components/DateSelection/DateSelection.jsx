import React, {Component} from 'react';
import WeekdayPicker from './WeekdayPicker';
import HourPicker from './HourPicker';
import MonthDayPicker from './MonthDayPicker';
import MonthPicker from './MonthPicker';


class DateSelection extends Component {
    constructor(props){
        super(props);
        window.monthOfYear = [];
        window.dayOfMonth = [];
        window.dayOfWeek = [];
        window.hourOfDay = ['1'];
        window.refetchData = 0;
    //     this.observer = ReactObserver();
    }


    render() {
        return (
            <div>
                <div>
                    <span>Month</span>
                    <MonthPicker />
                </div>
                <div>
                    <span>Day of Month</span>
                    <MonthDayPicker />
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
