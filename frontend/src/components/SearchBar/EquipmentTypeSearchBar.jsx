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
  marginBottom: '15px',
};

var EquipmentField = createClass({
  displayName: 'Euipment Type',
  propTypes: {
    label: PropTypes.string,
    searchable: PropTypes.bool,
  },
  getDefaultProps() {
    return {
      label: 'Euipment Type',
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
      value: this.props.selection.equipmentType,
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
    // console.log(nextProps);
    if (nextProps.data && !nextProps.data.loading) {
      var options = [];
      nextProps.data.searchFilter.equipmentTypes.forEach(function(element) {
        const optionsObj = {
          label: element,
          value: element,
          className: 'equipmentType',
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
          placeholder="Equipment Type"
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

const TYPE_QUERY = gql`
  query TypesQuery(
    $building: String
    $equipmentNumber: String
    $sensorType: String
  ) {
    searchFilter(
      building: $building
      equipmentNumber: $equipmentNumber
      sensorType: $sensorType
    ) {
      equipmentTypes
    }
  }
`;

export default graphql(TYPE_QUERY, {
  options: props => ({
    variables: {
      building: props.selection.building,
      equipmentNumber: props.selection.equipmentNumber,
      sensorType: props.selection.sensorType,
    },
  }),
})(EquipmentField);
