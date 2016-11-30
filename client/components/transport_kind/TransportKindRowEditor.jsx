import React from 'react';
import SubmitButton from '../SubmitButton.jsx';
import AddButton from '../AddButton.jsx';
import '../Editor.less';

function getState(){
	return {
			name:'',
			name_p2:'',
			name_p3:'',
			name_p4:''
		}	
}
const TransportKindRowEditor = React.createClass({
	getInitialState() {
		return getState();
	},
	handleNameChange(event){
		this.setState({ name: event.target.value });
	},
	handleNameP2Change(event){
		this.setState({ name_p2: event.target.value });
	},
	handleNameP3Change(event){
		this.setState({ name_p3: event.target.value });
	},
	handleNameP4Change(event){
		this.setState({ name_p4: event.target.value });
	},
	handleTransportKindAdd(){
		const newTransportKind = {
			name:this.state.name,
			name_p2:this.state.name_p2,
			name_p3:this.state.name_p3,
			name_p4:this.state.name_p4
		};
		this.props.onTransportKindAdd(newTransportKind);
		this.setState(getState());
	},
	handleTransportKindUpdate(){
		const updatedTransportKind = {
			id: this.props.transportKind.id,
			name:this.state.name,
			name_p2:this.state.name_p2,
			name_p3:this.state.name_p3,
			name_p4:this.state.name_p4
		};
		this.props.onTransportKindUpdate(updatedTransportKind);
		this.setState(getState);
	},
	handleInputs(){
		this.setState({
				name:this.props.transportKind.name,
				name_p2:this.props.transportKind.name_p2,
				name_p3:this.props.transportKind.name_p3,
				name_p4:this.props.transportKind.name_p4
			});
	},
	clearInputs(){
		this.setState(getState);
	},
	render(){
		return(
				<div>
					<input
						type="text"
						placeholder="name"
						value={this.state.name}
						onChange={this.handleNameChange}
					/>
					<input
						type="text"
						placeholder="name_p2"
						value={this.state.name_p2}
						onChange={this.handleNameP2Change}
					/>
					<input
						type="text"
						placeholder="name_p3"
						value={this.state.name_p3}
						onChange={this.handleNameP3Change}
					/>
					<input
						type="text"
						placeholder="name_p4"
						value={this.state.name_p4}
						onChange={this.handleNameP4Change}
					/>
					{!this.props.shouldEdit ?
					<AddButton 
						disabled={!this.state.name}
						handleAdd={this.handleTransportKindAdd}
						clear={this.clearInputs}
					/> :
                    <SubmitButton 
                     	onEditChange={this.handleInputs}
                     	onSubmit={this.handleTransportKindUpdate}
                    />
                    }
                    <div>{this.props.error}</div>
				</div>
			);
	}
});

export default TransportKindRowEditor;