import React from 'react';
import ProductRowEditor from './ProductRowEditor.jsx';
import ProductList from './ProductList.jsx';
import Store from '../../stores/Store.jsx';
import AppActions from '../../actions/AppActions';

function getStateFromFlux(){
	return {
		isLoading: Store.isLoading(),
		products : Store.getProducts(),
		edit: false,
		product: {},
		errors: ''
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
   	},
   	handleProductDelete(product){
   		AppActions.deleteProduct(product.id,this.errorStr);
   	},
   	handleEditChange(productToEdit){
   		this.setState( { edit: !this.state.edit, product: productToEdit } );
   	},
   	errorStr(str){
   		this.setState({ errors: str });
   	},
   	handleProductUpdate(productData){
   		AppActions.updateProduct(productData,this.errorStr);
   		if(!this.state.errors)
   			this.setState(getStateFromFlux());
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
					/>
					<ProductList
					 products={this.state.products} 
					 onProductDelete={this.handleProductDelete}
					 onEditChange={this.handleEditChange}
					/>
				</div>
			);
	},
	_onChange() {
        this.setState(getStateFromFlux());
    }
});

export default ProductPage;