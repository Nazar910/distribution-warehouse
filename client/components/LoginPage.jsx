import React from 'react';
import { Link } from 'react-router';
import AppActions from '../actions/AppActions.js';
import Store from '../stores/Store.jsx';
import jQuery from 'jquery';


function getStateFromFlux(){
	return {
		userToken:Store.getUserToken()
	}
}
const LoginPage = React.createClass({
	getInitialState() {
		return getStateFromFlux();
	},
	handleLogin(){
		// const userData={
		// 	username:this.refs.username.value,
		// 	password:this.refs.password.value
		// };
		// console.log(userData);
		// AppActions.loadUserToken(userData);
		console.log('here '+this.contextTypes);
		this.context.location.transitionTo('ttn');
	},
	render(){
		return(
			<div>
			<div><input type="text" ref="username"/></div>
			<div><input type="password" ref="password"/></div>
			<div id="printDiv">Print me</div>
			<button onClick={this.handleLogin}>Submit</button>
			</div>
			);
	}
});

// <div><Link  to={this.handleLogin}>Login</Link></div>

export default LoginPage;