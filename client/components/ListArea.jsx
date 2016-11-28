import React from 'react';
import RowEditor from './RowEditor.jsx';
import List from './List.jsx';
import ProductsStore from '../stores/ProductStore';
import AppActions from '../actions/AppActions';

function getStateFromFlux(){
	return {
		isLoading: ProductsStore.isLoading(),
		items : ProductsStore.getProducts(),
	};
}

const ListArea = React.createClass({
	getInitialState() {
		return getStateFromFlux();
	},
	componentWillMount() {
        AppActions.loadProducts();
    },

    componentDidMount() {
        ProductsStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        ProductsStore.removeChangeListener(this._onChange);
    },
	render(){
		return(
				<div>
					<RowEditor />
					<List products={this.state.items}/>
				</div>
			);
	},
	_onChange() {
        this.setState(getStateFromFlux());
    }
});

export default ListArea;