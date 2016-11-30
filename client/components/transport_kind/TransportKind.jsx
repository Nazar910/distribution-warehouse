import React from 'react';
import '../Item.less';

const TransportKind = React.createClass({
	render(){
		return(		
					<tr className="Item">
						<td>{this.props.id}</td>
						<td>{this.props.name}</td>
						<td>{this.props.name_p2}</td>
						<td>{this.props.name_p3}</td>
						<td>{this.props.name_p4}</td>
						<td><span className='Item__del-edit' onClick={this.props.onEdit}>Edit</span></td>
						<td><span className='Item__del-edit' onClick={this.props.onDelete}> x </span></td>
					</tr>
			);
	}
});

export default TransportKind;
