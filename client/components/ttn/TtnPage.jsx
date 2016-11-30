import React from 'react';
import TtnRowEditor from './TtnRowEditor.jsx';
import TtnList from './TtnList.jsx';
import Store from '../../stores/Store.jsx';
import AppActions from '../../actions/AppActions';

function getStateFromFlux(){
	return {
		isLoading: Store.isLoading(),
		ttns : Store.getTtns(),
		edit: false,
		ttn: {},
		errors: '',
		products: Store.getProducts(),
		agreements: Store.getAgreements(),
		containers: Store.getContainers(),
		transportKinds: Store.getTransportKinds()
	};
}

const TtnPage = React.createClass({
	getInitialState() {
		return getStateFromFlux();
	},
	componentWillMount() {
        AppActions.loadAgreements();
        AppActions.loadTtns();
        AppActions.loadProducts();
        AppActions.loadContainers();
        AppActions.loadTransportKinds();
    },
    componentDidMount() {
        Store.addChangeListener(this._onChange);
    },
    componentWillUnmount() {
        Store.removeChangeListener(this._onChange);
    },
    handleTtnAdd(ttnData){
   		AppActions.createTtn(ttnData);
   	},
   	handleTtnDelete(ttn){
   		AppActions.deleteTtn(ttn.id,this.errorStr);
   	},
   	handleEditChange(ttnToEdit){
   		this.setState( { edit: !this.state.edit, ttn: ttnToEdit } );
   	},
   	errorStr(str){
   		this.setState({ errors: str });
   	},
   	handleTtnUpdate(ttnData){
   		AppActions.updateTtn(ttnData,this.errorStr);
   		if(!this.state.errors)
   			this.setState(getStateFromFlux());
   	},
	render(){
		return(
				<div>
					<TtnRowEditor 
					 onTtnAdd={this.handleTtnAdd} 
					 shouldEdit={this.state.edit}
					 ttn={this.state.ttn}
					 onTtnUpdate={this.handleTtnUpdate}
					 error={this.state.errors}
					 products={this.state.products}
					 agreements={this.state.agreements}
					 containers={this.state.containers}
					 transportKinds={this.state.transportKinds}
					/>
					<TtnList
					 ttns={this.state.ttns} 
					 onTtnDelete={this.handleTtnDelete}
					 onEditChange={this.handleEditChange}
					 products={this.state.products}
					 agreements={this.state.agreements}
					 containers={this.state.containers}
					 transportKinds={this.state.transportKinds}
					/>
				</div>
			);
	},
	_onChange() {
        this.setState(getStateFromFlux());
    }
});


export default TtnPage;