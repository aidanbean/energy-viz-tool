import Button from '../CustomButtons/Button.jsx'
import React, {Component} from 'react';
import {MONTHS} from './utils'

class MonthPicker extends Component {

    render() {
        function MonthList(props) {
            const months = props.months;
            const listItems = months.map((month) =>
                <Button name = {'m_' + month.NUM.toString()} text={month.SHORT}/>
            );
            return (
                <div>{listItems}</div>
            );
        }

        // const Month = ['Jan', 'Feb', 'Mar',	'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const Month = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

        return (
            <MonthList months={MONTHS}/>
        );
    }
}

export default MonthPicker;