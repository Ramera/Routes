import React from "react";
import Sortable from "react-sortablejs";

class Points extends React.Component {
  render() {
    const pointsList = this.props.points.map((point, index) => (
      <li key={point.id} data-id={index} className="list-item">
        <svg height="10" width="15" className="dragging-sign-svg">
          <line x1="0" y1="1" x2="15" y2="1" stroke="grey" strokeWidth="2" />
          <line x1="0" y1="5" x2="15" y2="5" stroke="grey" strokeWidth="2" />
          <line x1="0" y1="9" x2="15" y2="9" stroke="grey" strokeWidth="2" />
        </svg>
        <div className="point-item-text">{point.name}</div>
        <button
          className="delete-line-button"
          onClick={() => this.props.deletePoint(point.id)}
        >
          <svg height="10" width="10" className="delete-sign-svg">
            <line x1="0" y1="0" x2="10" y2="10" stroke="grey" strokeWidth="2" />
            <line x1="0" y1="10" x2="10" y2="0" stroke="grey" strokeWidth="2" />
          </svg>
        </button>
      </li>
    ));
    return (
      <div className="points-container">
        <h2>Points</h2>
        <Sortable
          options={{ animation: 150, ghostClass: "blue-background-class" }}
          tag="ul"
          onChange={order => {
            this.props.changeOrder(order);
          }}
        >
          {pointsList}
        </Sortable>
      </div>
    );
  }
}

export default Points;
