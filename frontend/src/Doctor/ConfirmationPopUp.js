import React from "react";
import styles from "./Examine.module.css"

class ConfirmationPopUp extends React.Component {
	render() {
		return(
			<div>
				<div className="modal_content">
					<p>Prescription: {this.props.prescription}</p>
					<p>Code: {this.props.code}</p>
					<button className={styles.back_button} onClick={this.props.closePopUp}>Cancel</button>
					<button className="close_button" onClick={this.props.readyToSend}>Confirm</button>
				 </div>
			</div>
		);
	}
}
export default ConfirmationPopUp;
