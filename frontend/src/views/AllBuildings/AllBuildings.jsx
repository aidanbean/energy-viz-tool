import React, {Component} from 'react';
import Iframe from 'react-iframe';
import {FormInputs} from '../../components/FormInputs/FormInputs.jsx';
import {Col, Row, Button} from 'react-bootstrap';
import EmbedUrl from './EmbedUrl'

class AllBuildings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "https://app.powerbi.com/view?r=eyJrIjoiMzNjM2QwYjItOTg4YS00OTM0LWFlNTEtNzFlYjg0NzgwZGNjIiwidCI6ImE4MDQ2ZjY0LTY2YzAtNGYwMC05MDQ2LWM4ZGFmOTJmZjYyYiIsImMiOjZ9&pageName=ReportSection",
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
                <EmbedUrl callback={this.embedURL} />
                <Iframe
                    url={this.state.url}
                    width="100%"
                    height="800px"
                    id="myId"
                    className="myClassname"
                    display="initial"
                    position="relative"
                    allowFullScreen/>
            </div>
        )
    }
}

export default AllBuildings;
