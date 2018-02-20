import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import ReactDOM from 'react-dom';

//TODO: change default map location from sf to UCD

class Maps extends Component{
    render() {
        const style = {
            width: '100vw',
            height: '150vh'
        }
        // if (!this.props.loaded) {
        //     return <div>Loading...</div>
        return (
            /*<div>Map will go here</div>*/
            <div style={style}>
                <Map google={this.props.google} />
            </div>
        );
        // return (
        //     <div id="map">
        //         <Map
        //             style={{width: '100%', height: '100%', position: 'relative'}}
        //             google={this.props.google}
        //             initialCenter={{
        //               lat: 40.7484405,
        //               lng: -73.9856644
        //             }}
        //             zoom={13}
        //             clickableIcons={false}
        //         >
        //             <Marker onClick={this.onMarkerClick}
        //                 name={'Current location'}
        //             />
        //         </Map>
        //     </div>
        // );
    }
}

export class Map2 extends React.Component {
    componentDidMap() {
        this.loadMap();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
    }

    loadMap() {
        if (this.props && this.props.google) {
            const {google} = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);

            let zoom = 14;
            let lat = 38.5477362;
            let lng = -121.7697666;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign({}, {
                center: center,
                zoom: zoom
            })
            this.map = new maps.Map(node, mapConfig);
        }

    }
    render() {
        return (
            <div ref='map'>
                Loading maps...
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyCABZKEStT0T0jHqvJnSJLJJ4tbUvD5sb0"
})(Maps)
