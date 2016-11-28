import Hapi from 'hapi';
import config from '../config.json';
import Routes from './routes';

const server = new Hapi.Server();
server.connection({
	host:config.serverHost,
	port:config.serverPort,
	routes:{
		cors:true
	}
});

server.route(Routes);

server.start(err=>{
	if(err){
		throw err;
	}
	console.log(`Server is up and running at ${server.info.uri}`);
});