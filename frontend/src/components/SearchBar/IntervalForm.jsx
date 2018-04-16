import 'react-select/dist/react-select.css';
import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';

var SelectStyle = {
    marginTop: 2,
    position: 'relative',
    borderRadius: 3,
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
            { value: '1h', label: '1 hour' },
            { value: '2h', label: '2 hours' },
            { value: '5h', label: '5 hours' },
            { value: '12h', label: '12 hours' },
            { value: '1d', label: '1 day' },
            { value: '1w', label: '1 week' },
            { value: '1mo', label: '1 month' },
        ],
            value: null,
            multi: false
        };
    },
    onChange(value) {
        this.setState({ value }, () => {
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
