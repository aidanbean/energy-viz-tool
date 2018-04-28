import React, {Component} from 'react';
import {button} from 'react-bootstrap';

class Button extends Component {
    constructor() {
        super();
        this.state = {
            color_black: true
        }


    }

    changeColor() {
        this.setState({color_black: !this.state.color_black})
    }

    render() {
        let bgColor = this.state.color_black ? "white" : "rgb(188, 228, 236)";
        return (
            <button style={{backgroundColor: bgColor}} onClick={this.changeColor.bind(this)}
                    className="button">{this.props.text}</button>
        )
    }
}

export default Button;