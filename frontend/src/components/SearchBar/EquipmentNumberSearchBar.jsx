import Select from 'react-select';
// import { Async } from 'react-select';
import 'react-select/dist/react-select.css';
import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';

const EquipmentNumber = require('./EquipmentNumber');

var SelectStyle = {
    marginTop: 10,
    position: 'relative',
    width: 138,
    borderRadius: 3,
    display: 'inline-block',
    verticalAlign: 'middle',
};


var EquipNumField = createClass({
    displayName: 'StatesField',
    propTypes: {
        label: PropTypes.string,
        searchable: PropTypes.bool,
    },
    getDefaultProps () {
        return {
            label: 'Data:',
            searchable: true,
        };
    },
    getInitialState () {
        return {
            country: 'EquipmentNumbers',
            disabled: false,
            searchable: this.props.searchable,
            selectValue: 'new-south-wales',
            clearable: true,
            rtl: false,
        };
    },
    clearValue (e) {
        this.select.setInputValue('');
    },
    switchCountry (e) {
        var newCountry = e.target.value;
        this.setState({
            country: newCountry,
            selectValue: null,
        });
    },
    updateValue (newValue) {
        this.setState({
            selectValue: newValue,
        }, () => {
            this.props.callback(this.state.selectValue);
        });
    },
    focusStateSelect () {
        this.refs.stateSelect.focus();
    },
    toggleCheckbox (e) {
        let newState = {};
        newState[e.target.name] = e.target.checked;
        this.setState(newState);
    },

    render () {
        var options = EquipmentNumber[this.state.country];
        return (
            <div>
                <Select
                    placeholder = "Equipment Number"
                    style={SelectStyle}
                    id="state-select"
                    ref={(ref) => { this.select = ref; }}
                    onBlurResetsInput={false}
                    onSelectResetsInput={false}
                    autoFocus
                    simpleValue
                    options={options}
                    clearable={this.state.clearable}
                    name="selected-state"
                    disabled={this.state.disabled}
                    value={this.state.selectValue}
                    onChange={this.updateValue}
                    rtl={this.state.rtl}
                    searchable={this.state.searchable}
                />

            </div>
        );
    }
});

export default EquipNumField;
