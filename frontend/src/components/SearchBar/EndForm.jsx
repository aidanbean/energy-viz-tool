import React, { Component } from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { FormGroup } from 'react-bootstrap';
import moment from 'moment';

class EndForm extends Component {
  constructor(props) {
    super(props);

    this.handleEvent = this.handleEvent.bind(this);

    this.formatting = () => { //prevent react-datetime going out of screen in mobile layout, still an open issue at https://github.com/YouCanBookMe/react-datetime/issues/356
        document.getElementsByClassName("rdtPicker")[1].style.right = "0px";
    };

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
      <FormGroup onClick={this.formatting}>
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
