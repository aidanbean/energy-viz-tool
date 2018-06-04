import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NotificationSystem from 'react-notification-system';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import moment from 'moment';
import {AllBuildingUrl} from '../../config'

import { style } from '../../variables/Variables.jsx';

import appRoutes from '../../routes/app.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    // this.componentDidMount = this.componentDidMount.bind(this);
    // this.handleNotificationClick = this.handleNotificationClick.bind(this);
    this.selectBldgHandler = this.selectBldgHandler.bind(this);
    this.allBldgHandler = this.allBldgHandler.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.state = {
      _notificationSystem: null,
      allBldgData: {
        url: AllBuildingUrl
      },
      selectBldgData: {
        building: 'ACAD',
        startTime: moment().subtract(2, 'months'),
        endTime: moment(),
      },
      searchData: {
        building: 'MU',
        equipmentType: 'AHU',
        equipmentNumber: 'AHU01_PENT',
        sensorType: 'Supply Air Temp',
        startTime: moment().subtract(2, 'months'),
        endTime: moment(),
        interval: '1h',
        firstRender: true,
      },
    };
  }
  // handleNotificationClick(position){
  //     var color = Math.floor((Math.random() * 4) + 1);
  //     var level;
  //     switch (color) {
  //         case 1:
  //             level = 'success';
  //             break;
  //         case 2:
  //             level = 'warning';
  //             break;
  //         case 3:
  //             level = 'error';
  //             break;
  //         case 4:
  //             level = 'info';
  //             break;
  //         default:
  //             break;
  //     }
  //     // don't need notification system
  //     this.state._notificationSystem.addNotification({
  //         title: (<span data-notify="icon" className="pe-7s-gift"></span>),
  //         message: (
  //             <div>
  //                 Welcome to <b>Light Bootstrap Search</b> - a beautiful freebie for every web developer.
  //             </div>
  //         ),
  //         level: level,
  //         position: position,
  //         autoDismiss: 15,
  //     });
  // }
  // componentDidMount(){
  //     this.setState({_notificationSystem: this.refs.notificationSystem});
  //     var _notificationSystem = this.refs.notificationSystem;
  //     var color = Math.floor((Math.random() * 4) + 1);
  //     var level;
  //     switch (color) {
  //         case 1:
  //             level = 'success';
  //             break;
  //         case 2:
  //             level = 'warning';
  //             break;
  //         case 3:
  //             level = 'error';
  //             break;
  //         case 4:
  //             level = 'info';
  //             break;
  //         default:
  //             break;
  //     }
  //
  //     don't need notification system
  //     _notificationSystem.addNotification({
  //         title: (<span data-notify="icon" className="pe-7s-gift"></span>),
  //         message: (
  //             <div>
  //                 Welcome to <b>Light Bootstrap Search</b> - a beautiful freebie for every web developer.
  //             </div>
  //         ),
  //         level: level,
  //         position: "tr",
  //         autoDismiss: 15,
  //     });
  // }
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf('nav-open') !== -1
    ) {
      document.documentElement.classList.toggle('nav-open');
    }
  }

  allBldgHandler(url) {
      this.setState({
        allBldgData: {
            url: url,
        }
      });
  }

  selectBldgHandler(selection) {
      this.setState({
        selectBldgData: selection,
      });
  }

  searchHandler(selection) {
    this.setState({
      searchData: selection,
    });
  }

  render() {
    return (
      <div className="wrapper">
        <NotificationSystem ref="notificationSystem" style={style} />
        <Sidebar {...this.props} />
        <div id="main-panel" className="main-panel">
          <Header {...this.props} />
          <Switch>
            {appRoutes.map((prop, key) => {
              if (prop.name === 'Notifications')
                return (
                  <Route
                    path={prop.path}
                    key={key}
                    render={routeProps => (
                      <prop.component
                        {...routeProps}
                        handleClick={this.handleNotificationClick}
                      />
                    )}
                  />
                );
              if (prop.redirect)
                return (
                  <Redirect
                    from={prop.path}
                    to={prop.to}
                    key={key}
                    render={redirectProps => (
                      <prop.component
                        {...redirectProps}
                        url={this.state.allBldgData.url}
                        selectBldgData={this.state.selectBldgData}
                        headerData={this.state.searchData}
                        callback1={this.allBldgHandler}
                        callback2={this.selectBldgHandler}
                        callback3={this.searchHandler}
                      />
                    )}
                  />
                );
              return (
                <Route
                  path={prop.path}
                  key={key}
                  render={routeProps => (
                    <prop.component
                      {...routeProps}
                      url={this.state.allBldgData.url}
                      selectBldgData={this.state.selectBldgData}
                      headerData={this.state.searchData}
                      callback1={this.allBldgHandler}
                      callback2={this.selectBldgHandler}
                      callback3={this.searchHandler}
                    />
                  )}
                />
              );
            })}
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
