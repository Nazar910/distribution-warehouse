import React from 'react';
import Product from './Product.jsx';

const ProductList = React.createClass({
	render(){
		return(
				<div>
				<table>
					<tbody>
					<tr>
						<th>id</th>
						<th>Name</th>
						<th>Npreisk</th>
						<th>Cost</th>
					</tr>
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