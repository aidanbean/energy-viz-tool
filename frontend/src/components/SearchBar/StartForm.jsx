import React, { Component } from 'react';
import 'react-datetime/css/react-datetime.css';
import Datetime from 'react-datetime';
import { FormGroup } from 'react-bootstrap';
import moment from 'moment';

class StartForm extends Component {
  constructor(props) {
    super(props);
    this.handleEvent = this.handleEvent.bind(this);
    this.state = {
      value: this.props.startTime,
    };
  }

  handleEvent(value) {
    var myValue = value;
    if (typeof myValue === 'string') {
      myValue = moment(myValue);
    }
    this.setState(
      {
        value: myValue,
      },
      () => {
        this.props.callback(myValue);
      }
    );
  }

  render() {
    var yesterday = Datetime.moment();
    var valid = function(current) {
      return current.isBefore(yesterday);
    };
    return (
      <FormGroup>
        <Datetime
          defaultValue={this.props.startTime}
          inputProps={{ placeholder: 'Start Date' }}
          onChange={this.handleEvent}
          isValidDate={valid}
        />
      </FormGroup>
    );
  }
}

export default StartForm;
