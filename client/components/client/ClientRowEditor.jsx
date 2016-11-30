import React from 'react';
import SubmitButton from '../SubmitButton.jsx';
import AddButton from '../AddButton.jsx';
import '../Editor.less';

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
		this.setState(getState);
	},
	render(){
		return(
				<div>
					<input
						type="text"
						placeholder="Lastname"
						value={this.state.lastName}
						onChange={this.handleLastNameChange}
					/>
					<input
						type="text"
						placeholder="name"
						value={this.state.name}
						onChange={this.handleNameChange}
					/>
					<input
						type="text"
						placeholder="pob"
						value={this.state.pob}
						onChange={this.handlePobChange}
					/>
					<input
						type="number"
						placeholder="Rasch_sch"
						value={this.state.rasch_sch}
						min="1"
						onChange={this.handleRaschSchChange}
					/>
					<input
						type="number"
						placeholder="mfo"
						value={this.state.mfo}
						min="1"
						onChange={this.handleMfoChange}
					/>
					<input
						type="address"
						placeholder="address"
						value={this.state.address}
						onChange={this.handleAddressChange}
					/>
					{!this.props.shouldEdit ?
					<AddButton 
						disabled={!this.state.name}
						handleAdd={this.handleClientAdd}
						clear={this.clearInputs}
					/> :
                    <SubmitButton 
                     	onEditChange={this.handleInputs}
                     	onSubmit={this.handleClientUpdate}
                    />
                    }
                    <div>{this.props.error}</div>
				</div>
			);
	}
});

export default ClientRowEditor;