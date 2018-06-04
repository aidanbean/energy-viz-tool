import Select from 'react-select';
import 'react-select/dist/react-select.css';
import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

var SelectStyle = {
  position: 'relative',
  borderRadius: 3,
};

var SensorField = createClass({
  displayName: 'Sensor Type',
  propTypes: {
    label: PropTypes.string,
    searchable: PropTypes.bool,
  },
  getDefaultProps() {
    return {
      label: 'Sensor Type',
      searchable: true,
    };
  },
  getInitialState() {
    return {
      searchable: this.props.searchable,
      clearable: true,
      removeSelected: true,
      disabled: false,
      stayOpen: false,
      isLoading: true,
      value: this.props.selection.sensorType,
      rtl: false,
    };
  },

  clearValue(e) {
    this.select.setInputValue(null);
  },
  handleSelectChange(value) {
    this.setState(
      {
        value,
      },
      () => {
        if (this.state.value === '') {
          this.setState(
            {
              value: null,
            },
            () => {
              this.props.callback(this.state.value);
            }
          );
        } else {
          this.props.callback(this.state.value);
        }
      }
    );
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.data && !nextProps.data.loading) {
      var options = [];
      nextProps.data.searchFilter.sensorTypes.forEach(function(element) {
        const optionsObj = {
          label: element,
          value: element,
          className: 'sensorType',
        };
        options.push(optionsObj);
      });
      this.setState({
        options: options,
        isLoading: false,
      });
    }
  },
  render() {
    return (
      <div>
        <Select
          style={SelectStyle}
          closeOnSelect={!this.state.stayOpen}
          disabled={this.state.disabled}
          multi
          onChange={this.handleSelectChange}
          options={this.state.options}
          placeholder="Sensor Type"
          removeSelected={this.state.removeSelected}
          rtl={this.state.rtl}
          simpleValue
          value={this.state.value}
          isLoading={this.state.isLoading}
        />
      </div>
    );
  },
});

const SENS_QUERY = gql`
  query SensorQuery(
    $building: String
    $equipmentType: String
    $equipmentNumber: String
  ) {
    searchFilter(
      building: $building
      equipmentType: $equipmentType
      equipmentNumber: $equipmentNumber
    ) {
      sensorTypes
    }
  }
`;

export default graphql(SENS_QUERY, {
  options: props => ({
    variables: {
      building: props.selection.building,
      equipmentType: props.selection.equipmentType,
      equipmentNumber: props.selection.equipmentNumber,
      sensorType: props.selection.sensorType,
    },
  }),
})(SensorField);
