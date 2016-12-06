import React from 'react';
import Container from './Container.jsx';
import '../List.less';

const ContainerList = React.createClass({
	render(){
		return(
				<div>
				<table className="Table">
					<tbody>
					<tr>
						<th>{this.props.labels.title}</th>
						<th>{this.props.labels.factory}</th>
						<th>{this.props.labels.cost}</th>
					</tr>
					</tbody>
					<tbody>
					{
						this.props.containers.map(container =>
						
				  			<Container
				  				key={container.id}
								name={container.name}
								factory={container.factory}
								cost={container.cost}
								onDelete={this.props.onContainerDelete.bind(null,container)}
				  				onEdit={this.props.onEditChange.bind(null, container)}
				  			>
							</Container>	
						)
					}
					</tbody>
				</table>
			</div>
			);
	}
});

export default ContainerList;