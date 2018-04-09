

import React, { Component } from 'react';
import moment from 'moment';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import NotificationSystem from 'react-notification-system';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Sidebar from '../../components/Sidebar/Sidebar';

import {style} from "../../variables/Variables.jsx";

import appRoutes from '../../routes/app.jsx';

// import TableList from './TableList.jsx'

class App extends Component {
    constructor(props){
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleNotificationClick = this.handleNotificationClick.bind(this);
        this.dataByMinutes = this.dataByMinutes.bind(this);
        // this._getByMinutes = this._getByMinutes.bind(this);
        var initialStart = moment().subtract(30, 'days').format('MM-DD-YYYY-ha');
        console.log(initialStart);
        var initialEnd = moment().format('MM-DD-YYYY-ha');
        console.log(initialEnd);
        this.state = {
            _notificationSystem: null,
            headerData: {
                building       : 'MU',
                equipmentType  : 'AHU',
                equipmentNumber: 'AHU01_PENT',
                sensorType     : 'Outside Air Temp',
                startTime      : initialStart,
                endTime        : initialEnd,
                interval       : '30m'
            }
        };
        console.log(this.state);
    }
    handleNotificationClick(position){
        var color = Math.floor((Math.random() * 4) + 1);
        var level;
        switch (color) {
            case 1:
                level = 'success';
                break;
            case 2:
                level = 'warning';
                break;
            case 3:
                level = 'error';
                break;
            case 4:
                level = 'info';
                break;
            default:
                break;
        }
        // don't need notification system
        // this.state._notificationSystem.addNotification({
        //     title: (<span data-notify="icon" className="pe-7s-gift"></span>),
        //     message: (
        //         <div>
        //             Welcome to <b>Light Bootstrap Search</b> - a beautiful freebie for every web developer.
        //         </div>
        //     ),
        //     level: level,
        //     position: position,
        //     autoDismiss: 15,
        // });
    }
    componentDidMount(){
        this.setState({_notificationSystem: this.refs.notificationSystem});
        var _notificationSystem = this.refs.notificationSystem;
        var color = Math.floor((Math.random() * 4) + 1);
        var level;
        switch (color) {
            case 1:
                level = 'success';
                break;
            case 2:
                level = 'warning';
                break;
            case 3:
                level = 'error';
                break;
            case 4:
                level = 'info';
                break;
            default:
                break;
        }

        // don't need notification system
        // _notificationSystem.addNotification({
        //     title: (<span data-notify="icon" className="pe-7s-gift"></span>),
        //     message: (
        //         <div>
        //             Welcome to <b>Light Bootstrap Search</b> - a beautiful freebie for every web developer.
        //         </div>
        //     ),
        //     level: level,
        //     position: "tr",
        //     autoDismiss: 15,
        // });
    }
    componentDidUpdate(e){
        if(window.innerWidth < 993 && e.history.location.pathname !== e.location.pathname && document.documentElement.className.indexOf('nav-open') !== -1){
            document.documentElement.classList.toggle('nav-open');
        }
    }
    dataByMinutes(dataFromHeader) {
        console.log("In App.jsx");
        console.log(dataFromHeader);
        this.setState({
            headerData: dataFromHeader
        }, () => {
            console.log(this.state);
        })
    }
    render() {

        const { data } = this.state;
        const fieldMap = ["building", "equipmentType", "equipmentNumber", "SensorType"];
        const heads = ["Building", "Equipment Type", "Equipment Number", "Sensor Type"];


        return (
                <div className="wrapper">
                    <NotificationSystem ref="notificationSystem" style={style}/>
                    <Sidebar {...this.props} />
                    <div id="main-panel" className="main-panel">
                        <Header {...this.props} />
                            <Switch>
                                {
                                    appRoutes.map((prop,key) => {
                                        if(prop.name === "Notifications")
                                            return (
                                                <Route
                                                    path={prop.path}
                                                    key={key}
                                                    render={routeProps =>
                                                       <prop.component
                                                           {...routeProps}
                                                           handleClick={this.handleNotificationClick}
                                                           headerData={this.state.headerData}
                                                       />}
                                                />
                                            );
                                        if(prop.redirect)
                                            return (
                                                <Redirect
                                                    from={prop.path}
                                                    to={prop.to}
                                                    key={key}
                                                    render={redirectProps =>
                                                        <prop.component
                                                            {...redirectProps}
                                                            headerData={this.state.headerData}
                                                            callback={this.dataByMinutes}
                                                        />}
                                                />
                                            );
                                        return (
                                            <Route
                                                path={prop.path}
                                                key={key}
                                                render={routeProps =>
                                                    <prop.component
                                                        {...routeProps}
                                                        headerData={this.state.headerData}
                                                        callback={this.dataByMinutes}
                                                    />}
                                            />
                                        );
                                    })
                                }
                            </Switch>
                    </div>
                </div>
        );
    }
}

export default App;
