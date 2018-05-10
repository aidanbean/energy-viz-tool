import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Header from '../../components/Header/SelectBuildingHeader.jsx';
import PreBake1 from '../../components/Graphs/Economizer.jsx';
import PreBake2 from '../../components/Graphs/AirTemp-AirTempSP.jsx';
import DateSelection from '../../components/DateSelection/DateSelection.jsx'
import ButtonContext from '../../components/DateSelection/buttonContext';

class SelectBuilding extends React.Component {
    constructor(props) {
        super(props);

        let monthOfYearTmp = new Set();
        let dayOfMonthTmp = new Set();
        let dayOfWeekTmp = new Set();
        let hourOfDayTmp = new Set();

        this.buttonHandler = (name, click) => {
            let tag = name.substr(0, 1);
            let button = name.substr(2);

            if (click == true) {
                switch (tag) {
                    case 'm':
                        monthOfYearTmp.add(button);
                        break;
                    case 'd':
                        dayOfMonthTmp.add(button);
                        break;
                    case 'w':
                        dayOfWeekTmp.add(button);
                        break;
                    case 'h':
                        hourOfDayTmp.add(button);
                        break;
                    default:
                        break;
                }
            } else {
                let idx = 0;
                switch (tag) {
                    case 'm':
                        monthOfYearTmp.delete(button);
                        break;
                    case 'd':
                        dayOfMonthTmp.delete(button);
                        break;
                    case 'w':
                        dayOfWeekTmp.delete(button);
                        break;
                    case 'h':
                        hourOfDayTmp.delete(button);
                        break;
                    default:
                        break;
                }
            }
        };

        this.saveDateSelection = () => {
            this.setState({
                hourOfDay: hourOfDayTmp,
                dayOfMonth: dayOfMonthTmp,
                dayOfWeek: dayOfWeekTmp,
                monthOfYear: monthOfYearTmp,
            });
        };


        this.buildingHandler = (selection) => {
            this.setState({
                building: selection,
            });
        };

        this.state = {
            building: 'ACAD',
            equipmentType: null,
            equipmentNumber: null,
            sensorType: null,
            startTime: '',
            endTime: '',
            interval: '1h',
            monthOfYear: [],
            dayOfMonth: [],
            dayOfWeek: [],
            hourOfDay: [],
            buttonHandler: this.buttonHandler,
        };
    }

    render() {
        return (
            <ButtonContext.Provider value={this.state}>
                <div>
                    <Grid fluid>
                        <Header selection={this.state} callback={this.buildingHandler}/>
                        <br/>
                        <DateSelection applySelection={this.saveDateSelection}/>
                        <br/>
                        <Row>
                            <Col md={12}>
                                <ButtonContext.Consumer>
                                    {value =>
                                        <PreBake1 building={this.state.building} dateSelection={value}/>
                                    }
                                </ButtonContext.Consumer>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <ButtonContext.Consumer>
                                    {value =>
                                        <PreBake2 building={this.state.building} dateSelection={value}/>
                                    }
                                </ButtonContext.Consumer>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </ButtonContext.Provider>
        );
    }
}

export default SelectBuilding;

