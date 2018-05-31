import React, { Component } from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { FormGroup } from 'react-bootstrap';
import moment from 'moment';

class EndForm extends Component {
  constructor(props) {
    super(props);

    this.handleEvent = this.handleEvent.bind(this);

    this.state = {
      value: this.props.endTime,
    };
  }

  handleEvent(value) {
    var myValue = value;
    if(typeof myValue === "string") {
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
          defaultValue={this.props.endTime}
          inputProps={{ placeholder: 'End Date' }}
          onChange={this.handleEvent}
          isValidDate={valid}
        />
      </FormGroup>
    );
  }
}

export default EndForm;
