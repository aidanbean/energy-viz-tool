import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import 'react-select/dist/react-select.css';
import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';

class EndForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: ''
    };
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length == 14 || length == 15) return 'success';
    else if (length > 0) return 'warning';
    return null;
  }

  handleChange(e) {
    this.setState({ value: e.target.value }, () => {
        this.props.callback(this.state.value);
    });
  }

  render() {
    return (
      <form>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="12-11-2017-12pm"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>
      </form>
    );
  }
}

export default EndForm;
