import * as db from './dataBaseUtils.js';

const Routes = [
	{ path:'/ttns', 		 method:'GET', 	handler: (request,reply)=>{ db.listTtns(reply); } },
	{ path:'/products', 	 method:'GET', 	handler: (request,reply)=>{ db.listProducts(reply); } },
	{ path:'/clients', 	 	 method:'GET', 	handler: (request,reply)=>{ db.listClients(reply); } },
	{ path:'/containers', 	 method:'GET', 	handler: (request,reply)=>{ db.listContainers(reply); } },
	{ path:'/agreements', 	 method:'GET', 	handler: (request,reply)=>{ db.listAgreements(reply); } },
	{ path:'/products',      method:'POST', handler: (request,reply)=>{ db.createProduct(request.payload,reply); } },
	{ path:'/products/{id}', method:'DELETE',handler:(request,reply)=>{ db.deleteProduct(request.params.id, reply); } },
	{ path:'/products/{id}', method:'POST',handler:(request,reply)=>{ db.updateProduct(request.payload,reply); } }
];

export default Routes;