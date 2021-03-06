import Button from '../CustomButtons/Button.jsx';
import React, { Component } from 'react';
import { WEEKDAYS } from './utils';
import { textStyle } from '../../variables/styles';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

class WeekdayPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      enable: true,
    };

    this.toggleButton = () => {
      this.setState({
        enable: !this.state.enable,
      });
    };
  }

  render() {
    const tooltip = (
      <Tooltip id="tooltip">Select/Unselect all WeekDays</Tooltip>
    );

        return (
            <div style={{marginBottom:'10px'}}>
                <OverlayTrigger placement="top" overlay={tooltip}>
                    <span style={textStyle} onClick={this.toggleButton}><u>Day of Week</u></span>
                </OverlayTrigger>
            <DayList week={WEEKDAYS} enable={this.state.enable}/>
            </div>
        );
    function DayList(props) {
      const week = props.week;
      const listItems = week.map(day => (
        <Button
          name={'w_' + day.NUM.toString()}
          text={day.SHORT}
          enable={props.enable}
        />
      ));
      return <div>{listItems}</div>;
    }
  }
}

export default WeekdayPicker;
