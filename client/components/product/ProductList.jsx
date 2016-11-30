import React from 'react';
import Product from './Product.jsx';
import '../List.less';

const ProductList = React.createClass({
	render(){
		return(
				<div>
				<table className="Table">
				<tbody>
					<tr>
						<th>Id</th>
						<th>Name</th>
						<th>№preisk</th>
						<th>Cost</th>
					</tr>
				</tbody>
				<tbody>
					{
						this.props.products.map(product =>
						
				  			<Product
				  				key={product.id}
				  				id={product.id}
				  				name={product.name}
				  				Npreisk={product.Npreisk}
				  				cost={product.cost}
				  				onDelete={this.props.onProductDelete.bind(null,product)}
				  				onEdit={this.props.onEditChange.bind(null, product)}
				  			>
							</Product>	
						)
					}	
				</tbody>
				</table>
			</div>
			);
	}
});

export default ProductList;