import React from 'react';
import '../Item.less';

const Agreement = React.createClass({
	render(){
		return(		
					<tr className="Item">
						<td>{this.props.id}</td>
						<td>{this.props.client}</td>
						<td>{this.props.creationDate}</td>
						<td>{this.props.summary}</td>
						<td><span className='Item__del-edit' onClick={this.props.onEdit}>Edit</span></td>
						<td><span className='Item__del-edit' onClick={this.props.onDelete}> x </span></td>
					</tr>
			);
	}
});

export default Agreement;
