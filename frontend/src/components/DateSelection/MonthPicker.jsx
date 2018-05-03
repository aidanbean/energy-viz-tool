import Button from '../CustomButtons/Button.jsx'
import React, {Component} from 'react';

class MonthPicker extends Component {
    // constructor(props){
        // super(props);
        // this.observer = props.observer;
    // }

    render() {
        function MonthList(props) {
            const months = props.months;
            const listItems = months.map((month) =>
                <Button name = {'m_' + month.toString()} text={month}/>
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

