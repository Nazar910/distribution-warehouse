import React from 'react';
import { Link } from 'react-router'; 
import './Navbar.less';

const Navbar = React.createClass({
	render(){
		return(
				<div>
					<table className="Navbar">
						<tbody>
							<tr>
								<td><Link className="Link" to='/'>Home</Link></td>					
								<td><Link className="Link" to='/ttn'>TTN</Link></td>
								<td><Link className="Link" to='/agreement'>Agreement</Link></td>
								<td><Link className="Link" to='/product'>Product</Link></td>
								<td><Link className="Link" to='/client'>Client</Link></td>
								<td><Link className="Link" to='/container'>Container</Link></td>
								<td><Link className="Link" to='/transport_kind'>Transport kind</Link></td>
							</tr>
						</tbody>
					</table>
					<div>
						{this.props.children}
					</div>
				</div>
			);
	}
});

export default Navbar;