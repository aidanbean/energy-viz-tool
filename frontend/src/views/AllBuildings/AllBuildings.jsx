import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Header from '../../components/Header/AllBuildingsHeader.jsx';
import PreBake1 from '../../components/Graphs/Economizer.jsx';
import PreBake2 from '../../components/Graphs/AirTemp-AirTempSP.jsx';

class SelectBuilding extends React.Component {
    constructor() {
        super();
        this.headerCallback = this.headerCallback.bind(this);
        this.state = {
            building: 'ACAD',
            equipmentType: null,
            equipmentNumber: null,
            sensorType: null,
            startTime: '',
            endTime: '',
            interval: '1h'
        };
    }
    headerCallback(selection) {
        this.setState({
            building: selection,
        }, () => {
            console.log(this.state);
        });
    }

    render() {
        return (
            <div>
                <Row>
                    <Header callback={this.headerCallback} selection={this.state} isLoading={false}/>
                </Row>
                <br/>
                <Row>
                    <Col md={12}>
                        <PreBake1 headerData={this.state} />
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <PreBake2 headerData={this.state} />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default SelectBuilding;
