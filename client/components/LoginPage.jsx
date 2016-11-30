import React from 'react';
import { Link } from 'react-router';

const LoginPage = React.createClass({
	redirectToHome(){
		var transitionTo = Router.transitionTo;
		transitionTo('/home')
	},
	render(){
		return(
				<div>
					<input type="text"/>
					<div><Link  to='/home'>Log in</Link></div>
				</div>
			);
	}
});

export default LoginPage;