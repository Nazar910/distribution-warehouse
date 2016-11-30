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
						<th>id</th>
						<th>Name</th>
						<th>Factory</th>
						<th>Cost</th>
					</tr>
					</tbody>
					<tbody>
					{
						this.props.containers.map(container =>
						
				  			<Container
				  				key={container.id}
				  				id={container.id}
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