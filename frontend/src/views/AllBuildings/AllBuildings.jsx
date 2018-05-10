import React, {Component} from 'react';
import Iframe from 'react-iframe';


class AllBuildings extends Component {
    render() {
        return (
            <div className="content">
                <Iframe
                    url="https://app.powerbi.com/view?r=eyJrIjoiMzNjM2QwYjItOTg4YS00OTM0LWFlNTEtNzFlYjg0NzgwZGNjIiwidCI6ImE4MDQ2ZjY0LTY2YzAtNGYwMC05MDQ2LWM4ZGFmOTJmZjYyYiIsImMiOjZ9&pageName=ReportSection"
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
