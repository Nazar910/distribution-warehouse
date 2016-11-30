import React from 'react';
import ClientRowEditor from './ClientRowEditor.jsx';
import ClientList from './ClientList.jsx';
import Store from '../../stores/Store.jsx';
import AppActions from '../../actions/AppActions';

function getStateFromFlux(){
	return {
		isLoading: Store.isLoading(),
		clients : Store.getClients(),
		edit: false,
		client: {},
		errors: ''
	};
}

const ClientPage = React.createClass({
	getInitialState() {
		return getStateFromFlux();
	},
	componentWillMount() {
        AppActions.loadClients();
    },
    componentDidMount() {
        Store.addChangeListener(this._onChange);
    },
    componentWillUnmount() {
        Store.removeChangeListener(this._onChange);
    },
    handleClientAdd(clientData){
   		AppActions.createClient(clientData);
   	},
   	handleClientDelete(client){
   		AppActions.deleteClient(client.id,this.errorStr);
   	},
   	handleEditChange(clientToEdit){
   		this.setState( { edit: !this.state.edit, client: clientToEdit } );
   	},
   	errorStr(str){
   		this.setState({ errors: str });
   	},
   	handleClientUpdate(clientData){
   		AppActions.updateClient(clientData,this.errorStr);
   		if(!this.state.errors)
   			this.setState(getStateFromFlux());
   	},
	render(){
		return(
				<div>
					<ClientRowEditor 
					 onClientAdd={this.handleClientAdd} 
					 shouldEdit={this.state.edit}
					 client={this.state.client}
					 onClientUpdate={this.handleClientUpdate}
					 error={this.state.errors}
					/>
					<ClientList
					 clients={this.state.clients} 
					 onClientDelete={this.handleClientDelete}
					 onEditChange={this.handleEditChange}
					/>
				</div>
			);
	},
	_onChange() {
        this.setState(getStateFromFlux());
    }
});

export default ClientPage;