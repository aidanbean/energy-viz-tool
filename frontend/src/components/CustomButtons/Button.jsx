
import React, {Component} from 'react';
import ButtonContext from '../DateSelection/utils'

class Button extends Component {

    clickHandler() {
        this.setState(
            {
                clicked: !this.state.clicked,
            }
        );


        // var clicked = this.state.clicked;
        // if(clicked){
        //     console.log(this.state.clicked);
        //     this.props.callback;
        // }


    }

    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            // clickHandler: this.clickHandler,
        };
        // this.observer = props.observer;
        this.clickHandler = this.clickHandler.bind(this);

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
            // console.log('callBack');
            // this.props.callback;

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
            switch (this.props.name.substr(0,1)){
                case 'm':
                    window.monthOfYear.splice(window.monthOfYear.indexOf(this.props.name), 1);
                    break;
                case 'd':
                    window.dayOfMonth.splice(window.dayOfMonth.indexOf(this.props.name), 1);
                    break;
                case 'w':
                    window.dayOfWeek.splice(window.dayOfWeek.indexOf(this.props.name), 1);
                    break;
                case 'h':
                    window.hourOfDay.splice(window.hourOfDay.indexOf(this.props.name), 1);
                    break;
                default:
                    break;
            }
        }

        return (
            <ButtonContext.Consumer>
                {({buttonHandler}) => (
                <button style={buttonStyle} onClick={this.clickHandler}
                        callback = {buttonHandler(this.props.name, this.state.clicked)}
                        className="button">{this.props.text}</button>
                )}
            </ButtonContext.Consumer>
        )
    }
}

export default Button;
