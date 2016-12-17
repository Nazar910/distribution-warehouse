import MySql from 'mysql';
import config from '../config.json';

var pool = MySql.createPool({
		host    : config.db.host,
		port    : config.db.port,
		user    : config.db.user,
		password: config.db.password,
		database: config.db.name,
		// debug   : config.db.debug,
		// connectionLimit: config.db.connectionLimit
		dateStrings:true
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
				console.log(data);
				console.log(err);
				reply({type: 'mysql', message: err.message});
			}
			else{ 
				console.log(data);
				reply({type: '', message: ''});
			}
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
				reply({type: 'mysql', message: err.message});
			}
			else reply({type: '', message: ''}); 
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
	selectRow('select * from product order by name',reply);
}

export function listClients(reply){
	selectRow('select * from client order by lastName',reply);
}

export function listContainers(reply){
	selectRow('select * from container order by name',reply);
}

export function listAgreements(reply){
	selectRow('select id,client_id,creation_date,summary from agreement',reply);
}
export function listTransportKinds(reply){
	selectRow('select * from transport_kind order by name',reply);
}

export function createProduct(data,reply){
	insertRow(`insert into product set ?`,data,reply);
}
export function deleteProduct(id, reply){
	deleteRow(`delete from product where id = ${id}`,reply);
}
export function updateProduct(data, reply){
	insertRow('update product set name=?, Npreisk=?, cost=? where id=?',
		[data.name, data.Npreisk, data.cost, data.id],reply);
}
export function createClient(data,reply){
	insertRow(`insert into client set ?`,data,reply);
}
export function deleteClient(id, reply){
	deleteRow(`delete from client where id = ${id}`,reply);
}
export function updateClient(data, reply){
	insertRow('update client set lastName=?, name=?, pob=?, rasch_sch=?, mfo=?, address=? where id=?',
		[data.lastName, data.name, data.pob, data.rasch_sch, data.mfo, data.address, data.id],reply);
}
export function createContainer(data,reply){
	insertRow(`insert into container set ?`,data,reply);
}
export function deleteContainer(id, reply){
	deleteRow(`delete from container where id = ${id}`,reply);
}
export function updateContainer(data, reply){
	insertRow('update container set name=?, factory=?, cost=? where id=?',
		[data.name, data.factory, data.cost, data.id],reply);
}
export function createTransportKind(data,reply){
	insertRow(`insert into transport_kind set ?`,data,reply);
}
export function deleteTransportKind(id, reply){
	deleteRow(`delete from transport_kind where id = ${id}`,reply);
}
export function updateTransportKind(data, reply){
	insertRow('update transport_kind set name=?, name_p2=?, name_p3=?, name_p4=? where id=?',
		[data.name, data.name_p2, data.name_p3, data.name_p4, data.id],reply);
}
export function createAgreement(data,reply){
	var newData = {
		client_id: data.client,
		creation_date: data.creationDate,
		summary: data.summary
	}
	insertRow(`insert into agreement set ?`,newData,reply);
}
export function deleteAgreement(id, reply){
	deleteRow(`delete from agreement where id = ${id}`,reply);
}
export function updateAgreement(data, reply){
	console.log(data);
	insertRow('update agreement set client_id=?, creation_date=?, summary=? where id=?',
		[data.client, data.creationDate, data.summary, data.id],reply);
}

export function createTtn(data,reply){
	insertRow(`insert into ttn set ?`,data,reply);
}
export function deleteTtn(id, reply){
	deleteRow(`delete from ttn where id = ${id}`,reply);
}
export function updateTtn(data, reply){
	insertRow('update ttn set agreement_id=?, product_id=?, container_id=?, container_count=?,transport_kind=?, transport_summ=?, p2=?, p3=?, p4=?  where id=?',
		[data.agreement_id, data.product_id, data.container_id, data.container_count,
		data.transport_kind, data.transport_summ,data.p2, data.p3, data.p4, data.id],reply);
}
export function authUser(data,reply){
	pool.getConnection((err,connection)=>{
		console.log(data);
		if(err){
			throw err;
		}
		connection.query('select * from user where username=? and password=?',[data.username, data.password],(err,rows)=>{
			connection.release();
			if(!err){
				try{
					var userToken = {
						username: rows[0].username,
						rights: rows[0].rights
					}
					console.log(userToken);
					reply(userToken);
				}
				catch(err){
					reply(404);
				}
			}
			console.log(err);
		});
		connection.on('error',(err)=>{
			console.log('Error in connection');
			return;
		});
	});
}