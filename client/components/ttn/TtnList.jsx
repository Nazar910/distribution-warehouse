import React from 'react';
import Ttn from './Ttn.jsx';
import '../List.less';

const TtnList = React.createClass({
	formatProduct(productId){
		var result;
		this.props.products.forEach(function (item,i, arr){
			if(item.id === productId){
				result = item.name;
			}
		});
		return result;
	},
	formatContainer(containerId){
		var result;
		this.props.containers.forEach(function (item,i, arr){
			if(item.id === containerId){
				result = item.name;
			}
		});
		return result;
	},
	formatTransport(transportId){
		var result;
		this.props.transportKinds.forEach(function (item,i, arr){
			if(item.id === transportId){
				result = item.name;
			}
		});
		return result;
	},
	formatTransportP(transportId,index){
		var result=[];
		this.props.transportKinds.forEach(function (item,i, arr){
			if(item.id === transportId){
				result = [item.name_p2,item.name_p3,item.name_p4];
			}
		});
		return result[index];
	},
	render(){
		return(
				<div>
				<table className="Table">
					<tbody>
					<tr>
						<th>id</th>
						<th>Agreement</th>
						<th>Product</th>
						<th>Container</th>
						<th>Container_count</th>
						<th>Transport</th>
						<th>Transport_summ</th>
						<th>p2</th>
						<th>p3</th>
						<th>p4</th>
					</tr>
					</tbody>
					<tbody>
					{
						this.props.ttns.map(ttn =>
						
				  			<Ttn
				  				key={ttn.id}
				  				id={ttn.id}
								agreement={ttn.agreement_id}
								product={this.formatProduct(ttn.product_id)}
								container={this.formatContainer(ttn.container_id)}
								container_count={ttn.container_count}
								transport={this.formatTransport(ttn.transport_kind)}
								transport_summ={ttn.transport_summ}
								p2={ttn.p2}
								p3={ttn.p3}
								p4={ttn.p4}
								titleP2={this.formatTransportP(ttn.transport_kind,0)}
								titleP3={this.formatTransportP(ttn.transport_kind,1)}
								titleP4={this.formatTransportP(ttn.transport_kind,2)}
								onDelete={this.props.onTtnDelete.bind(null,ttn)}
				  				onEdit={this.props.onEditChange.bind(null, ttn)}
				  			>
							</Ttn>	
						)
					}
					</tbody>
				</table>
			</div>
			);
	}
});

export default TtnList;