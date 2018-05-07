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

    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
        };
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
        } else {
            buttonStyle.backgroundColor = "white";
            buttonStyle.fontWeight = 'normal';
        }

        return (
            <ButtonContext.Consumer>
                {({buttonHandler}) => (
                    <button style={buttonStyle} onClick={this.clickHandler}
                            callback={buttonHandler(this.props.name, this.state.clicked)}
                            className="button">{this.props.text}</button>
                )}
            </ButtonContext.Consumer>
        )
    }
}

export default Button;
