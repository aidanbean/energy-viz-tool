import Button from '../CustomButtons/Button.jsx';
import React, { Component } from 'react';
import { textStyle } from '../../variables/styles';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

class HourPicker extends Component {
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
    const tooltip = <Tooltip id="tooltip">Select/Unselect all Hours</Tooltip>;

    function HourList(props) {
      const hour = props.hour;
      const listItems = hour.map(hour => (
        <Button
          name={'h_' + hour.toString()}
          text={hour}
          enable={props.enable}
        />
      ));
      return <div>{listItems}</div>;
    }

    var hours = [];
    for (var i = 1; i < 25; i++) {
      hours.push(i);
    }

    return (
      <div style={{ marginBottom: '10px' }}>
        <OverlayTrigger placement="top" overlay={tooltip}>
          <span style={textStyle} onClick={this.toggleButton}>
            Hour of day
          </span>
        </OverlayTrigger>
        <HourList hour={hours} enable={this.state.enable} />
      </div>
    );
  }
}

export default HourPicker;
