import React from 'react';
import ProductRowEditor from './ProductRowEditor.jsx';
import ProductList from './ProductList.jsx';
import Store from '../../stores/Store.jsx';
import AppActions from '../../actions/AppActions';
import Modal from 'react-modal';
import '../Page.less';
import * as InsertionSort from '../../InsertionSort.js';

function getStateFromFlux(){
	return {
		isLoading: Store.isLoading(),
		products : Store.getProducts(),
		productsQuery: [],
		edit: false,
		product: {},
		errors: '',
		modalIsOpen: false,
		searchKind: '',
		sortVector: ''
	};
}

const ProductPage = React.createClass({
	getInitialState() {
		return getStateFromFlux();
	},
	componentWillMount() {
		AppActions.loadProducts();
	},
	componentDidMount() {
		Store.addChangeListener(this._onChange);
	},
	componentWillUnmount() {
		Store.removeChangeListener(this._onChange);
	},
	handleProductAdd(productData){
		AppActions.createProduct(productData);
		let interval = setInterval(()=>{
			this.handleFilter();
			clearInterval(interval);
		},100);
	},
	handleProductDelete(product){
		AppActions.deleteProduct(product.id,this.errorStr);
		let interval = setInterval(()=>{
			this.handleFilter();
			clearInterval(interval);
		},100);
	},
	handleEditChange(productToEdit){
		this.setState( { edit: !this.state.edit, product: productToEdit } );
		if(!this.state.edit) this.openModal();
	},
	errorStr(str){
		this.setState({ errors: str });
	},
	handleProductUpdate(productData){
		AppActions.updateProduct(productData,this.errorStr);
		if(!this.state.errors)
			this.setState(getStateFromFlux());
		let interval = setInterval(()=>{
			this.handleFilter();
			clearInterval(interval);
		},100);
	},
	handleFilter(){
		let searchName,searchNpreisk,searchCost;
		try{
			searchNpreisk = this.refs.factory.value;
			searchCost = this.refs.cost.value; 
		}
		catch(err){
			searchNpreisk = '';
			searchCost = '';
		}
		try{
			searchName = this.refs.name.value.toLowerCase();
		}
		catch(err){
			searchName = '';
		}
		let newProducts = this.state.products.filter(function(el){
			let searchQueryName = el.name.toLowerCase(),
			searchQueryNpreisk = ''+el.factory,
			searchQueryCost = ''+el.cost;
			return searchQueryName.startsWith(searchName) &&
			searchQueryNpreisk.startsWith(searchNpreisk) &&
			searchQueryCost.startsWith(searchCost);
		});
		this.setState({ productsQuery: newProducts });
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
			case this.props.labels.Npreisk:{
				field='Npreisk';
				break;
			}
			case this.props.labels.cost:{
				field='cost';
				break;
			}
		}
		let newProductsQuery = this.state.productsQuery;
		switch(this.state.sortVector){
			case this.props.labels.normal:{
				InsertionSort.sort(newProductsQuery,field);
				break;
			}
			case this.props.labels.reverse:{
				InsertionSort.sortReverse(newProductsQuery,field);
				break;
			}
		}
		this.setState({ productsQuery: newProductsQuery });
	},
	handleSortVectorChange(){
		this.setState({ sortVector: this.refs.sortVector.value });
		var interval = setInterval(()=>{
			this.handleSortChange();
			clearInterval(interval);
		},50);
	},
	printProducts(){
		var mywindow = window.open('','printDiv','height=600,width=1000,top=0,left=0');
		let trs = '';
		this.state.productsQuery.forEach(function(item,i,arr){
			trs+=`<tr>`+
				`<td>${item.id}</td>`+
				`<td>${item.name}</td>`+
				`<td>${item.Npreisk}</td>`+
				`<td>${item.cost}</td>`+
			`</tr>`
		});
		console.log(trs);
		let table=`<table border="1"><tr align="center"><th>${this.props.labels.id}</th><th>${this.props.labels.name}</th>`+
		`<th>${this.props.labels.Npreisk}</th><th>${this.props.labels.cost}</th>`+`${trs}</table>`;
		mywindow.document.write(`<html><head><title></title></head><body>${table}</body></html>`);
		mywindow.print();
	},
	render(){
		return(
			<div>
			<ProductRowEditor 
			onProductAdd={this.handleProductAdd} 
			shouldEdit={this.state.edit}
			product={this.state.product}
			onProductUpdate={this.handleProductUpdate}
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
				<td>{this.props.labels.Npreisk}</td>
				<td><input 
				type="text" 
				placeholder={this.props.labels.Npreisk} 
				ref="Npreisk" 
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
			<div><span className='Item__print' onClick={this.printProducts}>{this.props.labels.print}</span></div>
			</div>
			<div className="Sort">
			<span>{this.props.labels.sortBy}&nbsp;</span>
			<select ref="sortBy" onChange={this.handleSortChange}>
			<option>{this.props.labels.title}</option>
			<option>{this.props.labels.Npreisk}</option>
			<option>{this.props.labels.cost}</option>
			</select><br/>
			<select ref="sortVector" className="Vector" onChange={this.handleSortVectorChange}>
			<option>{this.props.labels.normal}</option>
			<option>{this.props.labels.reverse}</option>
			</select>
			</div>
			<ProductList
			products={this.state.productsQuery} 
			onProductDelete={this.handleProductDelete}
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
			productsQuery: this.state.products,
			searchKind   : this.props.labels.searchLastName,
			sortVector   : this.props.labels.normal 
		});
	}
});

export default ProductPage;