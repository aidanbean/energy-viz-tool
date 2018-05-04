import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {BarLoader} from 'react-spinners';
import Building from '../../components/SearchBar/BuildingSearchBar';
import Header from '../../components/Header/SelectBuildingHeader.jsx';
import PreBake1 from '../../components/Graphs/Economizer.jsx';
import PreBake2 from '../../components/Graphs/AirTemp-AirTempSP.jsx';
import DateSelection from '../../components/DateSelection/DateSelection.jsx'
// import PropTypes from 'prop-types';
// import Button from "../../components/CustomButtons/Button";
// import {ThemeContext, themes} from './theme-context';
// import ThemeTogglerButton from './theme-toggler-button.js';
import ButtonContext from '../../components/DateSelection/utils';


// const ButtonContext = React.createContext({
//     monthOfYear: [],
//     dayOfMonth: [],
//     dayOfWeek: [],
//     hourOfDay: [],
//

//
//     buttonDisableHandler: (name) => {
//         let tag = name.substr(0,1);
//         let button = name.substr(2);
//         switch (tag){
//             case 'm':
//                 this.monthOfYear.splice(this.monthOfYear.indexOf(button), 1);
//                 break;
//             case 'd':
//                 this.dayOfMonth.splice(this.dayOfMonth.indexOf(button), 1);
//                 break;
//             case 'w':
//                 this.dayOfWeek.splice(this.dayOfWeek.indexOf(button), 1);
//                 break;
//             case 'h':
//                 this.hourOfDay.splice(this.hourOfDay.indexOf(button), 1);
//                 break;
//             default:
//                 break;
//         }
//     }
// });

class SelectBuilding extends React.Component {
    constructor(props) {
        super(props);
        this.buildingHandler = this.buildingHandler.bind(this);

        this.buttonHandler = (name, click) => {
            console.log('SelectBuilding handler');
            console.log(name);
            console.log(click);
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
                // console.log(monthOfYear);
            } else {
                switch (tag) {
                    case 'm':
                        monthOfYearTmp.splice(monthOfYearTmp.indexOf(button), 1);
                        break;
                    case 'd':
                        dayOfMonthTmp.splice(dayOfMonthTmp.indexOf(button), 1);
                        break;
                    case 'w':
                        dayOfWeekTmp.splice(dayOfWeekTmp.indexOf(button), 1);
                        break;
                    case 'h':
                        hourOfDayTmp.splice(hourOfDayTmp.indexOf(button), 1);
                        break;
                    default:
                        break;
                }
                // console.log(monthOfYear);
            }
        };

        let monthOfYearTmp = [];
        let dayOfMonthTmp = [];
        let dayOfWeekTmp = [];
        let hourOfDayTmp = [];


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


    buildingHandler(selection) {
        this.setState(
            {
                building: selection,
            }
        );
    }

    render() {
        return (
            <ButtonContext.Provider value={this.state}>
                <div>
                    <Grid fluid>
                        <Header selection={this.state} callback={this.buildingHandler}/>
                        <br/>
                        <DateSelection/>

                        <Row>
                            <Col md={12}>
                                {/*<PreBake1 building={this.state.building} />*/}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                {/*<PreBake2 building={this.state.building} />*/}
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </ButtonContext.Provider>
        );
    }
}

export default SelectBuilding;

