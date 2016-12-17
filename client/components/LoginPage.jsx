import React from 'react';
import { Link } from 'react-router';
import AppActions from '../actions/AppActions.js';
import Store from '../stores/Store.jsx';
import './LoginPage.less';
import cache from 'js-cache';

function getStateFromFlux(){
	return {
		isLoading:Store.isLoading(),
		userToken:Store.getUserToken()
	}
}
const LoginPage = React.createClass({
	getInitialState() {
		return getStateFromFlux();
	},
	handleLogin(){
		const userData={
			username:this.refs.username.value,
			password:this.refs.password.value
		};
		AppActions.loadUserToken(userData);
		let interval = setInterval(()=>{
			Store.addChangeListener(this._onChange);
			clearInterval(interval);
		},100);
		let interval1 = setInterval(()=>{
			Store.removeChangeListener(this._onChange);
			clearInterval(interval1);
		},1000);
		let interval2 = setInterval(()=>{
			this.setState({ userToken: Store.getUserToken() });
			if(this.state.userToken.username!=""){
				document.cookie = `user=${this.state.userToken.username} ${this.state.userToken.rights}`;
				let interval3 = setInterval(()=>{
					this.context.router.push('/ttn');
					clearInterval(interval3);
				},100);
					
			}
			clearInterval(interval2);
		},200);

		
	},
	render(){
		return(
			<div>
			<div className="LoginForm">
				Please enter your username and password<br/>
				<input type="text" ref="username"/><br/>
				<input type="password" ref="password"/><br/>
				<input type="button" onClick={this.handleLogin} value="Submit"/>
			</div>
			</div>
			);
	},
	_onChange() {
		this.setState(getStateFromFlux());
	}
});

LoginPage.contextTypes = {
	router: React.PropTypes.object
}


export default LoginPage;