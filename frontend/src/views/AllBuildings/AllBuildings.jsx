import React, {Component} from 'react';
import Iframe from 'react-iframe';
import EmbedUrl from './EmbedUrl'
import {AllBuildingUrl} from '../../config'

class AllBuildings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: AllBuildingUrl,
        };

        this.embedURL = (url) => {
            this.setState({
               url: url,
            });
        };
    }

    render() {
        return (
            <div className="content">
                <div style={{marginBottom: '30px'}}>
                <EmbedUrl callback={this.embedURL} />
                </div>
                <Iframe
                    url={this.state.url}
                    width="100%"
                    height="800px"
                    className="embeded-page"
                    display="initial"
                    position="relative"
                    allowFullScreen/>
            </div>
        )
    }
}

export default AllBuildings;
