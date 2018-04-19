import Select from 'react-select';
import 'react-select/dist/react-select.css';
import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Buildings = require('./Buildings');

var SelectStyle = {
    marginTop: 10,
    position: 'relative',
    borderRadius: 3,
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
            options: Buildings['Buildings'],
            searchable: this.props.searchable,
            clearable: true,
            removeSelected: true,
            disabled: false,
            stayOpen: false,
            isLoading: true,
            value: null,
            rtl: false,
        };
    },
    clearValue (e) {
        this.select.setInputValue(null);
    },
    handleSelectChange (value) {
        this.setState({
            value
        }, () => {
            if(this.state.value === "") {
                this.setState({
                    value: null
                }, () => {
                    this.props.callback(this.state.value);
                });
            } else {
                this.props.callback(this.state.value);
            }
        });
    },
    componentWillReceiveProps(nextProps) {
        if(nextProps.data && !nextProps.data.loading) {
            var options = [];
            (nextProps.data.searchFilter.buildings).forEach(function(element) {
                        const optionsObj = {label: element, value: element, className: "building"};
                        options.push(optionsObj);
            });
            this.setState({
                options: options,
                isLoading: false
            });
        }
    },
    render () {
        return (
            <div>
                <Select
                    style={SelectStyle}
                    closeOnSelect={!this.state.stayOpen}
                    disabled={this.state.disabled}
                    multi
                    onChange={this.handleSelectChange}
                    options={this.state.options}
                    placeholder="Building"
                    removeSelected={this.state.removeSelected}
                    rtl={this.state.rtl}
                    simpleValue
                    value={this.state.value}
                    isLoading={this.state.isLoading}
                />
            </div>
        );
    }
});

// export default BuildingField;

const BLDG_QUERY = gql`
    query BuildingsQuery(
        $equipmentType  : String,
        $equipmentNumber: String,
        $sensorType     : String
    ) {
        searchFilter(
            equipmentType  : $equipmentType,
            equipmentNumber: $equipmentNumber,
            sensorType     : $sensorType,
        ) {
            buildings
        }
    }
`;

export default graphql(BLDG_QUERY, {
    options: (props) => ({
        variables: {
            equipmentType  : props.selection.equipmentType,
            equipmentNumber: props.selection.equipmentNumber,
            sensorType     : props.selection.sensorType
        }
    }),
})(BuildingField);
