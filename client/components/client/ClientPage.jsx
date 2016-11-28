import React from 'react';
import ClientRowEditor from './ClientRowEditor.jsx';
import ClientList from './ClientList.jsx';
import Store from '../../stores/Store.jsx';
import AppActions from '../../actions/AppActions';

function getStateFromFlux(){
	return {
		isLoading: Store.isLoading(),
		clients : Store.getClients(),
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
	render(){
		return(
				<div>
					<ClientRowEditor />
					<ClientList clients={this.state.clients}/>
				</div>
			);
	},
	_onChange() {
        this.setState(getStateFromFlux());
    }
});

export default ClientPage;