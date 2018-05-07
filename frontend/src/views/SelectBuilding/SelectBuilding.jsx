import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import Header from '../../components/Header/SelectBuildingHeader.jsx';
import PreBake1 from '../../components/Graphs/Economizer.jsx';
import PreBake2 from '../../components/Graphs/AirTemp-AirTempSP.jsx';
import DateSelection from '../../components/DateSelection/DateSelection.jsx'
import ButtonContext from '../../components/DateSelection/utils';

class SelectBuilding extends React.Component {
    constructor(props) {
        super(props);

        let monthOfYearTmp = [];
        let dayOfMonthTmp = [];
        let dayOfWeekTmp = [];
        let hourOfDayTmp = [];

        this.buttonHandler = (name, click) => {
            let tag = name.substr(0, 1);
            let button = name.substr(2);

            if (click == true) {
                switch (tag) {
                    case 'm':
                        monthOfYearTmp.push(button);
                        break;
                    case 'd':
                        dayOfMonthTmp.push(button);
                        break;
                    case 'w':
                        dayOfWeekTmp.push(button);
                        break;
                    case 'h':
                        hourOfDayTmp.push(button);
                        break;
                    default:
                        break;
                }
            } else {
                let idx = 0;
                console.log('button number');
                console.log(button);
                switch (tag) {
                    case 'm':
                        monthOfYearTmp = monthOfYearTmp.filter(element => element != button);
                        break;
                    case 'd':
                        dayOfMonthTmp = dayOfMonthTmp.filter(element => element != button);
                        break;
                    case 'w':
                        dayOfWeekTmp = dayOfWeekTmp.filter(element => element != button);
                        break;
                    case 'h':
                        hourOfDayTmp = hourOfDayTmp.filter(element => element != button);
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

