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
      value: moment().subtract(2, 'months'),
    };
  }

  handleEvent(value) {
    if(typeof value === "string") {
        value = moment(value);
    }
    this.setState(
      {
        value: value,
      },
      () => {
        var time = value.format('MM-DD-YYYY-ha');
        this.props.callback(time);
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
          defaultValue={moment().subtract(2, 'months')}
          inputProps={{ placeholder: 'Start Date' }}
          onChange={this.handleEvent}
          isValidDate={valid}
        />
      </FormGroup>
    );
  }
}

export default StartForm;
