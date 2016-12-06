import React from 'react';
import SubmitButton from '../SubmitButton.jsx';
import AddButton from '../AddButton.jsx';
import Store from '../../stores/Store.jsx';
import '../Editor.less';
import Modal from 'react-modal';
import customStyles from '../ModalStyles.js';

function getState(){
	return {
		client:1,
		creationDate:'2016-01-01',
		summary:0
	}	
}
const AgreementRowEditor = React.createClass({
	getInitialState() {
		return getState();
	},
	handleClientChange(event){
		this.setState({ client: event.target.value });
	},
	handleCreationDateChange(event){
		this.setState({ creationDate: event.target.value });
	},
	handleSummaryChange(event){
		this.setState({ summary: event.target.value });
	},
	handleAgreementAdd(){
		const newAgreement = {
			client:this.state.client,
			creationDate:this.state.creationDate,
			summary:this.state.summary
		};
		this.props.onAgreementAdd(newAgreement);
		this.setState(getState());
	},
	handleAgreementUpdate(){
		const updatedAgreement = {
			id: this.props.agreement.id,
			client:this.state.client,
			creationDate:this.state.creationDate,
			summary:this.state.summary
		};
		console.log(updatedAgreement);
		this.props.onAgreementUpdate(updatedAgreement);
		this.setState(getState);
	},
	handleInputs(){
		this.setState({
			client:this.props.agreement.client,
			creationDate:reformatDate(this.props.agreement.creationDate),
			summary:this.props.agreement.summary
		});
	},
	clearInputs(){
		this.setState(getState);
	},
	handleSelectClient(event){
		this.setState({ client: event.target.value })
		console.log(event.target.value);
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
			<div className="Labels">{this.props.labels.clientId}</div>
			<div className="Labels">{this.props.labels.creationDate}</div>
			<div className="Labels">{this.props.labels.summ}</div>
			</div>
			<div className="Info">
			<div><select value={this.state.client}>
			{
				this.props.clients.map(client=>
					<option key={client.id}>
					{client.lastName} {client.name}
					</option>
					)
			}
			</select></div>
			<div><input
			type="date"
			placeholder={this.props.labels.creationDate}
			value={this.state.creationDate}
			onChange={this.handlePobChange}
			/></div>
			<div><input
			type="number"
			placeholder={this.props.labels.summ}
			value={this.state.summary}
			min="1"
			onChange={this.handleRaschSchChange}
			/></div></div>
			{!this.props.shouldEdit ?
				<AddButton 
				handleAdd={this.handleAgreementAdd}
				clear={this.clearInputs}
				/> :
				<SubmitButton 
				onEditChange={this.handleInputs}
				onSubmit={this.handleAgreementUpdate}
				/>
			}
			<div>{this.props.error}</div>
			</Modal>
			</div>
			);
	}
});


export default AgreementRowEditor;
function reformatDate(date){
	let d = date.split('T')[0];
	return d;
}
