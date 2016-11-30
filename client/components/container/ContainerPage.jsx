import React from 'react';
import ContainerRowEditor from './ContainerRowEditor.jsx';
import ContainerList from './ContainerList.jsx';
import Store from '../../stores/Store.jsx';
import AppActions from '../../actions/AppActions';

function getStateFromFlux(){
	return {
		isLoading: Store.isLoading(),
		containers : Store.getContainers(),
		edit: false,
		container: {},
		errors: ''
	};
}

const ContainerPage = React.createClass({
	getInitialState() {
		return getStateFromFlux();
	},
	componentWillMount() {
        AppActions.loadContainers();
    },
    componentDidMount() {
        Store.addChangeListener(this._onChange);
    },
    componentWillUnmount() {
        Store.removeChangeListener(this._onChange);
    },
    handleContainerAdd(containerData){
   		AppActions.createContainer(containerData);
   	},
   	handleContainerDelete(container){
   		AppActions.deleteContainer(container.id,this.errorStr);
   	},
   	handleEditChange(containerToEdit){
   		this.setState( { edit: !this.state.edit, container: containerToEdit } );
   	},
   	errorStr(str){
   		this.setState({ errors: str });
   	},
   	handleContainerUpdate(containerData){
   		AppActions.updateContainer(containerData,this.errorStr);
   		if(!this.state.errors)
   			this.setState(getStateFromFlux());
   	},
	render(){
		return(
				<div>
					<ContainerRowEditor 
					 onContainerAdd={this.handleContainerAdd} 
					 shouldEdit={this.state.edit}
					 container={this.state.container}
					 onContainerUpdate={this.handleContainerUpdate}
					 error={this.state.errors}
					/>
					<ContainerList
					 containers={this.state.containers} 
					 onContainerDelete={this.handleContainerDelete}
					 onEditChange={this.handleEditChange}
					/>
				</div>
			);
	},
	_onChange() {
        this.setState(getStateFromFlux());
    }
});

export default ContainerPage;