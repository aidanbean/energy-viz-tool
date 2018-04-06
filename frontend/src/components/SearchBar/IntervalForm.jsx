import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import 'react-select/dist/react-select.css';
import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';

var IntervalForm = createClass({
    displayName: 'ValuesAsNumbersField',
    propTypes: {
        label: PropTypes.string
    },

    getInitialState () {
        return {
        options :[
            { value: 5, label: '5 minutes'},
            { value: 10, label: '10 minutes' },
            { value: 15, label: '15 minutes' },
            { value: 30, label: '30 minutes' },
            { value: 45, label: '45 minutes' },
            { value: 60, label: '60 minutes' }
        ],
            value: null,
            multi: false
        };
    },
    onChange(value) {
        this.setState({ value });
        console.log('Numeric Select value changed to', value);
    },
    render () {
        return (
            <div className="section">
                <Select
                    onChange={this.onChange}
                    options={this.state.options}
                    simpleValue
                    value={this.state.value}
                />

            </div>
        );
    }
});

export default IntervalForm;