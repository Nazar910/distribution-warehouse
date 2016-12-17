import React from 'react';
import Modal from 'react-modal';
import SubmitButton from '../SubmitButton.jsx';
import AddButton from '../AddButton.jsx';
import '../Editor.less';
import customStyles from '../ModalStyles.js';

function getState(){
	return {
		lastName: '',
		name:'',
		pob:'',
		rasch_sch:1,
		mfo:1,
		address:''
	}	
}

const ClientRowEditor = React.createClass({
	getInitialState() {
		return getState();
	},
	handleLastNameChange(event){
		this.setState({ lastName: event.target.value });
	},
	handleNameChange(event){
		this.setState({ name: event.target.value });
	},
	handlePobChange(event){
		this.setState({ pob: event.target.value });
	},
	handleRaschSchChange(event){
		this.setState({ rasch_sch: event.target.value });
	},
	handleMfoChange(event){
		this.setState({ mfo: event.target.value });
	},
	handleAddressChange(event){
		this.setState({ address: event.target.value });
	},
	handleClientAdd(){
		const newClient = {
			lastName:this.state.lastName,
			name:this.state.name,
			pob:this.state.pob,
			rasch_sch:this.state.rasch_sch,
			mfo:this.state.mfo,
			address:this.state.address
		};
		this.props.onClientAdd(newClient);
		this.setState(getState());
	},
	handleClientUpdate(){
		const updatedClient = {
			id: this.props.client.id,
			lastName: this.state.lastName,
			name:this.state.name,
			pob:this.state.pob,
			rasch_sch:this.state.rasch_sch,
			mfo:this.state.mfo,
			address:this.state.address
		};
		this.props.onClientUpdate(updatedClient);
		this.setState(getState);
	},
	handleInputs(){
		this.setState({
			lastName:this.props.client.lastName,
			name:this.props.client.name,
			pob:this.props.client.pob,
			rasch_sch:this.props.client.rasch_sch,
			mfo:this.props.client.mfo,
			address:this.props.client.address
		});
	},
	clearInputs(){
		this.setState({ lastName: '',
			name:'',
			pob:'',
			rasch_sch:1,
			mfo:1,
			address:'' });
	},
	render(){
		return(
			<div> 
			<Modal
			isOpen={this.props.modalIsOpen}
			onAfterOpen={this.props.afterOpen}
			onRequestClose={this.props.closeModal}
			contentLabel='Example '
			style={customStyles}
			>
			<span className="Close" onClick={this.props.closeModal}> x </span>
			<div className="Info">
			<div className="Labels">{this.props.labels.lastName}</div>
			<div className="Labels">{this.props.labels.name}</div>
			<div className="Labels">{this.props.labels.pob}</div>
			<div className="Labels">{this.props.labels.rasch_sch}</div>
			<div className="Labels">{this.props.labels.mfo}</div>
			<div className="Labels">{this.props.labels.address}</div>
			</div>
			<div className="Info">
			<div><input
			type="text"
			placeholder={this.props.labels.lastName}
			value={this.state.lastName}
			onChange={this.handleLastNameChange}
			/></div>
			<div><input
			type="text"
			placeholder={this.props.labels.name}
			value={this.state.name}
			onChange={this.handleNameChange}
			/></div>
			<div><input
			type="text"
			placeholder={this.props.labels.pob}
			value={this.state.pob}
			onChange={this.handlePobChange}
			/></div>
			<div><input
			type="number"
			placeholder={this.props.labels.rasch_sch}
			value={this.state.rasch_sch}
			min="1"
			onChange={this.handleRaschSchChange}
			/></div>
			<div><input
			type="number"
			placeholder={this.props.labels.mfo}
			value={this.state.mfo}
			min="1"
			onChange={this.handleMfoChange}
			/></div>
			<div><input
			type="address"
			placeholder={this.props.labels.address}
			value={this.state.address}
			onChange={this.handleAddressChange}
			/></div></div>
			{!this.props.shouldEdit ?
				<AddButton
				handleAdd={this.handleClientAdd}
				clear={this.clearInputs}
				closeModal={this.props.closeModal}
				labels={this.props.labels}
				/> :
				<SubmitButton
				onEditChange={this.handleInputs}
				onSubmit={this.handleClientUpdate}
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

export default ClientRowEditor;