import Select from 'react-select';
import 'react-select/dist/react-select.css';
import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';

const SensorType = require('./SensorType');

var SelectStyle = {
    marginTop: 10,
    position: 'relative',
    width: 138,
    borderRadius: 3,
    display: 'inline-block',
    verticalAlign: 'middle',
};


var SensorField = createClass({
    displayName: 'StatesField',
    propTypes: {
        label: PropTypes.string,
        searchable: PropTypes.bool,
    },

    getDefaultProps () {
        return {
            label: 'Sensor:',
            searchable: true,
        };
    },
    getInitialState () {
        return {
            sensor: 'SensorTypes',
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
        var newSensor = e.target.value;
        this.setState({
            sensor: newSensor,
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
        var options = SensorType[this.state.sensor];
        return (
            <div>
                <Select
                    placeholder = "Sensor Type"
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


                {/*<button style={{ dmarginTop: '15px' }}  type="button" onClick={this.focusStateSelect}>Focus Select</button>*/}
                {/*<button style={{ marginTop: '15px' }} type="button" onClick={this.clearValue}>Clear Value</button>*/}
            </div>
        );
    }
});

export default SensorField;
