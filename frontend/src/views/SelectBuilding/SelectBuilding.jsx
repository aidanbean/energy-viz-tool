import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Building from '../../components/SearchBar/BuildingSearchBar';

// const styles = {
//     block: {
//         maxWidth: 250,
//     },
//     checkbox: {
//         marginBottom: 16,
//     }
// }
class SelectBuilding extends React.Component {
    constructor() {
        super();
        this.buildingHandler = this.buildingHandler.bind(this);
        this.state = {
            building: null,
            equipmentType: null,
            equipmentNumber: null,
            sensorType: null,
            startTime: '',
            endTime: '',
            interval: ''
        };
    }
    buildingHandler(selection) {
        this.setState({
            building: selection,
        }, () => {
            console.log(this.state);
        });
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col md={4}></Col>
                    <Col md={2}>
                        <h5><center> Select Building </center></h5>
                        <Building label="Building" callback={this.buildingHandler} selection={this.state} searchable />
                    </Col>
                    <Col md={6}></Col>
                </Row>

                <br/>

                <Row>
                    <Col md={2}></Col>
                    <Col md={6}>

                       {/*<Checkbox*/}
                           {/*inputRef={ref => { this.input = ref; }}*/}
                           {/*label="Driving Zone Analysis"*/}
                           {/*style={styles.checkbox}*/}

                       {/*/>*/}

                    </Col>
                    <Col md={4}></Col>
                </Row>

            </Grid>
    );
    }
}

export default SelectBuilding;
