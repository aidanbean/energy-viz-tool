import Select from 'react-select';
import 'react-select/dist/react-select.css';
import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';

const Building = require('./Building');

var SelectStyle = {
    marginTop: 10,
    position: 'relative',
    width: 137,
    borderRadius: 3,
    display: 'inline-block',
    verticalAlign: 'middle',

};


var BuildingField = createClass({
    displayName: 'Building',
    propTypes: {
        label: PropTypes.string,
        searchable: PropTypes.bool,
    },
    getDefaultProps () {
        return {
            label: 'Building',
            searchable: true,
        };
    },
    getInitialState () {
        return {
            building: 'Buildings',
            disabled: false,
            searchable: this.props.searchable,
            selectValue: '',
            clearable: true,
            rtl: false,
        };
    },
    clearValue (e) {
        this.select.setInputValue('');
    },
    switchCountry (e) {
        var newBuilding = e.target.value;
        this.setState({
            building: newBuilding,
            selectValue: newBuilding,
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
        var options = Building[this.state.building];
        return (
            <div>
                <Select
                    placeholder = "Building"
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

export default BuildingField;
