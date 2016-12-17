import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';


let _products = [];
let _clients = [];
let _containers = [];
let _transportKinds = [];
let _agreements = [];
let _ttns = [];
let _userToken = {};
let _loadingError = null;
let _isLoading = true;

function formatProduct(product){
	return {
		id     : product.id,
		name   : product.name,
		Npreisk: product.Npreisk,
        cost   : product.cost
	};
}
function formatClient(client){
    return {
        id       : client.id,
        lastName : client.lastName,
        name     : client.name,
        pob      : client.pob,
        rasch_sch: client.rasch_sch,
        mfo      :  client.mfo,
        address  : client.address
    };
}
function formatContainer(container){
    return {
        id     : container.id,
        name   : container.name,
        factory: container.factory,
        cost   : container.cost
    };
}
function formatTransportKind(transportKind){
    return {
        id     : transportKind.id,
        name   : transportKind.name,
        name_p2: transportKind.name_p2,
        name_p3: transportKind.name_p3,
        name_p4: transportKind.name_p4
    };
}
function formatAgreement(agreement){
    return {
        id          : agreement.id,
        client      : agreement.client_id,
        creationDate: agreement.creation_date,
        summary     : agreement.summary
    };
}
function formatTtn(ttn){
    return {
        id             :ttn.id,
        agreement_id   :ttn.agreement_id,
        product_id     :ttn.product_id,
        container_id   :ttn.container_id,
        container_count:ttn.container_count,
        transport_kind :ttn.transport_kind,
        transport_summ :ttn.transport_summ,
        p2             :ttn.p2,
        p3             :ttn.p3,
        p4             :ttn.p4
    };
}
function formatUserToken(userToken){
    return{
        username: userToken.username,
        rights  : userToken.rights
    }
}

const TaskStore = Object.assign({}, EventEmitter.prototype,{
	isLoading(){
		return _isLoading;
	},
	getProducts(){
		return _products;
	},
    getClients(){
        return _clients;
    },
    getContainers(){
        return _containers;
    },
    getTransportKinds(){
        return _transportKinds;
    },
    getAgreements(){
        return _agreements;
    },
    getTtns(){
        return _ttns;
    },
    getUserToken(){
        return _userToken;
    },
	emitChange: function(){
		this.emit(CHANGE_EVENT);
	},
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(action) {
    switch(action.type) {
        case AppConstants.LOAD_PRODUCT_REQUEST: {
            _isLoading = true;

            TaskStore.emitChange();
            break;
        }

        case AppConstants.LOAD_PRODUCT_SUCCESS: {
            _isLoading = false;
            _products = action.products.map( formatProduct );
            _loadingError = null;

            TaskStore.emitChange();
            break;
        }

        case AppConstants.LOAD_PRODUCT_FAIL: {
            _loadingError = action.error;

            TaskStore.emitChange();
            break;
        }

        case AppConstants.LOAD_CLIENT_REQUEST: {
            _isLoading = true;

            TaskStore.emitChange();
            break;
        }

        case AppConstants.LOAD_CLIENT_SUCCESS: {
            _isLoading = false;
            _clients = action.clients.map( formatClient );
            _loadingError = null;

            TaskStore.emitChange();
            break;
        }

        case AppConstants.LOAD_CLIENT_FAIL: {
            _loadingError = action.error;

            TaskStore.emitChange();
            break;
        }

        case AppConstants.LOAD_CONTAINER_REQUEST: {
            _isLoading = true;

            TaskStore.emitChange();
            break;
        }

        case AppConstants.LOAD_CONTAINER_SUCCESS: {
            _isLoading = false;
            _containers = action.containers.map( formatContainer );
            _loadingError = null;

            TaskStore.emitChange();
            break;
        }

        case AppConstants.LOAD_CONTAINER_FAIL: {
            _loadingError = action.error;

            TaskStore.emitChange();
            break;
        }
        case AppConstants.LOAD_TRANSPORT_KIND_REQUEST: {
            _isLoading = true;

            TaskStore.emitChange();
            break;
        }

        case AppConstants.LOAD_TRANSPORT_KIND_SUCCESS: {
            _isLoading = false;
            _transportKinds = action.transportKinds.map( formatTransportKind );
            _loadingError = null;

            TaskStore.emitChange();
            break;
        }

        case AppConstants.LOAD_TRANSPORT_KIND_FAIL: {
            _loadingError = action.error;

            TaskStore.emitChange();
            break;
        }
        case AppConstants.LOAD_AGREEMENT_REQUEST: {
            _isLoading = true;

            TaskStore.emitChange();
            break;
        }

        case AppConstants.LOAD_AGREEMENT_SUCCESS: {
            _isLoading = false;
            _agreements = action.agreements.map( formatAgreement );
            _loadingError = null;

            TaskStore.emitChange();
            break;
        }

        case AppConstants.LOAD_AGREEMENT_FAIL: {
            _loadingError = action.error;

            TaskStore.emitChange();
            break;
        }

        case AppConstants.LOAD_TTN_REQUEST: {
            _isLoading = true;

            TaskStore.emitChange();
            break;
        }

        case AppConstants.LOAD_TTN_SUCCESS: {
            _isLoading = false;
            _ttns = action.ttns.map( formatTtn );
            _loadingError = null;

            TaskStore.emitChange();
            break;
        }

        case AppConstants.LOAD_TTN_FAIL: {
            _loadingError = action.error;

            TaskStore.emitChange();
            break;
        }

        case AppConstants.LOAD_USER_REQUEST: {
            _isLoading = true;

            TaskStore.emitChange();
            break;
        }

        case AppConstants.LOAD_USER_SUCCESS: {
            _isLoading = false;
            console.log(_userToken);
            _userToken = formatUserToken(action.userToken);//action.userToken.map( formatUserToken );//
            console.log(_userToken);
            _loadingError = null;

            TaskStore.emitChange();
            break;
        }

        case AppConstants.LOAD_USER_FAIL: {
            _loadingError = action.error;

            TaskStore.emitChange();
            break;
        }


        default: {
            console.log('No such handler');
        }
    }
});

export default TaskStore;
