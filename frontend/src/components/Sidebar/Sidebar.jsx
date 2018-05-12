import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/img/energyviz-logo.png';

import appRoutes from '../../routes/app.jsx';
class Sidebar extends Component{
    constructor(props){
        super(props);
        this.state = {
            width: window.innerWidth
        }
    }
    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
    }
    updateDimensions(){
        this.setState({width:window.innerWidth});
    }
    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }
    render(){
        return (
            <div id="sidebar" className="sidebar" data-color="black">
                    <div className="logo">
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <a href="#" className="simple-text logo-mini">
                                <div className="logo-img">
                                    <img src={logo} alt="logo_image"/>
                                </div>
                            </a>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <a href="#" className="simple-text logo-normal">
                                <p>Energy Viz</p>
                            </a>
                        </div>
                    </div>


                <div className="sidebar-wrapper">
                    <ul className="nav">
                        {
                            appRoutes.map((prop,key) => {
                                if(!prop.redirect)
                                    return (
                                        <li className={this.activeRoute(prop.path)} key={key}>
                                            <NavLink to={prop.path} className="nav-link" activeClassName="active">
                                                <i className={prop.icon}></i>
                                                <p>{prop.name}</p>
                                            </NavLink>
                                        </li>
                                    );
                                return null;
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sidebar;
