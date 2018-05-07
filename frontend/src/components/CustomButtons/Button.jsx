import React, {Component} from 'react';
import ButtonContext from '../DateSelection/utils'

class Button extends Component {

    clickHandler() {
        this.setState(
            {
                clicked: !this.state.clicked,
            }
        );
    }



    buttonStyle = () => {
        let clicked = this.state.clicked;
            if (clicked) {
                return {
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
                    fontWeight: 'bold'
                }
            } else {
                return {
                    width: 32,
                    height: 32,
                    border: 0,
                    paddingLeft: 0,
                    paddingRight: 0,
                    backgroundColor: "white",
                    marginBottom: 5,
                    marginTop: 5,
                    marginLeft: 5,
                    marginRight: 5,
                    fontWeight: 'normal'
                }

            }
    };

    // shouldComponentUpdate = (nextProps, nextState) => {
    //     console.log('will update');
    //     console.log(nextProps);
    //     console.log(nextState);
    //     if(nextProps.name.length > 0 && nextProps.name.substr(2) == nextProps.text)
    //         return true;
    //     else
    //         return false;
    // };


    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            buttons: [],
        };
        this.clickHandler = this.clickHandler.bind(this);
        this.buttonStyle = this.buttonStyle.bind(this);
    }


    render() {
        // var buttonStyle = {
        //     width: 32,
        //     height: 32,
        //     border: 0,
        //     paddingLeft: 0,
        //     paddingRight: 0,
        //     backgroundColor: "rgb(188, 228, 236)",
        //     marginBottom: 5,
        //     marginTop: 5,
        //     marginLeft: 5,
        //     marginRight: 5,
        //     fontWeight: 'normal'
        // };
        //
        // console.log('button props');
        // console.log(this.props);
        //
        //
        // var clicked = this.state.clicked;
        // if (clicked) {
        //     buttonStyle.backgroundColor = "rgb(188, 228, 236)";
        //     buttonStyle.fontWeight = 'bold';
        //     // this.observer.publish("hello",'this is data');
        //     // console.log('callBack');
        //     // this.props.callback;
        //
        //     switch (this.props.name.substr(0,1)){
        //         case 'm':
        //             window.monthOfYear.push(this.props.text);
        //             break;
        //         case 'd':
        //             window.dayOfMonth.push(this.props.text);
        //             break;
        //         case 'w':
        //             window.dayOfWeek.push(this.props.text);
        //             break;
        //         case 'h':
        //             window.hourOfDay.push(this.props.text);
        //             break;
        //         default:
        //             break;
        //     }
        // } else {
        //     buttonStyle.backgroundColor = "white";
        //     switch (this.props.name.substr(0,1)){
        //         case 'm':
        //             window.monthOfYear.splice(window.monthOfYear.indexOf(this.props.name), 1);
        //             break;
        //         case 'd':
        //             window.dayOfMonth.splice(window.dayOfMonth.indexOf(this.props.name), 1);
        //             break;
        //         case 'w':
        //             window.dayOfWeek.splice(window.dayOfWeek.indexOf(this.props.name), 1);
        //             break;
        //         case 'h':
        //             window.hourOfDay.splice(window.hourOfDay.indexOf(this.props.name), 1);
        //             break;
        //         default:
        //             break;
        //     }
        // }

        console.log('Button Render');
        return (
            <ButtonContext.Consumer>
                {({hourOfDay, buttonHandler}) => (
                    <button style={this.buttonStyle(hourOfDay)} onClick={this.clickHandler}
                            callback={buttonHandler(this.props.name, this.state.clicked)}
                            className="button">{this.props.text}</button>
                )}
            </ButtonContext.Consumer>
        )
    }
}

export default Button;
