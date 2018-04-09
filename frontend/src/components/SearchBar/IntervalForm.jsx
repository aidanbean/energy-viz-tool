import { FormGroup, ControlLabel, FormControl, Row, Col } from 'react-bootstrap';
import 'react-select/dist/react-select.css';
import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';

var SelectStyle = {
    marginTop: 2,
    position: 'relative',
    // width: 138,
    borderRadius: 3,
    display: 'inline-block',
    verticalAlign: 'middle',
};

var IntervalForm = createClass({
    displayName: 'ValuesAsNumbersField',
    propTypes: {
        label: PropTypes.string
    },

    getInitialState () {
        return {
        options :[
            { value: '5m', label: '5 minutes' },
            { value: '10m', label: '10 minutes' },
            { value: '15m', label: '15 minutes' },
            { value: '30m', label: '30 minutes' },
            { value: '45m', label: '45 minutes' },
            { value: '60m', label: '60 minutes' }
        ],
            value: null,
            multi: false
        };
    },
    onChange(value) {
        this.setState({ value }, () => {
            console.log('Numeric Select value changed to', value);
            this.props.callback(this.state.value);
        });
    },
    render () {
        return (
            <div className="section">
                <Select
                    placeholder = "Interval"
                    onChange={this.onChange}
                    style={SelectStyle}
                    options={this.state.options}
                    simpleValue
                    value={this.state.value}
                />
            </div>
        );
    }
});

export default IntervalForm;
