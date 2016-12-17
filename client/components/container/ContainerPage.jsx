import React from 'react';
import ContainerRowEditor from './ContainerRowEditor.jsx';
import ContainerList from './ContainerList.jsx';
import Store from '../../stores/Store.jsx';
import AppActions from '../../actions/AppActions';
import Modal from 'react-modal';
import '../Page.less';
import * as InsertionSort from '../../InsertionSort.js';

function getStateFromFlux(){
	return {
		isLoading: Store.isLoading(),
		containers : Store.getContainers(),
		containersQuery: [],
		edit: false,
		container: {},
		errors: '',
    modalIsOpen: false,
    searchKind: '',
    sortVector: ''
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
   let interval = setInterval(()=>{
    this.handleFilter();
    clearInterval(interval);
  },100);
 },
 handleContainerDelete(container){
   AppActions.deleteContainer(container.id,this.errorStr);
   let interval = setInterval(()=>{
    this.handleFilter();
    clearInterval(interval);
  },100);
 },
 handleEditChange(containerToEdit){
   this.setState( { edit: !this.state.edit, container: containerToEdit } );
   if(!this.state.edit) this.openModal();
 },
 errorStr(str){
   this.setState({ errors: str });
 },
 handleContainerUpdate(containerData){
   AppActions.updateContainer(containerData,this.errorStr);
   if(!this.state.errors)
    this.setState(getStateFromFlux());
  let interval = setInterval(()=>{
    this.handleFilter();
    clearInterval(interval);
  },100);
},
handleFilter(){
  let searchName,searchFactory,searchCost;
  try{
    searchFactory = this.refs.factory.value.toLowerCase();
    searchCost = this.refs.cost.value; 
  }
  catch(err){
    searchFactory = '';
    searchCost = '';
  }
  try{
    searchName = this.refs.name.value.toLowerCase();
  }
  catch(err){
    searchName = '';
  }
  let newContainers = this.state.containers.filter(function(el){
   let searchQueryName = el.name.toLowerCase(),
   searchQueryFactory = el.factory.toLowerCase(),
   searchQueryCost = ''+el.cost;
   return searchQueryName.startsWith(searchName) &&
   searchQueryFactory.startsWith(searchFactory) &&
   searchQueryCost.startsWith(searchCost);
 });
  this.setState({ containersQuery: newContainers });
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
    case this.props.labels.title:{
      field='name';
      break;
    }
    case this.props.labels.factory:{
      field='factory';
      break;
    }
    case this.props.labels.cost:{
      field='cost';
      break;
    }
  }
  let newContainersQuery = this.state.containersQuery;
  switch(this.state.sortVector){
    case this.props.labels.normal:{
      InsertionSort.sort(newContainersQuery,field);
      break;
    }
    case this.props.labels.reverse:{
      InsertionSort.sortReverse(newContainersQuery,field);
      break;
    }
  }
  this.setState({ containersQuery: newContainersQuery });
},
handleSortVectorChange(){
  this.setState({ sortVector: this.refs.sortVector.value });
  var interval = setInterval(()=>{
    this.handleSortChange();
    clearInterval(interval);
  }
  ,50);
},
printContainers(){
    var mywindow = window.open('','printDiv','height=600,width=1000,top=0,left=0');
    let trs = '';
    this.state.containersQuery.forEach(function(item,i,arr){
      trs+=`<tr>`+
        `<td>${item.id}</td>`+
        `<td>${item.name}</td>`+
        `<td>${item.factory}</td>`+
        `<td>${item.cost}</td>`+
      `</tr>`
    });
    console.log(trs);
    let table=`<table border="1"><tr align="center"><th>${this.props.labels.id}</th><th>${this.props.labels.name}</th>`+
    `<th>${this.props.labels.factory}</th><th>${this.props.labels.cost}</th>`+`${trs}</table>`;
    mywindow.document.write(`<html><head><title></title></head><body>${table}</body></html>`);
    mywindow.print();
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
    modalIsOpen={this.state.modalIsOpen}
    openModal={this.openModal}
    closeModal={this.closeModal}
    afterOpen={this.afterOpen}
    labels={this.props.labels}
    />
    <div className="Search">
    <select onChange={this.handleSearchChange}>
    <option>{this.props.labels.searchName}</option>
    <option>{this.props.labels.deepSearch}</option>
    </select>
    { this.state.searchKind == this.props.labels.deepSearch ?
     <div>
     <table>
     <tbody>
     <tr>
     <td>{this.props.labels.title}</td>
     <td><input 
     type="text" 
     placeholder={this.props.labels.title} 
     ref="name" 
     onChange={this.handleFilter}
     /></td>
     </tr>
     <tr>
     <td>{this.props.labels.factory}</td>
     <td><input 
     type="text" 
     placeholder={this.props.labels.factory} 
     ref="factory" 
     onChange={this.handleFilter}
     /></td>
     </tr>
     <tr>
     <td>{this.props.labels.cost}</td>
     <td><input 
     type="text" 
     placeholder={this.props.labels.cost} 
     ref="cost" 
     onChange={this.handleFilter}
     /></td>
     </tr>
     </tbody>
     </table>
     </div> :
     <input 
     type="text" 
     placeholder={this.props.labels.title} 
     ref="name" 
     onChange={this.handleFilter}
     />

   }
   <div><span className='Item__print' onClick={this.printContainers}>{this.props.labels.print}</span></div>
   </div>
   <div className="Sort">
   <span>{this.props.labels.sortBy}&nbsp;</span>
   <select ref="sortBy" onChange={this.handleSortChange}>
   <option>{this.props.labels.title}</option>
   <option>{this.props.labels.factory}</option>
   <option>{this.props.labels.cost}</option>
   </select><br/>
   <select ref="sortVector" className="Vector" onChange={this.handleSortVectorChange}>
   <option>{this.props.labels.normal}</option>
   <option>{this.props.labels.reverse}</option>
   </select>
   </div>
   <ContainerList
   containers={this.state.containersQuery} 
   onContainerDelete={this.handleContainerDelete}
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
    containersQuery: this.state.containers,
    searchKind: this.props.labels.searchLastName,
    sortVector: this.props.labels.normal  
  });
}
});

export default ContainerPage;