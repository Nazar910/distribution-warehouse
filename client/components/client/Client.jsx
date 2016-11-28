import React from 'react';

const Client = React.createClass({
	render(){
		return(		
					<tr>
						<td>{this.props.id}</td>
						<td>{this.props.prizv}</td>
						<td>{this.props.imja}</td>
						<td>{this.props.pob}</td>
						<td>{this.props.rasch_sch}</td>
						<td>{this.props.mfo}</td>
						<td>{this.props.address}</td>
					</tr>
			);
	}
});

export default Client;
