import React from 'react';
import TransportKind from './TransportKind.jsx';
import '../List.less';

const TransportKindList = React.createClass({
	render(){
		return(
				<div>
				<table className="Table">
					<tbody>
					<tr>
						<th>id</th>
						<th>Name</th>
						<th>Name_p2</th>
						<th>Name_p3</th>
						<th>Name_p4</th>
					</tr>
					</tbody>
					<tbody>
					{
						this.props.transportKinds.map(transportKind =>
						
				  			<TransportKind
				  				key={transportKind.id}
				  				id={transportKind.id}
								name={transportKind.name}
								name_p2={transportKind.name_p2}
								name_p3={transportKind.name_p3}
								name_p4={transportKind.name_p4}
								onDelete={this.props.onTransportKindDelete.bind(null,transportKind)}
				  				onEdit={this.props.onEditChange.bind(null, transportKind)}
				  			>
							</TransportKind>	
						)
					}
					</tbody>
				</table>
			</div>
			);
	}
});

export default TransportKindList;