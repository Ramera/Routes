import React from "react";

class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: ""
    };
  }

  handleInputChange = event => {
    this.setState({
      input: event.target.value
    });
  };

  handleInputSubmit = event => {
    event.preventDefault();
    this.props.addPoint(this.state.input);
    this.setState({
      input: ""
    });
  };

  render() {
    return (
      <form onSubmit={this.handleInputSubmit} className="input-form">
        <input
          placeholder="Enter a new point name"
          type="text"
          value={this.state.input}
          onChange={this.handleInputChange}
        />
      </form>
    );
  }
}

export default Input;
