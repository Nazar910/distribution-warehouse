import React from 'react';
import AgreementRowEditor from './AgreementRowEditor.jsx';
import AgreementList from './AgreementList.jsx';
import Store from '../../stores/Store.jsx';
import AppActions from '../../actions/AppActions';

function getStateFromFlux(){
	return {
		isLoading: Store.isLoading(),
		agreements : Store.getAgreements(),
		edit: false,
		agreement: {},
		errors: '',
		clients: Store.getClients()
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
   	},
   	handleAgreementDelete(agreement){
   		AppActions.deleteAgreement(agreement.id,this.errorStr);
   	},
   	handleEditChange(agreementToEdit){
   		this.setState( { edit: !this.state.edit, agreement: agreementToEdit } );
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
					/>
					<AgreementList
					 agreements={this.state.agreements} 
					 onAgreementDelete={this.handleAgreementDelete}
					 onEditChange={this.handleEditChange}
					 clients={this.state.clients}
					/>
				</div>
			);
	},
	_onChange() {
        this.setState(getStateFromFlux());
    }
});
function reformatDate(date){
    let d = date.split('.');
    return (d[2]+'-'+d[1]+'-'+d[0]);
}


export default AgreementPage;