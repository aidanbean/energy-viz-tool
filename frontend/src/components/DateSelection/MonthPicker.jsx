import Button from '../CustomButtons/Button.jsx'
import React, {Component} from 'react';

class MonthPicker extends Component {

    render() {
        function MonthList(props) {
            const months = props.months;
            const listItems = months.map((month) =>
                <Button text={month}/>
            );
            return (
                <div>{listItems}</div>
            );
        }

        const Month = ['Jan', 'Feb', 'Mar',	'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        return (
            <MonthList months={Month}/>
        );
    }
}

export default MonthPicker;

