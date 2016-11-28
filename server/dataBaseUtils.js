import MySql from 'mysql';
import config from '../config.json';

var pool = MySql.createPool({
		host    : config.db.host,
		port    : config.db.port,
		user    : config.db.user,
		password: config.db.password,
		database: config.db.name,
		debug   : config.db.debug,
		connectionLimit: config.db.connectionLimit
});

function selectRow(query,reply){
	pool.getConnection((err,connection)=>{
		if(err){
			throw err;
		}
		connection.query(query,(err,rows)=>{
			connection.release();
			if(!err){
				reply(rows);
			}
		});
		connection.on('error',(err)=>{
			console.log('Error in connection');
			return;
		});
	});
}
function insertRow(query,data,reply){
	pool.getConnection((err,connection)=>{
		if(err){
			throw err;
		}
		connection.query(query,data,(err,rows)=>{
			connection.release();
			if(err){
				reply({type: 'mysql', error: err.code});
			}
			else reply({type: '', error: ''});
		});
		connection.on('error',(err)=>{
			console.log('Error in connection');
			return;
		});
	});
}
function deleteRow(query,reply){
	pool.getConnection((err,connection)=>{
		if(err){
			throw err;
		}
		connection.query(query,(err,rows)=>{
			connection.release();
			if(err){
				reply({type: 'mysql', error: err.code});
			}
			else reply({type: '', error: ''}); 
		});
		connection.on('error',(err)=>{
			console.log('Error in connection');
			return;
		});
	});
}

export function listTtns(reply){
	selectRow('select * from ttn',reply);
}

export function listProducts(reply){
	selectRow('select * from product',reply);
}

export function listClients(reply){
	selectRow('select * from client',reply);
}

export function listContainers(reply){
	selectRow('select * from container',reply);
}

export function listAgreements(reply){
	selectRow('select * from agreement',reply);
}

export function createProduct(data,reply){
	insertRow(`insert into product set ?`,data);
	reply('Success');
}
export function deleteProduct(id, reply){
	deleteRow(`delete from product where id = ${id}`,reply);
	// reply('success');
}
export function updateProduct(data, reply){
	insertRow('update product set name=?, Npreisk=?, cost=? where id=?',
		[data.name, data.Npreisk, data.cost, data.id],reply);
}