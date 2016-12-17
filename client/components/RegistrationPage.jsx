import React from 'react';
import SubmitButton from './SubmitButton.jsx';

const RegistrationPage = React.createClass({
	render(){
		return(
				<div>
					<input type="text" handle={this.handleUserName}/>
					<input type="text" handle={this.handleMail}/>
					<input type="password" handle={this.handlePassword}/>
					<input type="password" handle={this.handlePasswordRepeat}/>
					<SubmitButton/>
				</div>
			);
	}
});

export default RegistrationPage;