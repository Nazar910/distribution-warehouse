import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';
import ErrorHandler from '../ErrorHandler.js';

import api from '../api';

const AppActions = {
	loadProducts(){
		console.log('loadProducts');
		AppDispatcher.dispatch({
			type: Constants.LOAD_PRODUCT_REQUEST
		});

		api.listProducts()
		.then(({data})=>{
			console.log('LoadThenDispatch')
			AppDispatcher.dispatch({
				type: Constants.LOAD_PRODUCT_SUCCESS,
				products: data
			})}
		)
		.catch(err =>
			AppDispatcher.dispatch({
				type:Constants.LOAD_PRODUCT_FAIL,
				error: err
			})
		);
	},
	createProduct(product) {
		console.log('createProduct');
        api.createProduct(product)
        .then(() =>
            this.loadProducts()
        )
        .catch(err =>
            console.error(err)
        );
    },
    deleteProduct(productId,replyStr) {
        api.deleteProduct(productId)
        .then(({data}) =>{
        	console.log(data);
        	if(!data.error)
            	this.loadProducts()
            else
            	ErrorHandler.handle(data,replyStr);
        	}
        )
        .catch(err =>
            console.error(err)
        );
    },
    updateProduct(product,replyStr){
    	console.log('Update begin');
    	console.log(product);
    	api.updateProduct(product)
    	.then(({data}) =>{
    		console.log(data);
    		if(!data.error)
    			this.loadProducts();
    		else
    			ErrorHandler.handle(data,replyStr);
    		}
    	)
		.catch(err =>{
			// alert(err);
			console.error(err)
		}
		);
    },
	loadClients(){
		AppDispatcher.dispatch({
			type: Constants.LOAD_CLIENT_REQUEST
		});

		api.listClients()
		.then(({data})=>
			AppDispatcher.dispatch({
				type: Constants.LOAD_CLIENT_SUCCESS,
				clients: data
			})
		)
		.catch(err =>
			AppDispatcher.dispatch({
				type:Constants.LOAD_CLIENT_FAIL,
				error: err
			})
		);
	}
}

export  default AppActions;