import React from "react";

// Object wich will store Google Map
let googleMapObject;
// Object which will store Path (Google Polyline)
let googlePathObject;

class Map extends React.Component {
  componentDidMount() {
    // initialize the Map
    googleMapObject = new window.google.maps.Map(
      document.getElementById("map-container"),
      {
        center: { lat: 55.747825, lng: 37.63118 },
        zoom: 15
      }
    );

    // initialize an empty Path
    googlePathObject = new window.google.maps.Polyline({
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
      map: googleMapObject
    });
  }

  componentDidUpdate(prevProps) {
    // Identify and separate new points, based on the difference between props and prevProps
    const addedPoints = this.props.points.filter(
      point => !prevProps.points.includes(point)
    );

    // Identify and separate deleted points, based on the difference between prevProps and props
    const deletedPoints = prevProps.points.filter(
      id => !this.props.points.includes(id)
    );

    /* Adding new points. For each new point:
     * 1. Identify the current Map center
     * 2. Create a Google map Marker
     * 3. Add the listener for dragging, which will execute function to update coordinates
     * 4. Add the listener for click, which will create Infowindow with the marer name
     * 5. Store execute this.props.updatePoint, which will store Marker object and coordinates in App state
     */
    addedPoints.forEach(point => {
      const coordinates = googleMapObject.getCenter().toJSON();
      const markerObject = new window.google.maps.Marker({
        position: coordinates,
        map: googleMapObject,
        draggable: true,
        title: point.name,
        animation: window.google.maps.Animation.DROP
      });
      markerObject.addListener("dragend", () =>
        this.props.updatePoint(point.id, markerObject.getPosition().toJSON())
      );
      markerObject.addListener("click", () => {
        const infoWindow = new window.google.maps.InfoWindow({
          content: point.name
        });
        infoWindow.open(googleMapObject, markerObject);
      });
      this.props.updatePoint(point.id, coordinates, markerObject);
    });

    /* Deleting points. For each deleted point:
     * 1. Delete point related listeners
     * 2. Remove the Marker from the Map
     * 3. Delete Marker object
     */
    deletedPoints.forEach(point => {
      window.google.maps.event.clearInstanceListeners(point.markerObject);
      point.markerObject.setMap(null);
      point.markerObject = null;
    });

    // Updating Path. Create coordinates array, based on props. Update Google Polyline
    let pathCoordinates = [];
    for (let i = 0; i < this.props.points.length; i++) {
      pathCoordinates.push(this.props.points[i].coordinates);
    }
    googlePathObject.setPath(pathCoordinates);
  }

  render() {
    return <div id="map-container" />;
  }
}

export default Map;
