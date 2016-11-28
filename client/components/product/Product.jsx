import React from 'react';
import '../Item.less';

const Product = React.createClass({
	render(){
		return(		
					<tr classname="Item">
						<td>{this.props.id}</td>
						<td>{this.props.name}</td>
						<td>{this.props.Npreisk}</td>
						<td>{this.props.cost}</td>
						<td><span onClick={this.props.onEdit}>Edit </span></td>
						<td><span className="Item__del-icon" onClick={this.props.onDelete}> x </span></td>
					</tr>

			);
	}
});

export default Product;