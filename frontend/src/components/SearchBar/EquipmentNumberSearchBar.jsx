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

var EquipNumField = createClass({
  displayName: 'Equipment Number',
  propTypes: {
    label: PropTypes.string,
    searchable: PropTypes.bool,
  },
  getDefaultProps() {
    return {
      label: 'Equipment Number',
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
      value: this.props.selection.equipmentNumber,
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
    console.log(nextProps);
    if (nextProps.data && !nextProps.data.loading) {
      var options = [];
      nextProps.data.searchFilter.equipmentNumbers.forEach(function(element) {
        const optionsObj = {
          label: element,
          value: element,
          className: 'equipmentNumber',
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
          placeholder="Equipment Number"
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

const NUM_QUERY = gql`
  query NumsQuery(
    $building: String
    $equipmentType: String
    $sensorType: String
  ) {
    searchFilter(
      building: $building
      equipmentType: $equipmentType
      sensorType: $sensorType
    ) {
      equipmentNumbers
    }
  }
`;

export default graphql(NUM_QUERY, {
  options: props => ({
    variables: {
      building: props.selection.building,
      equipmentType: props.selection.equipmentType,
      equipmentNumber: props.selection.equipmentNumber,
      sensorType: props.selection.sensorType,
    },
  }),
})(EquipNumField);
