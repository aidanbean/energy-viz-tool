import React, {Component} from 'react';
import Iframe from 'react-iframe';
import {FormInputs} from '../../components/FormInputs/FormInputs.jsx';
import {Col, Row, Button} from 'react-bootstrap';

class AllBuildings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: null,
        };

        this.embedURL = (url) => {
            this.setState({
               url: url,
            });
        };
    }


    render() {
        // if(this.state.url === null)
        //     return;

        return (
            <div className="content">
                <form>
                    <Row>
                    <FormInputs
                        ncols = {["col-md-9, col-xs-8"]}
                        proprieties = {[
                            {
                                type : "text",
                                bsClass : "form-control",
                                placeholder : "url",
                                defaultValue : "www.google.com"
                            }
                        ]}
                    />

                    <Col md={3} xs={4}>
                    <Button
                        bsStyle="default btn-fill"
                        block
                    >
                        Apply
                    </Button>
                    </Col>
                    </Row>
                </form>


                {/*<Iframe*/}
                    {/*url={this.state.url}*/}
                    {/*width="100%"*/}
                    {/*height="800px"*/}
                    {/*id="myId"*/}
                    {/*className="myClassname"*/}
                    {/*display="initial"*/}
                    {/*position="relative"*/}
                    {/*allowFullScreen/>*/}
            </div>
        )
    }
}

export default AllBuildings;
