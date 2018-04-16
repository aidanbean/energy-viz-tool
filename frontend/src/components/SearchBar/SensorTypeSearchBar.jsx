import Select from 'react-select';
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
    updateValue (newValue) {
        this.setState({
            selectValue: newValue,
        }, () => {
            this.props.callback(this.state.selectValue);
        });
    },
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
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

            if(nextProps.building === null || nextProps.equipType === null || nextProps.equipNum === null) {
                this.updateValue(null);
                options = [];
            }

        }

        this.setState({
            options: options,
            isLoading: false
        });
    },
    render () {
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
