import React from 'react';
import SubmitButton from '../SubmitButton.jsx';
import AddButton from '../AddButton.jsx';
import '../Editor.less';
import customStyles from '../ModalStyles.js';
import Modal from 'react-modal';

function getState(){
	return {
			name:'',
			factory:'',
			cost:1
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
  <Modal
  isOpen={this.props.modalIsOpen}
  onAfterOpen={this.props.afterOpen}
  onRequestClose={this.props.closeModal}
  style={customStyles}
  >
  <span className="Close" onClick={this.props.closeModal}> x </span>
  <div className="Info">
    <div className="Labels">{this.props.labels.title}</div>
    <div className="Labels">{this.props.labels.factory}</div>
    <div className="Labels">{this.props.labels.cost}</div>
  </div>
  <div className="Info">
      <div><input
        type="text"
        placeholder={this.props.labels.title}
        value={this.state.name}
        onChange={this.handleNameChange}
        /></div>
        <div><input
          type="text"
          placeholder={this.props.labels.factory}
          value={this.state.factory}
          onChange={this.handleFactoryChange}
          /></div>
          <div><input
            type="number"
            placeholder={this.props.labels.cost}
            value={this.state.cost}
            min="1"
            onChange={this.handleCostChange}
            /></div></div>
                {!this.props.shouldEdit ?
                <AddButton
                handleAdd={this.handleContainerAdd}
                clear={this.clearInputs}
                closeModal={this.props.closeModal}
                /> :
                <SubmitButton
                onEditChange={this.handleInputs}
                onSubmit={this.handleContainerUpdate}
                closeModal={this.props.closeModal}
                />
              }
              <div>{this.props.error}</div>
            </Modal>       
          </div>
			);
	}
});

export default ContainerRowEditor;