import Button from '../CustomButtons/Button.jsx'
import React, {Component} from 'react';
import {MONTHS} from './utils';
import {textStyle} from '../../variables/styles';

class MonthPicker extends Component {

    constructor(props) {
        super(props);

        this.state ={
            enable: true,
        };

        this.toggleButton = () => {
            this.setState({
                enable: !this.state.enable,
            })
        };
    }

    render() {
        function MonthList(props) {
            const months = props.months;
            const listItems = months.map((month) =>
                <Button name = {'m_' + month.NUM.toString()} text={month.SHORT} enable={props.enable}/>
            );
            return (
                <div>{listItems}</div>
            );
        }

        // const Month = ['Jan', 'Feb', 'Mar',	'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const Month = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

        return (
            <div>
                <span style={textStyle} onClick={this.toggleButton}>Month of Year</span>
            <MonthList months={MONTHS} enable={this.state.enable}/>
            </div>
        );
    }
}

export default MonthPicker;