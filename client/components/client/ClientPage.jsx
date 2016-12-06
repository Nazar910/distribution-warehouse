import React from 'react';
import ClientRowEditor from './ClientRowEditor.jsx';
import ClientList from './ClientList.jsx';
import Store from '../../stores/Store.jsx';
import AppActions from '../../actions/AppActions';
import Modal from 'react-modal';
import '../Page.less';
import * as InsertionSort from '../../InsertionSort.js';

function getStateFromFlux(){
	return {
		isLoading: Store.isLoading(),
		clients : Store.getClients(),
		clientsQuery: [],
		edit: false,
		client: {},
		errors: '',
    modalIsOpen: false,
    searchKind: '',
    sortVector: ''
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
    let interval = setInterval(()=>{
      this.handleFilter();
      clearInterval(interval);
    },100);
  },
  handleClientDelete(client){
    AppActions.deleteClient(client.id,this.errorStr);
    let interval = setInterval(()=>{
      this.handleFilter();
      clearInterval(interval);
    },100);
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
  let interval = setInterval(()=>{
    this.handleFilter();
    clearInterval(interval);
  },100);
},
handleFilter(){
  let searchName,searchLastName,searchPob,searchRaschSch,searchMfo,searchAddress;
  try{
    searchName = this.refs.name.value.toLowerCase();
    searchPob = this.refs.pob.value.toLowerCase();
    searchRaschSch = this.refs.rasch_sch.value;  
    searchMfo = this.refs.mfo.value;
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
   return searchQueryName.startsWith(searchName) &&
   searchQueryLastName.startsWith(searchLastName) &&
   searchQueryPob.startsWith(searchPob) &&
   searchQueryRaschSch.startsWith(searchRaschSch) &&
   searchQueryMfo.startsWith(searchMfo) &&
   searchQueryAddress.startsWith(searchAddress);
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
handleSortChange(){
  let field;
  switch(this.refs.sortBy.value){
    case this.props.labels.name:{
      field='name';
      break;
    }
    case this.props.labels.lastName:{
      field='lastName';
      break;
    }
    case this.props.labels.pob:{
      field='pob';
      break;
    }
    case this.props.labels.rasch_sch:{
      field='rasch_sch';
      break;
    }
    case this.props.labels.mfo:{
      field='mfo';
      break;
    }
  }
  let newClientsQuery = this.state.clientsQuery;

  switch(this.state.sortVector){
    case this.props.labels.normal:{
      InsertionSort.sort(newClientsQuery,field);
      break;
    }
    case this.props.labels.reverse:{
      InsertionSort.sortReverse(newClientsQuery,field);
      break;
    }
  }
  this.setState({ clientsQuery: newClientsQuery });
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
    <div className="Search">
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
    </div>
    <div className="Sort">
    <span>{this.props.labels.sortBy}&nbsp;</span>
    <select ref="sortBy" onChange={this.handleSortChange}>
    <option>{this.props.labels.lastName}</option>
    <option>{this.props.labels.name}</option>
    <option>{this.props.labels.pob}</option>
    <option>{this.props.labels.rasch_sch}</option>
    <option>{this.props.labels.mfo}</option>
    </select><br/>
    <select ref="sortVector" className="Vector" onChange={this.handleSortVectorChange}>
    <option>{this.props.labels.normal}</option>
    <option>{this.props.labels.reverse}</option>
    </select>
    </div>
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
  this.setState({ 
    clientsQuery: this.state.clients,
    searchKind: this.props.labels.searchLastName,
    sortVector: this.props.labels.normal 
  });
}
});

export default ClientPage;