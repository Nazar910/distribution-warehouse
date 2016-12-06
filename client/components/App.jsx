import React from 'react';
import Navbar from './Navbar.jsx';
import ProductPage from './product/ProductPage.jsx';
import ClientPage from './client/ClientPage.jsx';
import AgreementPage from './agreement/AgreementPage.jsx';
import ContainerPage from './container/ContainerPage.jsx';
import TtnPage from './ttn/TtnPage.jsx';
import TransportKindPage from './transport_kind/TransportKindPage.jsx';
import LoginPage from './LoginPage.jsx';
import RegistrationPage from './RegistrationPage.jsx';
import { Router, Route, hashHistory } from 'react-router';
import './App.less';

const App = React.createClass({
	getInitialState() {
		return {
			lang: 'ua'
		}	
	},
	render(){
		return(
				<div className="App">
					<Router history={hashHistory}>
						<Route path='/login' component={LoginPage}/>
						<Route path='/registration' component={RegistrationPage}/>
						<Route path='/' component={Navbar}>
							<Route path='/product' component={ProductPage}/>
							<Route path='/client' component={ClientPage}/>
							<Route path='/agreement' component={AgreementPage}/>
							<Route path='/ttn' component={TtnPage}/>
							<Route path='/container' component={ContainerPage}/>
						</Route>
					</Router>
				</div>
			);
	}
});

export default App;