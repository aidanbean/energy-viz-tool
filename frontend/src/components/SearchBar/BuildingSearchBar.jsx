import Select from 'react-select';
import 'react-select/dist/react-select.css';
import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';

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
            building: 'Buildings',
            options: Buildings['Buildings'],
            isLoading: true,
            disabled: true,
            searchable: this.props.searchable,
            selectValue: '',
            clearable: true,
            rtl: false,
            arrowRenderer: true
        };
    },
    updateValue (newValue) {
        this.setState({
            selectValue: newValue,
        }, () => {
            this.props.callback(this.state.selectValue);
        });
    },
    componentWillReceiveProps(nextProps) {
        this.setState({
            disabled: false,
            isLoading: false
        })
    },
    clearValue(){
        this.setState({
            selectValue: '',
        }, () => {
            this.props.callback(this.state.selectValue);
        });
    },
    render () {
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
                    clearValue={this.state.clearValue}
                    searchable={this.state.searchable}
                />
            </div>
        );
    }
});

export default BuildingField;
