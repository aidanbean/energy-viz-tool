
import React, {Component} from 'react';

class Button extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clicked: false,

        };
        // this.observer = props.observer;
    }

    clickHandler() {
        this.setState(
            {
                clicked: !this.state.clicked,
            }
        )
    }

    render() {
        var buttonStyle = {
            width: 32,
            height: 32,
            border: 0,
            paddingLeft: 0,
            paddingRight: 0,
            backgroundColor: "rgb(188, 228, 236)",
            marginBottom: 5,
            marginTop: 5,
            marginLeft: 5,
            marginRight: 5,
            fontWeight: 'normal'
        };
        var clicked = this.state.clicked;
        if (clicked) {
            buttonStyle.backgroundColor = "rgb(188, 228, 236)";
            buttonStyle.fontWeight = 'bold';
            // this.observer.publish("hello",'this is data');
            console.log(this.props.name);
            switch (this.props.name.substr(0,1)){
                case 'm':
                    window.monthOfYear.push(this.props.text);
                    break;
                case 'd':
                    window.dayOfMonth.push(this.props.text);
                    break;
                case 'w':
                    window.dayOfWeek.push(this.props.text);
                    break;
                case 'h':
                    window.hourOfDay.push(this.props.text);
                    break;
                default:
                    break;
            }
        } else {
            buttonStyle.backgroundColor = "white";
            // switch (this.props.name.substr(0,1)){
            //     case 'm':
            //         window.monthOfYear.splice(window.monthOfYear.indexOf(this.props.name), 1);
            //         break;
            //     case 'd':
            //         window.dayOfMonth.splice(window.dayOfMonth.indexOf(this.props.name), 1);
            //         break;
            //     case 'w':
            //         window.dayOfWeek.splice(window.dayOfWeek.indexOf(this.props.name), 1);
            //         break;
            //     case 'h':
            //         window.hourOfDay.splice(window.hourOfDay.indexOf(this.props.name), 1);
            //         break;
            //     default:
            //         break;
            // }
        }

        return (
            <button style={buttonStyle} onClick={() => this.clickHandler()} //TODO: button style CSS depend on mock up Demo
                    className="button">{this.props.text}</button>
        )
    }
}

export default Button;
