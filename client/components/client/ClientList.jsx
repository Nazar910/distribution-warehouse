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
						<th>{this.props.labels.lastName}</th>
						<th>{this.props.labels.name}</th>
						<th>{this.props.labels.pob}</th>
						<th>{this.props.labels.rasch_sch}</th>
						<th>{this.props.labels.mfo}</th>
						<th>{this.props.labels.address}</th>
					</tr>
					</tbody>
					<tbody>
					{
						this.props.clients.map(client =>
						
				  			<Client
				  				key={client.id}
				  				lastName={client.lastName}
								name={client.name}
								pob={client.pob}
								rasch_sch={client.rasch_sch}
								mfo={client.mfo}
								address={client.address}
								onDelete={this.props.onClientDelete.bind(null,client)}
				  				onEdit={this.props.onEditChange.bind(null, client)}
				  				labels={this.props.labels}
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