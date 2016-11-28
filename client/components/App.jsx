import React from 'react';
import Navbar from './Navbar.jsx';
import ProductPage from './product/ProductPage.jsx';
import ClientPage from './client/ClientPage.jsx';
import ProductRowEditor from './product/ProductRowEditor.jsx';
import { Router, Route, hashHistory } from 'react-router';

const App = React.createClass({
	render(){
		return(
				<Router history={hashHistory}>
					<Route path='/' component={Navbar}>
						<Route path='/product' component={ProductPage}/>
						<Route path='/client' component={ClientPage}/>
					</Route>
				</Router>
			);
	}
});

export default App;