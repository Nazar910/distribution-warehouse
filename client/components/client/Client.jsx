import React from 'react';
import '../Item.less';

const Client = React.createClass({
	render(){
		return(		
					<tr className="Item">
						<td>{this.props.lastName}</td>
						<td>{this.props.name}</td>
						<td>{this.props.pob}</td>
						<td>{this.props.rasch_sch}</td>
						<td>{this.props.mfo}</td>
						<td>{this.props.address}</td>
						<td><span className='Item__del-edit' onClick={this.props.onEdit}>{this.props.labels.edit}</span></td>
						<td><span className='Item__del-edit' onClick={this.props.onDelete}> x </span></td>
					</tr>
			);
	}
});

export default Client;
