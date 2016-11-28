import React from 'react';

const AddButton = React.createClass({
	componentDidMount() {
		this.props.clear();
		console.log('Add button did mount');
	},
	render(){
		return(
				<button
					disabled={this.props.disabled}
				    onClick={this.props.handleAdd}
                >
                        Add
                </button>
			);
	}
});

export default AddButton;