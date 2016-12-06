import React from 'react';
import AgreementRowEditor from './AgreementRowEditor.jsx';
import AgreementList from './AgreementList.jsx';
import Store from '../../stores/Store.jsx';
import AppActions from '../../actions/AppActions';
import Modal from 'react-modal';
import '../Page.less';
import * as InsertionSort from '../../InsertionSort.js';

function getStateFromFlux(){
	return {
		isLoading: Store.isLoading(),
		agreements : Store.getAgreements(),
		agreementsQuery: [],
		edit: false,
		agreement: {},
		errors: '',
		clients: Store.getClients(),
		modalIsOpen: false,
		searchKind: '',
		sortVector: ''
	};
}

const AgreementPage = React.createClass({
	getInitialState() {
		return getStateFromFlux();
	},
	componentWillMount() {
		AppActions.loadAgreements();
		AppActions.loadClients();
	},
	componentDidMount() {
		Store.addChangeListener(this._onChange);
	},
	componentWillUnmount() {
		Store.removeChangeListener(this._onChange);
	},
	handleAgreementAdd(agreementData){
		agreementData.creationDate = reformatDate(agreementData.creationDate);
		AppActions.createAgreement(agreementData);
		let interval = setInterval(()=>{
			this.handleFilter();
			clearInterval(interval);
		},100);
	},
	handleAgreementDelete(agreement){
		AppActions.deleteAgreement(agreement.id,this.errorStr);		
		let interval = setInterval(()=>{
			this.handleFilter();
			clearInterval(interval);
		},100);
	},
	handleEditChange(agreementToEdit){
		this.setState( { edit: !this.state.edit, agreement: agreementToEdit } );
		if(!this.state.edit) this.openModal();
	},
	errorStr(str){
		this.setState({ errors: str });
	},
	handleAgreementUpdate(agreementData){
		console.log(agreementData);
   		// agreementData.creationDate = reformatDate(agreementData.creationDate);
   		AppActions.updateAgreement(agreementData,this.errorStr);
   		if(!this.state.errors)
   			this.setState(getStateFromFlux());  		
   		let interval = setInterval(()=>{
   			this.handleFilter();
   			clearInterval(interval);
   		},100);
   	},
   	handleFilter(){
   		let searchId,searchClientId,searchCreationDateFrom,searchCreationDateTo,searchSummary;
   		try{
   			searchId = this.refs.id.value;
   			searchCreationDateFrom = this.refs.creationDateFrom.value; 
   			searchCreationDateTo = this.refs.creationDateTo.value; 
   			searchSummary = this.refs.summ.value;
   		}
   		catch(err){
   			searchId = '';
   			searchCreationDateFrom = ''; 
   			searchCreationDateTo = ''; 
   			searchSummary = '';
   		}
   		console.log(searchCreationDateFrom);
   		console.log(searchCreationDateTo);
   		try{
   			searchClientId = this.refs.clientId.value;
   		}
   		catch(err){
   			searchClientId = '';
   		}
   		let newAgreements = this.state.agreements.filter(function(el){
   			let searchQueryId = ''+el.id,
   			searchQueryClientId = ''+el.client,
   			searchQueryCreationDate = ''+el.creationDate,
   			searchQuerySummary = ''+el.summary;
   			return searchQueryId.startsWith(searchId) &&
   			searchQueryClientId.startsWith(searchClientId) &&
   			(searchQueryCreationDate >= searchCreationDateFrom
   				|| searchCreationDateFrom == "") &&
   			(searchQueryCreationDate <= searchCreationDateTo
   				|| searchCreationDateTo == "") &&
   			searchQuerySummary.startsWith(searchSummary);
   		});
   		this.setState({ agreementsQuery: newAgreements });
   	},
   	openModal(){
   		this.setState({ modalIsOpen: true });
   	},
   	closeModal(){
   		this.setState({ modalIsOpen: false, edit: false });
   	},
   	afterOpen(){
   		console.log('modal is opened');
   	},
   	handleSearchChange(event){
   		this.setState({ searchKind: event.target.value });
   	},
   	handleSortChange(){
   		let field;
   		switch(this.refs.sortBy.value){
   			case this.props.labels.id:{
   				field='id';
   				break;
   			}
   			case this.props.labels.creationDate:{
   				field='creationDate';
   				break;
   			}
   			case this.props.labels.summ:{
   				field='summary';
   				break;
   			}
   		}
   		let newAgreementsQuery = this.state.agreementsQuery;
   		switch(this.state.sortVector){
   			case this.props.labels.normal:{
   				InsertionSort.sort(newAgreementsQuery,field);
   				break;
   			}
   			case this.props.labels.reverse:{
   				InsertionSort.sortReverse(newAgreementsQuery,field);
   				break;
   			}
   		}
   		this.setState({ agreementsQuery: newAgreementsQuery });
   	},
   	handleSortVectorChange(){
   		this.setState({ sortVector: this.refs.sortVector.value });
   		var interval = setInterval(()=>{
   			this.handleSortChange();
   			clearInterval(interval);
   		}
   		,50);
   	},
   	render(){
   		return(
   			<div>
   			<AgreementRowEditor 
   			onAgreementAdd={this.handleAgreementAdd} 
   			shouldEdit={this.state.edit}
   			agreement={this.state.agreement}
   			onAgreementUpdate={this.handleAgreementUpdate}
   			error={this.state.errors}
   			clients={this.state.clients}
   			modalIsOpen={this.state.modalIsOpen}
   			openModal={this.openModal}
   			closeModal={this.closeModal}
   			afterOpen={this.afterOpen}
   			labels={this.props.labels}
   			/>
   			<div className="Search">
   			<select onChange={this.handleSearchChange}>
   			<option>{this.props.labels.searchClientId}</option>
   			<option>{this.props.labels.deepSearch}</option>
   			</select>
   			{ this.state.searchKind == this.props.labels.deepSearch ?
   				<div>
   				<table>
   				<tbody>
   				<tr>
   				<td>{this.props.labels.id}</td>
   				<td><input 
   				type="number" 
   				placeholder={this.props.labels.id} 
   				ref="id" 
   				onChange={this.handleFilter}
   				/></td>
   				</tr>
   				<tr>
   				<td>{this.props.labels.clientId}</td>
   				<td><select ref="clientId" onChange={this.handleFilter}>
   				<option value=""> - </option>
   				{
   					this.state.clients.map(client=>
   						<option key={client.id} value={client.id}>
   						{client.lastName} {client.name}
   						</option>)
   				}
   				</select></td>
   				</tr>
   				<tr>
   				<td>{this.props.labels.creationDate}</td>
   				<td><input 
   				type="date" 
   				placeholder={this.props.labels.creationDate} 
   				ref="creationDateFrom" 
   				onChange={this.handleFilter}
   				/><br/>
   				<input 
   				type="date" 
   				placeholder={this.props.labels.creationDate} 
   				ref="creationDateTo" 
   				onChange={this.handleFilter}
   				/></td>
   				</tr>
   				<tr>
   				<td>{this.props.labels.summ}</td>
   				<td><input 
   				type="number" 
   				placeholder={this.props.labels.summ} 
   				ref="summ" 
   				onChange={this.handleFilter}
   				/></td>
   				</tr>
   				</tbody>
   				</table>
   				</div> :
   				<select ref="clientId" onChange={this.handleFilter}>
   				<option value=""> - </option>
   				{
   					this.state.clients.map(client=>
   						<option key={client.id} value={client.id}>
   						{client.lastName} {client.name}
   						</option>)
   				}
   				</select>
   			}
   			</div>
   			<div className="Sort">
   			<span>{this.props.labels.sortBy}&nbsp;</span>
   			<select ref="sortBy" onChange={this.handleSortChange}>
   			<option>{this.props.labels.id}</option>
   			<option>{this.props.labels.creationDate}</option>
   			<option>{this.props.labels.summ}</option>
   			</select><br/>
   			<select ref="sortVector" className="Vector" onChange={this.handleSortVectorChange}>
   			<option>{this.props.labels.normal}</option>
   			<option>{this.props.labels.reverse}</option>
   			</select>
   			</div>
   			<AgreementList
   			agreements={this.state.agreementsQuery} 
   			onAgreementDelete={this.handleAgreementDelete}
   			onEditChange={this.handleEditChange}
   			clients={this.state.clients}
   			labels={this.props.labels}
   			/>
   			<div className="Add" onClick={this.openModal}> + </div>
   			</div>
   			);
   	},
   	_onChange() {
   		this.setState(getStateFromFlux());
   		this.setState({ 
   			agreementsQuery: this.state.agreements,
   			searchKind: this.props.labels.searchClientId,
   			sortVector: this.props.labels.normal 
   		});
   	}
   });
function reformatDate(date){
	let d = date.split('.');
	return (d[2]+'-'+d[1]+'-'+d[0]);
}


export default AgreementPage;