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
					Submit
				</button>
			);
	}
});
export default SubmitButton;