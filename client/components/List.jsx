import React from 'react';
import Product from './Product.jsx';

const List = React.createClass({
	render(){
		return(
			<div>
				<table>
					<tbody>
					{
						this.props.products.map(product =>
						
				  			<Product
				  				key={product.id}
				  				id={product.id}
				  				name={product.name}
				  				Npreisk={product.Npreisk}
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

export default List;