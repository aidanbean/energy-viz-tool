import React, { Component } from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { FormGroup, Row, Col } from 'react-bootstrap';
import FormInputs from '../FormInputs/FormInputs.jsx';

class StartForm extends Component {

    constructor(props) {
        super(props);

        this.handleEvent = this.handleEvent.bind(this);

        this.state = {
            value: null
        };
    }

    handleEvent(event, picker) {
        this.setState({
            startDate: picker.startDate,
            endDate: picker.endDate,
        });
        console.log("here");
    }

    render() {
        return (
            <FormGroup>
                <Datetime
                    inputProps={{placeholder:"Start Date"}}
                />
            </FormGroup>
        );
    }

}

export default StartForm;
