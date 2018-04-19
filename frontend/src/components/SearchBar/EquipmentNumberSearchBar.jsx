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
            value
        }, () => {
            this.props.callback(this.state.value);
        });
    },
    componentWillReceiveProps(nextProps) {
        if(nextProps.data && !nextProps.data.loading && nextProps.data.sensorData !== "undefined") {
            if(nextProps.equipType === "CHW" || nextProps.equipType === "HHW") {
                this.setState({
                    disabled: true,
                    value: [],
                }, () => {
                    this.props.callback(this.state.selectValue);
                });
                return;
            }
            var options = [];
            (nextProps.data.searchFilter.equipmentNumbers).forEach(function(element) {
                        const optionsObj = {label: element, value: element, className: "equipmentNumber"};
                        options.push(optionsObj);
            });
            if(nextProps.building === null || nextProps.equipType === null) {
                this.handleSelectChange(null);
                options = [];
            }
            this.setState({
                options: options,
                isLoading: false,
                disabled: false
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
    ) {
        searchFilter(
            building       : $building,
            equipmentType  : $equipmentType,
        ) {
            equipmentNumbers
        }
    }
`;

export default graphql(NUM_QUERY, {
    options: (props) => ({
        variables: {
            building       : props.building,
            equipmentType  : props.equipType,
        }
    }),
})(EquipNumField);
