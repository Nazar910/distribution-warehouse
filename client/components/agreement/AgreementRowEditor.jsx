import React from 'react';
import SubmitButton from '../SubmitButton.jsx';
import AddButton from '../AddButton.jsx';
import Store from '../../stores/Store.jsx';
import '../Editor.less';

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
				creationDate:this.props.agreement.creationDate,
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
					<select value={this.state.client} onChange={this.handleSelectClient}>
						{
							this.props.clients.map(client=>
									<option
										key={client.id}
										value={client.id}
									>
										{client.lastName} {client.name}
									</option>
								)
						}
					</select>
					<input
						className="Date"
						type="date"
						placeholder="creationDate"
						value={reformatDate(this.state.creationDate)}
						onChange={this.handleCreationDateChange}
					/>
					<input
						type="number"
						placeholder="summary"
						value={this.state.summary}
						min="1"
						onChange={this.handleSummaryChange}
					/>
					{!this.props.shouldEdit ?
					<AddButton 
						disabled={!this.state.client}
						handleAdd={this.handleAgreementAdd}
						clear={this.clearInputs}
					/> :
                    <SubmitButton 
                     	onEditChange={this.handleInputs}
                     	onSubmit={this.handleAgreementUpdate}
                    />
                    }
                    <div>{this.props.error}</div>
				</div>
			);
	}
});
export default AgreementRowEditor;
function reformatDate(date){
	let d = date.split('T')[0];
	return d;
}
