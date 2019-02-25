import React from "react";
import { render } from "react-dom";
import Input from "./input.js";
import Points from "./points.js";
import Map from "./map.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      points: [],
      idCounter: 0
    };
  }

  // Add new point to the state and increment the counter
  addNewPoint = pointName => {
    const newPoint = { name: pointName, id: this.state.idCounter };
    this.setState(prevState => ({
      points: [...prevState.points, newPoint],
      idCounter: prevState.idCounter + 1
    }));
  };

  // Update or add information (coordinates or/and Google Marker Object) about an existing point.
  // Id is used for identification.
  updatePoint = (id, coordinates, markerObject) => {
    const index = this.state.points.findIndex(point => point.id === id);
    let tempPoints = this.state.points;
    if (markerObject) tempPoints[index].markerObject = markerObject;
    tempPoints[index].coordinates = coordinates;
    this.setState({
      points: tempPoints
    });
  };
  // Delete an existing point using point id.
  deletePoint = id => {
    const index = this.state.points.findIndex(point => point.id === id);
    let tempPoints = [
      ...this.state.points.slice(0, index),
      ...this.state.points.slice(index + 1)
    ];
    this.setState({
      points: tempPoints
    });
  };

  // Update the order of points.
  // order param - is an array of previos indexes
  changeOrder = order => {
    let reorderedPoints = order.map(index => this.state.points[index]);
    this.setState({
      points: reorderedPoints
    });
  };

  render() {
    return (
      <main className="main-container">
        <Input addPoint={this.addNewPoint} />
        <Points
          points={this.state.points}
          changeOrder={this.changeOrder}
          deletePoint={this.deletePoint}
        />
        <Map points={this.state.points} updatePoint={this.updatePoint} />
      </main>
    );
  }
}

render(<App />, document.getElementById("root"));
