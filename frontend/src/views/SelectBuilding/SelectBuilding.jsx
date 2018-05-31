import React from 'react';
import moment from 'moment';
import {Grid, Row, Col} from 'react-bootstrap';
import Header from '../../components/Header/SelectBuildingHeader.jsx';
import PreBake1 from '../../components/Graphs/Economizer.jsx';
import PreBake2 from '../../components/Graphs/AirTemp-AirTempSP.jsx';
import PreBake3 from '../../components/Graphs/OutsideAirRatio.jsx';
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
            if(monthOfYearTmp.size === 0) {
                alert("Please select at least one month");
                return
            }else if(dayOfMonthTmp.size === 0) {
                alert("Please select at least one day");
                return
            }else if(dayOfWeekTmp.size === 0) {
                alert("Please select at least one weekday");
                return
            }else if(hourOfDayTmp.size === 0) {
                alert("Please select at least one hour");
                return
            }

            this.setState({
                hourOfDay: hourOfDayTmp,
                dayOfMonth: dayOfMonthTmp,
                dayOfWeek: dayOfWeekTmp,
                monthOfYear: monthOfYearTmp,
            });
        };

        this.selectionHandler = (selection) => {
            this.setState({
                building: selection.building,
                startTime: selection.startTime,
                endTime: selection.endTime
            });
        };

        this.toggleCollapse = () => {
            this.setState({
                isOpened: !this.state.isOpened,
            })
        };

        this.state = {
            building: 'ACAD',
            equipmentType: null,
            equipmentNumber: null,
            sensorType: null,
            startTime: moment().subtract(2, 'months').format("MM-DD-YYYY-Ha"),
            endTime: moment().format("MM-DD-YYYY-Ha"),
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
                        <Header  callback={this.selectionHandler}/>
                        <DateSelection applySelection={this.saveDateSelection}/>


                        <Row>
                            <Col md={12}>
                                <ButtonContext.Consumer>
                                    {value =>
                                        <PreBake1
                                        selection={this.state} dateSelection={value}/>
                                    }
                                </ButtonContext.Consumer>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <ButtonContext.Consumer>
                                    {value =>
                                        <PreBake2
                                        selection={this.state} dateSelection={value}/>
                                    }
                                </ButtonContext.Consumer>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <ButtonContext.Consumer>
                                    {value =>
                                        <PreBake3
                                        selection={this.state} dateSelection={value}/>
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
