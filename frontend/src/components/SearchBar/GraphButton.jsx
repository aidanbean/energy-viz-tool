import React from 'react';
import { Button } from 'react-bootstrap';

class GraphButton extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.state = {
            isLoading: false
        };
    }

    handleClick() {
        this.setState({
            isLoading: true
        });
    }
    // componentWillReceiveProps(nextProps) {
    //     console.log(nextProps.data);
    //     this.setState({
    //         isLoading:false
    //     })
    // }

    render() {
        const isLoading = this.state.isLoading;
        return (
            <Button
                bsStyle='success'
                disabled={isLoading}
                onClick={!isLoading ? this.handleClick() : null}
            >
                {isLoading ? 'Graphing' : 'Graph'}
            </Button>
        )
    }

}

export default GraphButton;