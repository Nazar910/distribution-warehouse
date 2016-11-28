import React from 'react';
import { Link } from 'react-router'; 

const Navbar = React.createClass({
	render(){
		return(
				<div>
					<Link to='/'>Home</Link>|
					<Link to='/product'>Product</Link>|
					<Link to='/client'>Client</Link>|
					<Link to='/ttn'>TTN</Link>|
					<Link to='/container'>Container</Link>|
					<Link to='/agreement'>Agreement</Link>
					<div>
						{this.props.children}
					</div>
				</div>
			);
	}
});

export default Navbar;