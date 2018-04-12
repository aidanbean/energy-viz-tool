import Select from 'react-select';
import { Row, Col } from 'react-bootstrap';
import 'react-select/dist/react-select.css';
import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

var SelectStyle = {
    marginTop: 10,
    position: 'relative',
    borderRadius: 3,
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
    componentWillReceiveProps(nextProps) {
        if(nextProps.data && !nextProps.data.loading) {
            var options = [];
            (nextProps.data.sensorData).forEach(function(element) {
                        const optionsObj = {label: element.sensorType, value: element.sensorType, className: "sensorType"};
                        options.push(optionsObj);
            });
            options = options.filter((option, index, self) =>
                index === self.findIndex((t) => (
                    t.value === option.value
                ))
            );
        }
        this.setState({
            options: options,
            isLoading: false
        });
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
                    simpleValue
                    options={this.state.options}
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

const NUM_QUERY = gql`
    query MinutesQuery(
        $building       : String,
        $equipmentType  : String,
        $equipmentNumber: String,
    ) {
        sensorData(
            building       : $building,
            equipmentType  : $equipmentType,
            equipmentNumber: $equipmentNumber,
        ) {
            sensorType
        }
    }
`;

export default graphql(NUM_QUERY, {
    options: (props) => ({
        variables: {
            building       : props.building,
            equipmentType  : props.equipType,
            equipmentNumber: props.equipNum,
        }
    }),
})(SensorField);
