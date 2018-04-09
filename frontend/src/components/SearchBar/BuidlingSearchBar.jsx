import Select from 'react-select';
import { Row, Col } from 'react-bootstrap';
import 'react-select/dist/react-select.css';
import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Building = require('./Building');

var SelectStyle = {
    marginTop: 10,
    position: 'relative',
    // width: 137,
    borderRadius: 3,
    // display: 'inline-block',
    // verticalAlign: 'middle',

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
            options: Building['Buildings'],
            isLoading: true,
            disabled: true,
            searchable: this.props.searchable,
            selectValue: '',
            clearable: true,
            rtl: false,
            arrowRenderer: true
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
    componentWillReceiveProps(nextProps) {
        if(nextProps.data && !nextProps.data.loading) {
            var options = [];
            (nextProps.data.sensorData).forEach(function(element) {
                        const optionsObj = {label: element.building, value: element.building, className: "buildingName"};
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
            disabled: false,
            isLoading: false
        });
    },

    render () {
        // if(this.state.isLoading) {
        //     return(
        //         <div>
        //     )
        // }
        return (
            <div>
                <Select
                    placeholder = "Building"
                    style={SelectStyle}
                    isLoading={this.state.isLoading}
                    id="state-select"
                    ref={(ref) => { this.select = ref; }}
                    onBlurResetsInput={false}
                    onSelectResetsInput={false}
                    autoFocus
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

const BLDG_QUERY = gql`
    query MinutesQuery
    {
        sensorData
        {
            building
        }
    }
`;

export default graphql(BLDG_QUERY)(BuildingField);
