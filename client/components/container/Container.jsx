import React from 'react';
import '../Item.less';

const Container = React.createClass({
	render(){
		return(		
					<tr className="Item">
						<td>{this.props.id}</td>
						<td>{this.props.name}</td>
						<td>{this.props.factory}</td>
						<td>{this.props.cost}</td>
						<td><span className='Item__del-edit' onClick={this.props.onEdit}>Edit</span></td>
						<td><span className='Item__del-edit' onClick={this.props.onDelete}> x </span></td>
					</tr>
			);
	}
});

export default Container;
