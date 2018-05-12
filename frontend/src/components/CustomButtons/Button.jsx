import React, {Component} from 'react';
import ButtonContext from '../DateSelection/buttonContext'

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
            clicked: true,
        };
        this.clickHandler = this.clickHandler.bind(this);
    }

    render() {
        var buttonStyle = {
            width: 36,
            height: 36,
            paddingLeft: 0,
            paddingRight: 0,
            backgroundColor: "#bce4ed",
            marginBottom: 5,
            marginTop: 5,
            marginLeft: 5,
            marginRight: 5,
            fontWeight: 'normal',
            fontFamily: 'Metropolis',
            fontsize: '13px',
            border: 'solid 1px #2d323c',
            borderRadius: '3px',
        };

        var clicked = this.state.clicked;
        if (clicked) {
            buttonStyle.backgroundColor = "#bce4ed";
        } else {
            buttonStyle.backgroundColor = "#00000000";
            buttonStyle.border = 0;

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
