import Hapi from 'hapi';
import config from '../config.json';
import Routes from './routes';
import Good from 'good';

const server = new Hapi.Server();
server.connection({
	host:config.serverHost,
	port:config.serverPort,
	routes:{
		cors:true
	}
});

server.route(Routes);

server.register(
{
    register: Good,
    options: {
        reporters: {
            console: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                    response: '*',
                    log: '*'
                }]
            }, {
                module: 'good-console'
            }, 'stdout']
        }
    }
}
, (err) => {

    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start(err=>{
	if(err){
		throw err;
	}
	console.log(`Server is up and running at ${server.info.uri}`);
});
});

