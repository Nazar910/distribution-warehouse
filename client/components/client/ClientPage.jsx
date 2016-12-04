import React from 'react';
import ClientRowEditor from './ClientRowEditor.jsx';
import ClientList from './ClientList.jsx';
import Store from '../../stores/Store.jsx';
import AppActions from '../../actions/AppActions';
import Modal from 'react-modal';
import '../AddElement.less';

function getStateFromFlux(){
	return {
		isLoading: Store.isLoading(),
		clients : Store.getClients(),
		clientsQuery: [],
		edit: false,
		client: {},
		errors: '',
    modalIsOpen: false,
    searchKind: ''
	};
}
const ClientPage = React.createClass({
	getInitialState() {
		return getStateFromFlux();
	},
	componentWillMount() {
        AppActions.loadClients();
        this.setState({ searchKind: this.props.labels.searchLastName })
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
      if(!this.state.edit) this.openModal();
  },
   errorStr(str){
   	this.setState({ errors: str });
  },
  handleClientUpdate(clientData){
  	AppActions.updateClient(clientData,this.errorStr);
   	if(!this.state.errors)
   		this.setState(getStateFromFlux());
  },
  handleFilter(){
    console.log('filter');
    let searchName,searchLastName,searchPob,searchRaschSch,searchMfo,searchAddress;
    try{
   	  searchName = this.refs.name.value.toLowerCase();
      searchPob = this.refs.pob.value.toLowerCase();
      searchRaschSch = this.refs.rasch_sch.value.toLowerCase();  
      searchMfo = this.refs.mfo.value.toLowerCase();
      searchAddress = this.refs.address.value.toLowerCase();
    }
    catch(err){
      searchName = '';
      searchPob = '';
      searchRaschSch = '';
      searchMfo = '';
      searchAddress = '';
    }
    try{
      searchLastName = this.refs.lastName.value.toLowerCase();
    }
    catch(err){
      searchLastName = '';
    }
   	let newClients = this.state.clients.filter(function(el){
   		let searchQueryName = el.name.toLowerCase(),
          searchQueryLastName = el.lastName.toLowerCase(),
          searchQueryPob = el.pob.toLowerCase(),
          searchQueryRaschSch = ''+el.rasch_sch,
          searchQueryMfo = ''+el.mfo,
          searchQueryAddress = el.address.toLowerCase();
   		return searchQueryName.indexOf(searchName) !== -1 &&
              searchQueryLastName.indexOf(searchLastName) !== -1 &&
              searchQueryPob.indexOf(searchPob) !== -1 &&
              searchQueryRaschSch.indexOf(searchRaschSch) !== -1 &&
              searchQueryMfo.indexOf(searchMfo) !== -1 &&
              searchQueryAddress.indexOf(searchAddress) !== -1;
   	});
   	this.setState({ clientsQuery: newClients });
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
	render(){
		return(
				<div>
					<ClientRowEditor 
					 onClientAdd={this.handleClientAdd} 
					 shouldEdit={this.state.edit}
					 client={this.state.client}
					 onClientUpdate={this.handleClientUpdate}
					 error={this.state.errors}
           modalIsOpen={this.state.modalIsOpen}
           openModal={this.openModal}
           closeModal={this.closeModal}
           afterOpen={this.afterOpen}
           labels={this.props.labels}
					/>
					<select onChange={this.handleSearchChange}>
            <option>{this.props.labels.searchLastName}</option>
            <option>{this.props.labels.deepSearch}</option>
          </select>
          { this.state.searchKind == this.props.labels.deepSearch ?
            <div>
            <table>
            <tbody>
            <tr>
              <td>{this.props.labels.lastName}</td>
              <td><input 
                type="text" 
                placeholder={this.props.labels.lastName} 
                ref="lastName" 
                onChange={this.handleFilter}
              /></td>
            </tr>
            <tr>
              <td>{this.props.labels.name}</td>
              <td><input 
                type="text" 
                placeholder={this.props.labels.name} 
                ref="name" 
                onChange={this.handleFilter}
              /></td>
            </tr>
            <tr>
              <td>{this.props.labels.pob}</td>
              <td><input 
                type="text" 
                placeholder={this.props.labels.pob} 
                ref="pob" 
                onChange={this.handleFilter}
              /></td>
            </tr>
            <tr>
              <td>{this.props.labels.rasch_sch}</td>
              <td><input 
                type="text" 
                placeholder={this.props.labels.rasch_sch} 
                ref="rasch_sch" 
                onChange={this.handleFilter}
              /></td>
            </tr>
            <tr>
              <td>{this.props.labels.mfo}</td>
              <td><input 
                type="text" 
                placeholder={this.props.labels.mfo} 
                ref="mfo" 
                onChange={this.handleFilter}
              /></td>
            </tr>
            <tr>
              <td>{this.props.labels.address}</td>
              <td><input 
                type="text" 
                placeholder={this.props.labels.address} 
                ref="address" 
                onChange={this.handleFilter}
              /></td>
            </tr>
            </tbody>
            </table>
            </div> :
            <input 
            type="text" 
            placeholder={this.props.labels.lastName} 
            ref="lastName" 
            onChange={this.handleFilter}
            />

          }
					<ClientList
					 clients={this.state.clientsQuery} 
					 onClientDelete={this.handleClientDelete}
					 onEditChange={this.handleEditChange}
           labels={this.props.labels}
					/>
          <div className="Add" onClick={this.openModal}> + </div>
				</div>
			);
	},
	_onChange() {
        this.setState(getStateFromFlux());
        this.setState({ clientsQuery: this.state.clients });
    }
});

export default ClientPage;