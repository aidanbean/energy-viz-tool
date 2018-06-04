import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

class Maps extends Component {
  render() {
    return (
      <div id="map">
        <Map
          style={{ width: "100vw", height: "100vh", position: "relative" }}
          google={this.props.google}
          initialCenter={{
            lat: 38.539592,
            lng: -121.755848
          }}
          zoom={18}
          clickableIcons={false}
        >
          <Marker onClick={this.onMarkerClick} name={"Current location"} />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCABZKEStT0T0jHqvJnSJLJJ4tbUvD5sb0"
})(Maps);
