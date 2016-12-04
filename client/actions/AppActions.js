import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';
import ErrorHandler from '../ErrorHandler.js';

import api from '../api';

const AppActions = {
	loadProducts(){
		AppDispatcher.dispatch({
			type: Constants.LOAD_PRODUCT_REQUEST
		});

		api.listProducts()
		.then(({data})=>{
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
        	if(!data.type)
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
    	api.updateProduct(product)
    	.then(({data}) =>{
    		if(!data.type)
    			this.loadProducts();
    		else
    			ErrorHandler.handle(data,replyStr);
    		}
    	)
		.catch(err =>{
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
	},
	createClient(client) {
		console.log('create client')
        api.createClient(client)
        .then(() =>{
        	console.log('then load clients')
            this.loadClients()
        }
        )
        .catch(err =>
            console.error(err)
        );
    },
    deleteClient(clientId,replyStr) {
        api.deleteClient(clientId)
        .then(({data}) =>{
        	if(!data.type)
            	this.loadClients()
            else
            	ErrorHandler.handle(data,replyStr);
        	}
        )
        .catch(err =>
            console.error(err)
        );
    },
    updateClient(client,replyStr){
    	api.updateClient(client)
    	.then(({data}) =>{
    		if(!data.type)
    			this.loadClients();
    		else
    			ErrorHandler.handle(data,replyStr);
    		}
    	)
		.catch(err =>{
			console.error(err)
		}
		);
    },
    loadContainers(){
        AppDispatcher.dispatch({
            type: Constants.LOAD_CONTAINER_REQUEST
        });

        api.listContainers()
        .then(({data})=>
            AppDispatcher.dispatch({
                type: Constants.LOAD_CONTAINER_SUCCESS,
                containers: data
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type:Constants.LOAD_CONTAINER_FAIL,
                error: err
            })
        );
    },
    createContainer(container) {
        api.createContainer(container)
        .then(() =>{
            this.loadContainers()
        }
        )
        .catch(err =>
            console.error(err)
        );
    },
    deleteContainer(containerId,replyStr) {
        api.deleteContainer(containerId)
        .then(({data}) =>{
            if(!data.type)
                this.loadContainers()
            else
                ErrorHandler.handle(data,replyStr);
            }
        )
        .catch(err =>
            console.error(err)
        );
    },
    updateContainer(container,replyStr){
        api.updateContainer(container)
        .then(({data}) =>{
            if(!data.type)
                this.loadContainers();
            else
                ErrorHandler.handle(data,replyStr);
            }
        )
        .catch(err =>{
            console.error(err)
        }
        );
    },
    loadTransportKinds(){
        AppDispatcher.dispatch({
            type: Constants.LOAD_TRANSPORT_KIND_REQUEST
        });

        api.listTransportKinds()
        .then(({data})=>
            AppDispatcher.dispatch({
                type: Constants.LOAD_TRANSPORT_KIND_SUCCESS,
                transportKinds: data
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type:Constants.LOAD_TRANSPORT_KIND_FAIL,
                error: err
            })
        );
    },
    createTransportKind(transportKind) {
        api.createTransportKind(transportKind)
        .then(() =>{
            this.loadTransportKinds()
        }
        )
        .catch(err =>
            console.error(err)
        );
    },
    deleteTransportKind(transportKindId,replyStr) {
        api.deleteTransportKind(transportKindId)
        .then(({data}) =>{
            if(!data.type)
                this.loadTransportKinds()
            else
                ErrorHandler.handle(data,replyStr);
            }
        )
        .catch(err =>
            console.error(err)
        );
    },
    updateTransportKind(transportKind,replyStr){
        api.updateTransportKind(transportKind)
        .then(({data}) =>{
            if(!data.type)
                this.loadTransportKinds();
            else
                ErrorHandler.handle(data,replyStr);
            }
        )
        .catch(err =>{
            console.error(err)
        }
        );
    },
    loadAgreements(){
        AppDispatcher.dispatch({
            type: Constants.LOAD_AGREEMENT_REQUEST
        });

        api.listAgreements()
        .then(({data})=>{
                AppDispatcher.dispatch({
                type: Constants.LOAD_AGREEMENT_SUCCESS,
                agreements: data
            })
            }
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type:Constants.LOAD_AGREEMENT_FAIL,
                error: err
            })
        );
    },
    createAgreement(agreement) {
        api.createAgreement(agreement)
        .then(() =>{
            this.loadAgreements()
        }
        )
        .catch(err =>
            console.error(err)
        );
    },
    deleteAgreement(agreementId,replyStr) {
        api.deleteAgreement(agreementId)
        .then(({data}) =>{
            if(!data.type)
                this.loadAgreements()
            else
                ErrorHandler.handle(data,replyStr);
            }
        )
        .catch(err =>
            console.error(err)
        );
    },
    updateAgreement(agreement,replyStr){
        api.updateAgreement(agreement)
        .then(({data}) =>{
            if(!data.type)
                this.loadAgreements();
            else
                ErrorHandler.handle(data,replyStr);
            }
        )
        .catch(err =>{
            console.error(err)
        }
        );
    },
    loadTtns(){
        AppDispatcher.dispatch({
            type: Constants.LOAD_TTN_REQUEST
        });

        api.listTtns()
        .then(({data})=>{
                AppDispatcher.dispatch({
                type: Constants.LOAD_TTN_SUCCESS,
                ttns: data
            })
            }
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type:Constants.LOAD_TTN_FAIL,
                error: err
            })
        );
    },
    createTtn(ttn) {
        api.createTtn(ttn)
        .then(() =>{
            this.loadTtns()
        }
        )
        .catch(err =>
            console.error(err)
        );
    },
    deleteTtn(ttnId,replyStr) {
        api.deleteTtn(ttnId)
        .then(({data}) =>{
            if(!data.type)
                this.loadTtns()
            else
                ErrorHandler.handle(data,replyStr);
            }
        )
        .catch(err =>
            console.error(err)
        );
    },
    updateTtn(ttn,replyStr){
        api.updateTtn(ttn)
        .then(({data}) =>{
            if(!data.type)
                this.loadTtns();
            else
                ErrorHandler.handle(data,replyStr);
            }
        )
        .catch(err =>{
            console.error(err)
        }
        );
    },
    loadUserToken(userData){
        AppDispatcher.dispatch({
            type: Constants.LOAD_USER_REQUEST
        });
        console.log('load user token');
        api.authUser(userData)
        .then(({data})=>{
            console.log(data);
            AppDispatcher.dispatch({
                type: Constants.LOAD_USER_SUCCESS,
                userToken: data
            })
        }
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type:Constants.LOAD_USER_FAIL,
                error: err
            })
        );
    }
}
export  default AppActions;