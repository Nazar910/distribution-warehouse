import React from 'react';
import TtnRowEditor from './TtnRowEditor.jsx';
import TtnList from './TtnList.jsx';
import Store from '../../stores/Store.jsx';
import AppActions from '../../actions/AppActions';
import Modal from 'react-modal';
import '../Page.less';
import * as InsertionSort from '../../InsertionSort.js';

let transport = [];
function getStateFromFlux(){
	return {
		isLoading: Store.isLoading(),
		ttns : Store.getTtns(),
		ttnsQuery:[],
		edit: false,
		ttn: {},
		errors: '',
		products: Store.getProducts(),
		agreements: Store.getAgreements(),
		containers: Store.getContainers(),
		transportKinds: transport,
		modalIsOpen: false,
		searchKind: '',
		sortVector: '',
		searchingTransportKind: ''
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
	},
	componentDidMount() {
		Store.addChangeListener(this._onChange);
		transport = [
		{
			id:1,
			name:this.props.labels.auto,
			name_p2:this.props.labels.nTrip,
			name_p3:this.props.labels.nAuto,
			name_p4:this.props.labels.driverFIO
		},
		{
			id:2,
			name:this.props.labels.train,
			name_p2:this.props.labels.coachId,
			name_p3:this.props.labels.trainTicket,
			name_p4:''
		},
		{
			id:3,
			name:this.props.labels.avia,
			name_p2:this.props.labels.aviaTicket,
			name_p3:'',
			name_p4:''
		}
		];
		this.setState({ transportKinds:transport });
	},
	componentWillUnmount() {
		Store.removeChangeListener(this._onChange);
	},
	handleTtnAdd(ttnData){
		AppActions.createTtn(ttnData);
		let interval = setInterval(()=>{
			this.handleFilter();
			clearInterval(interval);
		},100);
	},
	handleTtnDelete(ttn){
		AppActions.deleteTtn(ttn.id,this.errorStr);
		let interval = setInterval(()=>{
			this.handleFilter();
			clearInterval(interval);
		},100);
	},
	handleEditChange(ttnToEdit){
		this.setState( { edit: !this.state.edit, ttn: ttnToEdit } );
		if(!this.state.edit) this.openModal();
	},
	errorStr(str){
		this.setState({ errors: str });
	},
	handleTtnUpdate(ttnData){
		AppActions.updateTtn(ttnData,this.errorStr);
		if(!this.state.errors)
			this.setState(getStateFromFlux());
		let interval = setInterval(()=>{
			this.handleFilter();
			clearInterval(interval);
		},100);
	},
	formatTransportP(transportId,index){
		var result=[];
		this.state.transportKinds.forEach(function (item,i, arr){
			if(item.id === transportId){
				result = [item.name_p2,item.name_p3,item.name_p4];
			}
		});
		return result[index];
	},
	handleFilter(){
		let searchAgreement,searchProduct,searchContainerCount,
		searchContainer,searchTransportKind,searchTransportSumm,
		searchP2='',searchP3='',searchP4='';
		try{
			searchProduct = this.refs.product.value;
			searchContainerCount = this.refs.containerCount.value; 
			searchContainer = this.refs.containerId.value;
			searchTransportKind = this.refs.transportKind.value;
			this.setState({ searchingTransportKind: searchTransportKind});
			searchTransportSumm = this.refs.transportSumm.value;
		}
		catch(err){
			searchProduct = '';
			searchContainerCount = ''; 
			searchContainer = '';
			searchTransportKind = '';
			searchTransportSumm = '';
		}
		try{
			searchP2 = this.refs.p2.value;
			searchP3 = this.refs.p3.value.toLowerCase();
			searchP4 = this.refs.p4.value.toLowerCase();
		}
		catch(err){
			searchP2 = '';
			searchP3 = '';
			searchP4 = '';
		}
		console.log(searchProduct);
		try{
			searchAgreement = this.refs.agreement.value;
		}
		catch(err){
			searchAgreement = '';
		}
		let newTtns = this.state.ttns.filter(function(el){
			let searchQueryAgreement =''+el.agreement_id,
			searchQueryProduct = ''+el.product_id,
			searchQueryContainerCount = ''+el.container_count,
			searchQueryContainer =''+el.container_id,
			searchQueryTransportKind = ''+el.transport_kind,
			searchQueryTransportSumm = ''+el.transport_summ,
			searchQueryP2 =''+el.p2,
			searchQueryP3 =	(el.p3 == null ? '' :el.p3).toLowerCase(),
			searchQueryP4 =	(el.p4 == null ? '' :el.p4).toLowerCase();
			return searchQueryAgreement.startsWith(searchAgreement) &&
			searchQueryProduct.startsWith(searchProduct) &&
			searchQueryContainerCount.startsWith(searchContainerCount) &&
			searchQueryContainer.startsWith(searchContainer) &&
			searchQueryTransportKind.startsWith(searchTransportKind) &&
			searchQueryTransportSumm.startsWith(searchTransportSumm) &&
			searchQueryP2.startsWith(searchP2) &&
			searchQueryP3.startsWith(searchP3) &&
			searchQueryP4.startsWith(searchP4);
		});
		this.setState({ ttnsQuery: newTtns });
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
		console.log(this.state.sortVector);
		let field;
		switch(this.refs.sortBy.value){
			case this.props.labels.agreement:{
				field='agreement_id';
				break;
			}
			case this.props.labels.containerCount:{
				field='container_count';
				break;
			}
			case this.props.labels.transportSumm:{
				field='transport_summ';
				break;
			}
		}
		let newTtnsQuery = this.state.ttnsQuery;
		switch(this.state.sortVector){
			case this.props.labels.normal:{
				InsertionSort.sort(newTtnsQuery,field);
				break;
			}
			case this.props.labels.reverse:{
				InsertionSort.sortReverse(newTtnsQuery,field);
				break;
			}
		}
		this.setState({ ttnsQuery: newTtnsQuery });
	},
	handleSortVectorChange(){
		this.setState({ sortVector: this.refs.sortVector.value });
		var interval = setInterval(()=>{
			this.handleSortChange();
			clearInterval(interval);
		},50);
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
			modalIsOpen={this.state.modalIsOpen}
			openModal={this.openModal}
			closeModal={this.closeModal}
			afterOpen={this.afterOpen}
			labels={this.props.labels}
			formatTransportP={this.formatTransportP}
			/>
			<div className="Search">
			<select onChange={this.handleSearchChange}>
			<option>{this.props.labels.searchAgreement}</option>
			<option>{this.props.labels.deepSearch}</option>
			</select>
			{ this.state.searchKind == this.props.labels.deepSearch ?
				<div>
				<div className="Info">
				<div className="Labels">{this.props.labels.agreement}</div>
				<div className="Labels">{this.props.labels.product}</div>
				<div className="Labels">{this.props.labels.container}</div>
				<div className="Labels">{this.props.labels.containerCount}</div>
				<div className="Labels">{this.props.labels.transportKind}</div>
				<div className="Labels">{this.props.labels.transportSumm}</div>
				{
					this.state.searchingTransportKind == "" ?
					null :
					this.state.searchingTransportKind == 1 ?
					<div>
					<div className="Labels">{this.props.labels.nTrip}</div>
					<div className="Labels">{this.props.labels.nAuto}</div>
					<div className="Labels">{this.props.labels.driverFIO}</div>
					</div> :
					this.state.searchingTransportKind == 2?
					<div>
					<div className="Labels">{this.props.labels.coachId}</div>
					<div className="Labels">{this.props.labels.trainTicket}</div>
					</div> :
					<div className="Labels">{this.props.labels.aviaTicket}</div>
				}
				</div>
				<div className="Info">
				<div><select className="Inputs" ref="agreement" onChange={this.handleFilter}>
				<option value=""> - </option>
				{
					this.state.agreements.map(agreement=>
						<option
						key={agreement.id}
						value={agreement.id}
						>
						{agreement.id}
						</option>
						)
				}
				</select></div>
				<div><select className="Inputs" ref="product" onChange={this.handleFilter}>
				<option value=""> - </option>
				{
					this.state.products.map(product=>
						<option
						key={product.id}
						value={product.id}
						>
						{product.name}
						</option>
						)
				}
				</select></div>
				<div><select className="Inputs" ref="containerId" onChange={this.handleFilter}>
				<option value=""> - </option>
				{
					this.state.containers.map(container=>
						<option
						key={container.id}
						value={container.id}
						>
						{container.name}
						</option>
						)
				}
				</select></div>
				<div><input 
				className="Inputs"
				type="text" 
				placeholder={this.props.labels.containerCount} 
				ref="containerCount" 
				onChange={this.handleFilter}
				/></div>
				<div><select className="Inputs" ref="transportKind" onChange={this.handleFilter}>
				<option value=""> - </option>
				{
					this.state.transportKinds.map(transportKind=>
						<option
						key={transportKind.id}
						value={transportKind.id}
						>
						{transportKind.name}
						</option>
						)
				}
				</select></div>
				<div><input 
				className="Inputs"
				type="text" 
				placeholder={this.props.labels.transportSumm} 
				ref="transportSumm" 
				onChange={this.handleFilter}
				/></div>
				{
					this.state.searchingTransportKind == "" ?
					null :
					this.state.searchingTransportKind == 1 ?
					<div><div><input
					className="Inputs" 
					type="text" 
					placeholder={this.props.labels.nTrip} 
					ref="p2" 
					onChange={this.handleFilter}
					/></div>
					<div><input
					className="Inputs" 
					type="text" 
					placeholder={this.props.labels.nAuto} 
					ref="p3" 
					onChange={this.handleFilter}
					/></div>
					<div><input 
					className="Inputs"
					type="text" 
					placeholder={this.props.labels.driverFIO} 
					ref="p4" 
					onChange={this.handleFilter}
					/></div></div> :
					this.state.searchingTransportKind == 2 ?
					<div><div><input 
					className="Inputs"
					type="text" 
					placeholder={this.props.labels.coachId} 
					ref="p2" 
					onChange={this.handleFilter}
					/></div>
					<div><input 
					className="Inputs"
					type="text" 
					placeholder={this.props.labels.trainTicket} 
					ref="p3" 
					onChange={this.handleFilter}
					/></div></div> :
					<div><input 
					className="Inputs"
					type="text" 
					placeholder={this.props.labels.aviaTicket} 
					ref="p2" 
					onChange={this.handleFilter}
					/></div>
				}
				</div></div> :
				<select ref="agreement" onChange={this.handleFilter}>
				<option value=""> - </option>
				{
					this.state.agreements.map(agreement=>
						<option
						key={agreement.id}
						value={agreement.id}
						>
						{agreement.id}
						</option>
						)
				}
				</select>

			}
			</div>
			<div className="Sort">
			<span>{this.props.labels.sortBy}&nbsp;</span>
			<select ref="sortBy" onChange={this.handleSortChange}>
			<option>{this.props.labels.agreement}</option>
			<option>{this.props.labels.containerCount}</option>
			<option>{this.props.labels.transportSumm}</option>
			</select><br/>
			<select ref="sortVector" className="Vector" onChange={this.handleSortVectorChange}>
			<option>{this.props.labels.normal}</option>
			<option>{this.props.labels.reverse}</option>
			</select>
			</div>
			<TtnList
			ttns={this.state.ttnsQuery} 
			onTtnDelete={this.handleTtnDelete}
			onEditChange={this.handleEditChange}
			products={this.state.products}
			agreements={this.state.agreements}
			containers={this.state.containers}
			transportKinds={this.state.transportKinds}
			labels={this.props.labels}
			formatTransportP={this.formatTransportP}
			/>
			<div className="Add" onClick={this.openModal}> + </div>
			</div>
			);
},
_onChange() {
	this.setState(getStateFromFlux());
	this.setState({ 
		ttnsQuery: this.state.ttns,
		searchKind: this.props.labels.searchAgreement,
		sortVector: this.props.labels.normal  
	});
}
});


export default TtnPage;