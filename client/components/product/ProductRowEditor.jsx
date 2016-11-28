import React from 'react';
import SubmitButton from '../SubmitButton.jsx';
import AddButton from '../AddButton.jsx';

function getState(){
	return {
			name: '',
			Npreisk: 1,
			cost: 1
		}	
}
const ProductRowEditor = React.createClass({
	getInitialState() {
		return getState();
	},
	handleNameChange(event){
		this.setState({ name: event.target.value });
	},
	handleNpreiskChange(event){
		this.setState({ Npreisk: event.target.value });
	},
	handleCostChange(event){
		this.setState({ cost: event.target.value });
	},
	handleProductAdd(){
		const newProduct = {
			name: this.state.name,
			Npreisk: this.state.Npreisk,
			cost: this.state.cost
		};
		this.props.onProductAdd(newProduct);
		this.setState({ name: '', Npreisk:0, cost: 0});
	},
	handleProductUpdate(){
		const updatedProduct = {
			id: this.props.product.id,
			name: this.state.name,
			Npreisk: this.state.Npreisk,
			cost: this.state.cost
		};
		this.props.onProductUpdate(updatedProduct);
		this.setState(getState);
	},
	handleInputs(){
		this.setState({
				name: this.props.product.name,
				Npreisk: this.props.product.Npreisk,
				cost: this.props.product.cost
			});
	},
	clearInputs(){
		this.setState(getState);
	},
	render(){
		return(
				<div>
					<input
						type="text"
						placeholder="name"
						value={this.state.name}
						onChange={this.handleNameChange}
					/>
					<input
						type="number"
						placeholder="Npreisk"
						value={this.state.Npreisk}
						min="1"
						onChange={this.handleNpreiskChange}
					/>
					<input
						type="number"
						placeholder="cost"
						value={this.state.cost}
						min="1"
						onChange={this.handleCostChange}
					/>
					{!this.props.shouldEdit ?
					<AddButton 
						disabled={!this.state.name}
						handleAdd={this.handleProductAdd}
						clear={this.clearInputs}
					/> :
                    <SubmitButton 
                     	onEditChange={this.handleInputs}
                     	onSubmit={this.handleProductUpdate}
                    />
                    }
                    <div>{this.props.error}</div>
				</div>
			);
	}
});

export default ProductRowEditor;