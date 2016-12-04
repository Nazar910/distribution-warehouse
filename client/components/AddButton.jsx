import React from 'react';

const AddButton = React.createClass({
	componentDidMount() {
		this.props.clear();
	},
	onButtonClick(){
		this.props.handleAdd();
		this.props.closeModal();
	},
	render(){
		return(
				<button
				    onClick={this.onButtonClick}
                >
                        Add
                </button>
			);
	}
});

export default AddButton;