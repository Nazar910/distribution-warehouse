import React from 'react';

const SubmitButton = React.createClass({
	componentDidMount() {
		this.props.onEditChange();
		console.log('Submit did mount');
	},
	render(){
		return(
				<button onClick={this.props.onSubmit}>
					Submit
				</button>
			);
	}
});
export default SubmitButton;