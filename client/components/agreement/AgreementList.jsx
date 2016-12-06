import React from 'react';
import Agreement from './Agreement.jsx';
import '../List.less';

const AgreementList = React.createClass({
	formatClient(clientId){
		var result;
		this.props.clients.forEach(function (item,i, arr){
			if(item.id === clientId){
				result = item.lastName+' '+item.name;
			}
		});
		return result;
	},
	render(){
		return(
				<div>
				<table className="Table">
					<tbody>
					<tr>
						<th>{this.props.labels.id}</th>
						<th>{this.props.labels.client}</th>
						<th>{this.props.labels.creationDate}</th>
						<th>{this.props.labels.summ}</th>
					</tr>
					</tbody>
					<tbody>
					{
						this.props.agreements.map(agreement =>
						
				  			<Agreement
				  				key={agreement.id}
				  				id={agreement.id}
								client={this.formatClient(agreement.client)}
								creationDate={formatDate(agreement.creationDate)}
								summary={agreement.summary}
								onDelete={this.props.onAgreementDelete.bind(null,agreement)}
				  				onEdit={this.props.onEditChange.bind(null, agreement)}
				  			>
							</Agreement>	
						)
					}
					</tbody>
				</table>
			</div>
			);
	}
});

function formatDate(date){
	let d = date.split('T')[0];
	d = d.split('-');
	return d[2]+'.'+d[1]+'.'+d[0];
}

export default AgreementList;