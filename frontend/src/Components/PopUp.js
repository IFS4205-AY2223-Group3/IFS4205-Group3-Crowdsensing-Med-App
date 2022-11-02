import React from "react";

class PopUp extends React.Component {
  handleClick = () => {
    this.props.toggle();
  };

  render() {
    return (
      <div>
        <div className="modal_content">
          <p>{this.props.msg}</p>
          <button className="close_button" onClick={this.handleClick}>
            OK
          </button>
        </div>
      </div>
    );
  }
}
export default PopUp;
