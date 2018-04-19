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
            searchable: this.props.searchable,
            clearable: true,
            removeSelected: true,
            disabled: false,
            stayOpen: false,
            value: [],
            rtl: false,
        };
    },
    clearValue (e) {
        this.select.setInputValue('');
    },
    handleSelectChange (value) {
        this.setState({
            value,
        }, () => {
            this.props.callback(this.state.value);
        });
    },
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.data);
        if(nextProps.data && !nextProps.data.loading && nextProps.data.sensorFilter !== "undefined") {
            var options = [];
            (nextProps.data.searchFilter.sensorTypes).forEach(function(element) {
                        const optionsObj = {label: element, value: element, className: "sensorType"};
                        options.push(optionsObj);
            });

            if(nextProps.building === null || nextProps.equipType === null || nextProps.equipNum === null) {
                this.handleSelectChange(null);
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
                style={SelectStyle}
                closeOnSelect={!this.state.stayOpen}
                autosize={true}
                disabled={this.state.disabled}
                multi
                onChange={this.handleSelectChange}
                options={this.state.options}
                placeholder="Equipment Number"
                removeSelected={this.state.removeSelected}
                rtl={this.state.rtl}
                simpleValue
                value={this.state.value}
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
        searchFilter(
            building       : $building,
            equipmentType  : $equipmentType,
            equipmentNumber: $equipmentNumber,
        ) {
            sensorTypes
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
