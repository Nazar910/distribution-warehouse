import React from 'react';
import '../Item.less';

const Ttn = React.createClass({
	showTitles(){
		console.log(this.props.titleP2);
	},
	render(){
		return(		
					<tr className="Item">
						<td>{this.props.agreement}</td>
						<td>{this.props.product}</td>
						<td>{this.props.container}</td>
						<td>{this.props.container_count}</td>
						<td>{this.props.transport}</td>
						<td>{this.props.transport_summ}</td>
						<td title={this.props.titleP2}>{this.props.p2}</td>
						<td title={this.props.titleP3}>{this.props.p3}</td>
						<td title={this.props.titleP4}>{this.props.p4}</td>
						<td><span className='Item__del-edit' onClick={this.props.onEdit}>Edit</span></td>
						<td><span className='Item__del-edit' onClick={this.props.onDelete}> x </span></td>
					</tr>
			);
	}
});

export default Ttn;
