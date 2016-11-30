import React from 'react';
import TransportKindRowEditor from './TransportKindRowEditor.jsx';
import TransportKindList from './TransportKindList.jsx';
import Store from '../../stores/Store.jsx';
import AppActions from '../../actions/AppActions';

function getStateFromFlux(){
	return {
		isLoading: Store.isLoading(),
		transportKinds : Store.getTransportKinds(),
		edit: false,
		transportKind: {},
		errors: ''
	};
}

const TransportKindPage = React.createClass({
	getInitialState() {
		return getStateFromFlux();
	},
	componentWillMount() {
        AppActions.loadTransportKinds();
    },
    componentDidMount() {
        Store.addChangeListener(this._onChange);
    },
    componentWillUnmount() {
        Store.removeChangeListener(this._onChange);
    },
    handleTransportKindAdd(transportKindData){
   		AppActions.createTransportKind(transportKindData);
   	},
   	handleTransportKindDelete(transportKind){
   		AppActions.deleteTransportKind(transportKind.id,this.errorStr);
   	},
   	handleEditChange(transportKindToEdit){
   		this.setState( { edit: !this.state.edit, transportKind: transportKindToEdit } );
   	},
   	errorStr(str){
   		this.setState({ errors: str });
   	},
   	handleTransportKindUpdate(transportKindData){
   		AppActions.updateTransportKind(transportKindData,this.errorStr);
   		if(!this.state.errors)
   			this.setState(getStateFromFlux());
   	},
	render(){
		return(
				<div>
					<TransportKindRowEditor 
					 onTransportKindAdd={this.handleTransportKindAdd} 
					 shouldEdit={this.state.edit}
					 transportKind={this.state.transportKind}
					 onTransportKindUpdate={this.handleTransportKindUpdate}
					 error={this.state.errors}
					/>
					<TransportKindList
					 transportKinds={this.state.transportKinds} 
					 onTransportKindDelete={this.handleTransportKindDelete}
					 onEditChange={this.handleEditChange}
					/>
				</div>
			);
	},
	_onChange() {
        this.setState(getStateFromFlux());
    }
});

export default TransportKindPage;