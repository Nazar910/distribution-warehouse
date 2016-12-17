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
                        {this.props.labels.button_add}
                </button>
			);
	}
});

export default AddButton;