import React from 'react';
import Client from './Client.jsx';

const name = 'Ім\'я';
const ClientList = React.createClass({
	render(){
		return(
				<div>
				<table>
					<tbody>
					<tr>
						<th>id</th>
						<th>Прізвище</th>
						<th>{name}</th>
						<th>Побатькові</th>
						<th>Рахунок</th>
						<th>МФО</th>
						<th>Адреса</th>
					</tr>
					{
						this.props.clients.map(client =>
						
				  			<Client
				  				key={client.id}
				  				id={client.id}
				  				prizv={client.prizv}
								imja={client.imja}
								pob={client.pob}
								rasch_sch={client.rasch_sch}
								mfo={client.mfo}
								address={client.address}
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