import React from 'react';
import SubmitButton from '../SubmitButton.jsx';
import AddButton from '../AddButton.jsx';
import '../Editor.less';
import customStyles from '../ModalStyles.js';
import Modal from 'react-modal';

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
		this.setState(getState());
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
			<Modal
			isOpen={this.props.modalIsOpen}
			onAfterOpen={this.props.afterOpen}
			onRequestClose={this.props.closeModal}
			style={customStyles}
			>
			<span className="Close" onClick={this.props.closeModal}> x </span>
			<div className="Info">
			<div className="Labels">{this.props.labels.title}</div>
			<div className="Labels">{this.props.labels.Npreisk}</div>
			<div className="Labels">{this.props.labels.cost}</div>
			</div>
			<div className="Info">
			<div><input
			type="text"
			placeholder={this.props.labels.title}
			value={this.state.name}
			onChange={this.handleNameChange}
			/></div>
			<div><input
			type="text"
			placeholder={this.props.labels.Npreisk}
			value={this.state.Npreisk}
			onChange={this.handleNpreiskChange}
			/></div>
			<div><input
			type="number"
			placeholder={this.props.labels.cost}
			value={this.state.cost}
			min="1"
			onChange={this.handleCostChange}
			/></div></div>
			{!this.props.shouldEdit ?
				<AddButton
				handleAdd={this.handleProductAdd}
				clear={this.clearInputs}
				closeModal={this.props.closeModal}
				labels={this.props.labels}
				/> :
				<SubmitButton
				onEditChange={this.handleInputs}
				onSubmit={this.handleProductUpdate}
				closeModal={this.props.closeModal}
				labels={this.props.labels}
				/>
			}
			<div>{this.props.error}</div>
			</Modal>       
			</div>
			);
	}
});

export default ProductRowEditor;