import React from 'react';
import Client from './Client.jsx';
import '../List.less';

const ClientList = React.createClass({
	render(){
		return(
				<div>
				<table className="Table">
					<tbody>
					<tr>
						<th>id</th>
						<th>Lastname</th>
						<th>Name</th>
						<th>Pob</th>
						<th>Rasch_sch</th>
						<th>Mfo</th>
						<th>Address</th>
					</tr>
					</tbody>
					<tbody>
					{
						this.props.clients.map(client =>
						
				  			<Client
				  				key={client.id}
				  				id={client.id}
				  				lastName={client.lastName}
								name={client.name}
								pob={client.pob}
								rasch_sch={client.rasch_sch}
								mfo={client.mfo}
								address={client.address}
								onDelete={this.props.onClientDelete.bind(null,client)}
				  				onEdit={this.props.onEditChange.bind(null, client)}
				  			>
							</Client>	
						)
					}
					</tbody>
				</table>
			</div>
			);
	}
});

export default ClientList;