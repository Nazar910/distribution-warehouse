import React from 'react';
import { Link } from 'react-router'; 
import './Navbar.less';
import Lang from '../Lang.js';

const Navbar = React.createClass({
	getInitialState() {
		return {
			labels: Lang['ua'],
			lang: 'ua'
		}	
	},
	onLangChange(event){
		var l = event.target.value;
		this.setState({ labels: Lang[l], lang: l });
	},
	render(){
		return(
				<div>
					<table className="Navbar">
						<tbody>
							<tr>				
								<td><Link className="Link" to='/ttn'>{this.state.labels.ttn}</Link></td>
								<td><Link className="Link" to='/agreement'>{this.state.labels.agreement}</Link></td>
								<td><Link className="Link" to='/product'>{this.state.labels.product}</Link></td>
								<td><Link className="Link" to='/client'>{this.state.labels.client}</Link></td>
								<td><Link className="Link" to='/container'>{this.state.labels.container}</Link></td>
								<td><Link className="Link" to='/transport_kind'>{this.state.labels.transport_kind}</Link></td>
								<td>
									<select onChange={this.onLangChange}>
										<option>ua</option>
										<option>ru</option>
										<option>en</option>
									</select>
									
								</td>
							</tr>
						</tbody>
					</table>
					<div>
						{React.cloneElement(this.props.children, { labels: this.state.labels })}
					</div>
				</div>
			);
	}
});

export default Navbar;