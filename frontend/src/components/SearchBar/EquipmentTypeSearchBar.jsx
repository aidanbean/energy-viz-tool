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

var EquipmentField = createClass({
    displayName: 'EquipmentField',
    propTypes: {
        label: PropTypes.string,
        searchable: PropTypes.bool,
    },

    getDefaultProps () {
        return {
            label: 'Equips',
            searchable: true,
        };
    },

    getInitialState () {
        return {
            type: 'EquipmentTypes',
            disabled: false,
            searchable: this.props.searchable,
            selectValue: 'new-south-wales',
            clearable: true,
            isLoading: true,
        };
    },

    clearValue (e) {
        this.select.setInputValue('');
    },


    updateValue (newValue) {
        this.setState({
            selectValue: newValue,
        }, () => {
            // console.log("calling callback");
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
        // console.log("TypeSearchBar");
        // console.log(nextProps);

        if(nextProps.data && !nextProps.data.loading) {
            var options = [];
            (nextProps.data.sensorData).forEach(function(element) {
                        const optionsObj = {label: element.equipmentType, value: element.equipmentType, className: "equipmentType"};
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

        if(nextProps.building === null) {
            options = [];
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
                    placeholder = "Equipment Type"
                    style={SelectStyle}
                    id="state-select"
                    isLoading={this.state.isLoading}
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

const TYPE_QUERY = gql`
    query MinutesQuery(
        $building       : String,
    ) {
        sensorData(
            building       : $building
        ) {
            equipmentType
        }
    }
`;

export default graphql(TYPE_QUERY, {
    options: (props) => ({
        variables: {
            building       : props.building,
        }
    }),
})(EquipmentField);
