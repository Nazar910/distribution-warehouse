import React from 'react';
import SubmitButton from '../SubmitButton.jsx';
import AddButton from '../AddButton.jsx';
import '../Editor.less';

function getState(){
	return {
			name:'',
			factory:'',
			cost:0
		}	
}
const ContainerRowEditor = React.createClass({
	getInitialState() {
		return getState();
	},
	handleNameChange(event){
		this.setState({ name: event.target.value });
	},
	handleFactoryChange(event){
		this.setState({ factory: event.target.value });
	},
	handleCostChange(event){
		this.setState({ cost: event.target.value });
	},
	handleContainerAdd(){
		const newContainer = {
			name:this.state.name,
			factory:this.state.factory,
			cost:this.state.cost
		};
		this.props.onContainerAdd(newContainer);
		this.setState(getState());
	},
	handleContainerUpdate(){
		const updatedContainer = {
			id: this.props.container.id,
			name:this.state.name,
			factory:this.state.factory,
			cost:this.state.cost
		};
		this.props.onContainerUpdate(updatedContainer);
		this.setState(getState);
	},
	handleInputs(){
		this.setState({
				name:this.props.container.name,
				factory:this.props.container.factory,
				cost:this.props.container.cost
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
						placeholder="factory"
						value={this.state.factory}
						onChange={this.handleFactoryChange}
					/>
					<input
						type="number"
						placeholder="cost"
						value={this.state.cost}
						min="1"
						onChange={this.handleCostChange}
					/>
					{!this.props.shouldEdit ?
					<AddButton 
						disabled={!this.state.name}
						handleAdd={this.handleContainerAdd}
						clear={this.clearInputs}
					/> :
                    <SubmitButton 
                     	onEditChange={this.handleInputs}
                     	onSubmit={this.handleContainerUpdate}
                    />
                    }
                    <div>{this.props.error}</div>
				</div>
			);
	}
});

export default ContainerRowEditor;