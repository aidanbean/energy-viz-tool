import React from 'react';
import { Button } from 'react-bootstrap';

class GraphButton extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isLoading: true
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.data);
        this.setState({
            isLoading:false
        })
    }

    render() {
        const isLoading = this.state.isLoading;
        return (
            <Button
                bsStyle='success'
                disabled={isLoading}
                // onClick={!isLoading ? this.handleClick() : null}
            >
                {isLoading ? 'Graphing' : 'Graph'}
            </Button>
        )
    }

}

export default GraphButton;