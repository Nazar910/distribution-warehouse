import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _clients = [];
let _loadingError = null;
let _isLoading = true;

function formatProduct(client){
	return {
        id       : client.id,
        prizv    : client.prizv,
        imja     : client.imja,
        pob      : client.pob,
        rasch_sch: client.rasch_sch,
        mfo      :  client.mfo,
        address  : client.address
	};
}

const TaskStore = Object.assign({}, EventEmitter.prototype,{
	isLoading(){
		return _isLoading;
	},

	getClients(){
		return _products;
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
        case AppConstants.LOAD_REQUEST: {
            _isLoading = true;

            TaskStore.emitChange();
            break;
        }

        case AppConstants.LOAD_SUCCESS: {
            _isLoading = false;
            _clients = action.products.map( formatProduct );
            _loadingError = null;

            TaskStore.emitChange();
            break;
        }

        case AppConstants.LOAD_FAIL: {
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
