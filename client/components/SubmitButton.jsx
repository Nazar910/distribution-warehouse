import React from 'react';

const SubmitButton = React.createClass({
	componentWillMount() {
		this.props.onEditChange();
	},
	onButtonClick(){
		this.props.onSubmit();
		this.props.closeModal();
	},
	render(){
		return(
				<button onClick={this.onButtonClick}>
					{this.props.labels.button_submit}
				</button>
			);
	}
});
export default SubmitButton;