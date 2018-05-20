import React, {Component} from 'react';
import {Col, Row, Button, FormControl} from 'react-bootstrap';


class EmbedUrl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: null,
        };

        this.handleChange = (event) => {
            this.setState({url: event.target.value});
        };

        this.handleApply = () => {
            if(this.state.url === null){
                alert("Please input a url");
            }

            this.props.callback(this.state.url.toString());
        };
    }
    
    render() {
        return (
            <div className="content">
                <form>
                    <Row>
                        <Col md={9} xs={8}>
                        <FormControl type="text" value={this.state.url} onChange={this.handleChange} />
                        </Col>
                        <Col md={3} xs={4}>
                            <Button
                                bsStyle="default btn-fill"
                                block
                                onClick={this.handleApply}
                            >
                                Apply
                            </Button>
                        </Col>
                    </Row>
                </form>
            </div>
        )
    }
}

export default EmbedUrl;
