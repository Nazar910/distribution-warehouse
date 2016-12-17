import * as db from './dataBaseUtils.js';

const Routes = [
{ path:'/', 		 method:'GET', 	handler: (request,reply)=>{ reply.view('index.html') } },
{ path:'/ttns', 		 method:'GET', 	handler: (request,reply)=>{ db.listTtns(reply); } },
{ path:'/products', 	 method:'GET', 	handler: (request,reply)=>{ db.listProducts(reply); } },
{ path:'/clients', 	 	 method:'GET', 	handler: (request,reply)=>{ db.listClients(reply); } },
{ path:'/containers', 	 method:'GET', 	handler: (request,reply)=>{ db.listContainers(reply); } },
{ path:'/agreements', 	 method:'GET', 	handler: (request,reply)=>{ db.listAgreements(reply); } },
{ path:'/transport_kinds',method:'GET', handler: (request,reply)=>{ db.listTransportKinds(reply); } },
{ path:'/products',      method:'POST', handler: (request,reply)=>{ db.createProduct(request.payload,reply); } },
{ path:'/products/{id}', method:'DELETE',handler:(request,reply)=>{ db.deleteProduct(request.params.id, reply); } },
{ path:'/products/{id}', method:'POST',handler:(request,reply)=>{ db.updateProduct(request.payload,reply); } },
{ path:'/clients',      method:'POST', handler: (request,reply)=>{ db.createClient(request.payload,reply); } },
{ path:'/clients/{id}', method:'DELETE',handler:(request,reply)=>{ db.deleteClient(request.params.id, reply); } },
{ path:'/clients/{id}', method:'POST',handler:(request,reply)=>{ db.updateClient(request.payload,reply); } },
{ path:'/containers',      method:'POST', handler: (request,reply)=>{ db.createContainer(request.payload,reply); } },
{ path:'/containers/{id}', method:'DELETE',handler:(request,reply)=>{ db.deleteContainer(request.params.id, reply); } },
{ path:'/containers/{id}', method:'POST',handler:(request,reply)=>{ db.updateContainer(request.payload,reply); } },
{ path:'/transport_kinds',      method:'POST', handler: (request,reply)=>{ db.createTransportKind(request.payload,reply); } },
{ path:'/transport_kinds/{id}', method:'DELETE',handler:(request,reply)=>{ db.deleteTransportKind(request.params.id, reply); } },
{ path:'/transport_kinds/{id}', method:'POST',handler:(request,reply)=>{ db.updateTransportKind(request.payload,reply); } },
{ path:'/agreements',      method:'POST', handler: (request,reply)=>{ db.createAgreement(request.payload,reply); } },
{ path:'/agreements/{id}', method:'DELETE',handler:(request,reply)=>{ db.deleteAgreement(request.params.id, reply); } },
{ path:'/agreements/{id}', method:'POST',handler:(request,reply)=>{ db.updateAgreement(request.payload,reply); } },
{ path:'/ttns',      method:'POST', handler: (request,reply)=>{ db.createTtn(request.payload,reply); } },
{ path:'/ttns/{id}', method:'DELETE',handler:(request,reply)=>{ db.deleteTtn(request.params.id, reply); } },
{ path:'/ttns/{id}', method:'POST',handler:(request,reply)=>{ db.updateTtn(request.payload,reply); } },
{ path:'/authenticate', method:'POST',handler:(request,reply)=>{ db.authUser(request.payload,reply); } }

];

export default Routes;