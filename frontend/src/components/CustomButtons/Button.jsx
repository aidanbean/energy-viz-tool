import React, {Component} from 'react';

class Button extends Component {
    constructor() {
        super();
        this.state = {
            clicked: false,

        };
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
        } else {
            buttonStyle.backgroundColor = "white";
        }

        return (
            <button style={buttonStyle} onClick={() => this.clickHandler()} //TODO: button style CSS depend on mock up Demo
                    className="button">{this.props.text}</button>
        )
    }
}

export default Button;