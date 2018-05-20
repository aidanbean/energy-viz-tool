import React from 'react';
import { Grid, Row, Col, Collapse} from 'react-bootstrap';
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
            startTime: '',
            endTime: '',
            interval: '1h',
            monthOfYear: [],
            dayOfMonth: [],
            dayOfWeek: [],
            hourOfDay: [],
            buttonHandler: this.buttonHandler,
            isOpened: true,
        };



    }

    render() {
        const tagStyle = {
            fontFamily: 'ProximaNova',
            fontSize: '14px',
            fontWeight: '600',
            fontStyle: 'normal',
            fontStretch: 'normal',
            lineHeight: 'normal',
            letterSpacing: 'normal',
            color: '#2d323c',
            textAlign: 'left',
            marginTop: '10px'
        };
        return (
            <ButtonContext.Provider value={this.state}>
                <div>
                    <Grid fluid>
                        <Row>
                            <Col md={12} xsHidden={12} style={{minHeight: '50px'}}/>
                            <Col md={3} xs={12}>
                                <Col md={3} xsHidden={12}/>
                                <Col md={9} xs={12} style={{paddingLeft: 0}}>
                                    <p style={tagStyle}>Select a building</p>
                                </Col>
                            </Col>
                            <Col md={8}>
                                <Header selection={this.state} callback={this.buildingHandler}/>
                            </Col>
                            <Col md={12} xsHidden={12} style={{minHeight: '20px'}}/>
                        </Row>


                        <Row>
                        <Col md={3}>
                            <Col md={3} />
                            <Col md={9} xs={12} style={{paddingLeft: 0}}>
                                <p style={tagStyle} onClick={this.toggleCollapse}>Refine filters</p>
                            </Col>
                        </Col>
                            <Collapse in={this.state.isOpened}>
                        <Col md={8}>
                            <DateSelection applySelection={this.saveDateSelection}/>
                        </Col>
                            </Collapse>
                        </Row>
                        {/*<Row>*/}
                            {/*<Col md={12}>*/}
                                {/*<ButtonContext.Consumer>*/}
                                    {/*{value =>*/}
                                        {/*<PreBake1 building={this.state.building} dateSelection={value}/>*/}
                                    {/*}*/}
                                {/*</ButtonContext.Consumer>*/}
                            {/*</Col>*/}
                        {/*</Row>*/}
                        {/*<Row>*/}
                            {/*<Col md={12}>*/}
                                {/*<ButtonContext.Consumer>*/}
                                    {/*{value =>*/}
                                        {/*<PreBake2 building={this.state.building} dateSelection={value}/>*/}
                                    {/*}*/}
                                {/*</ButtonContext.Consumer>*/}
                            {/*</Col>*/}
                        {/*</Row>*/}
                    </Grid>
                </div>
            </ButtonContext.Provider>
        );
    }
}

export default SelectBuilding;

