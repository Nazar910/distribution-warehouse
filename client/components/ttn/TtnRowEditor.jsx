import React from 'react';
import SubmitButton from '../SubmitButton.jsx';
import AddButton from '../AddButton.jsx';
import Store from '../../stores/Store.jsx';
import '../Editor.less';

function getState(){
	return {
			agreement_id: 1,
			product_id: 1,
			container_id: 1,
			container_count: 1,
			transport_kind: 1,
			transport_summ: 0,
			p2: 1,
			p3: ' ',
			p4: ' '
		}	
}
const TtnRowEditor = React.createClass({
	getInitialState() {
		return getState();
	},
	handleAgreementIdChange(event){
		this.setState({ agreement: event.target.value });
	},
	handleProductIdChange(event){
		this.setState({ product: event.target.value });
	},
	handleContainerIdChange(event){
		this.setState({ container: event.target.value });
	},
	handleContainerCountChange(event){
		if(event.target.value){
			this.setState({ container_count: event.target.value });
		}
	},
	handleTransportKindChange(event){
		this.setState({ transport_kind: event.target.value });
	},
	handleTransportSummChange(event){
		if(event.target.value>0){
			this.setState({ transport_summ: event.target.value });
		}
	},
	handleP2Change(event){
		this.setState({ p2: event.target.value });
	},
	handleP3Change(event){
		if(event.target.value){
			this.setState({ p3: event.target.value });
		}
	},
	handleP4Change(event){
		if(event.target.value){
			this.setState({ p4: event.target.value });
		}
	},
	handleTtnAdd(){
		const newTtn = {
			agreement_id   :this.state.agreement_id,
			product_id     :this.state.product_id,
			container_id   :this.state.container_id,
			container_count:this.state.container_count,
			transport_kind :this.state.transport_kind,
			transport_summ :this.state.transport_summ,
			p2             :this.state.p2,
			p3             :this.state.p3,
			p4             :this.state.p4
		};
		this.props.onTtnAdd(newTtn);
		this.setState(getState());
	},
	handleTtnUpdate(){
		const updatedTtn = {
			id             :this.props.ttn.id,
			agreement_id   :this.state.agreement_id,
			product_id     :this.state.product_id,
			container_id   :this.state.container_id,
			container_count:this.state.container_count,
			transport_kind :this.state.transport_kind,
			transport_summ :this.state.transport_summ,
			p2             :this.state.p2,
			p3             :this.state.p3,
			p4             :this.state.p4
		};
		this.props.onTtnUpdate(updatedTtn);
		this.setState(getState);
	},
	handleInputs(){
		this.setState({
				agreement_id   :this.props.ttn.agreement_id,
				product_id     :this.props.ttn.product_id,
				container_id   :this.props.ttn.container_id,
				container_count:this.props.ttn.container_count,
				transport_kind :this.props.ttn.transport_kind,
				p2             :this.props.ttn.p2,
				p3             :this.props.ttn.p3,
				p4             :this.props.ttn.p4
			});
	},
	clearInputs(){
		this.setState(getState);
	},
	handleSelectAgreementId(event){
		this.setState({ agreement_id: event.target.value })
	},
	handleSelectProduct(event){
		this.setState({ product_id: event.target.value })
	},
	handleSelectContainer(event){
		this.setState({ container_id: event.target.value })
	},
	handleSelectTransportKind(event){
		if(event.target.value == 1){
			this.setState({ p3: ' ', p4: ' ' });
		}
		else if(event.target.value == 2){
			this.setState({ p3: ' ',p4: ''});
		}
		else if(event.target.value == 3){
			this.setState({ p3: '', p4: '' });
		}
		this.setState({ transport_kind: event.target.value})
	},
	render(){
		return(
				<div>
					<select value={this.state.agreement_id} onChange={this.handleSelectAgreementId}>
						{
							this.props.agreements.map(agreement=>
									<option
										key={agreement.id}
										value={agreement.id}
									>
										{agreement.id}
									</option>
								)
						}
					</select>
					<select value={this.state.product_id} onChange={this.handleSelectProduct}>
						{
							this.props.products.map(product=>
									<option
										key={product.id}
										value={product.id}
									>
										{product.name}
									</option>
								)
						}
					</select>
					<select value={this.state.container_id} onChange={this.handleSelectContainer}>
						{
							this.props.containers.map(container=>
									<option
										key={container.id}
										value={container.id}
									>
										{container.name}
									</option>
								)
						}
					</select>

					<input
						type="number"
						placeholder="container_count"
						min="1"
						value={this.state.container_count}
						onChange={this.handleContainerCountChange}
					/>
					<select value={this.state.transport_kind} onChange={this.handleSelectTransportKind}>
						{
							this.props.transportKinds.map(transportKind=>
									<option
										key={transportKind.id}
										value={transportKind.id}
									>
										{transportKind.name}
									</option>
								)
						}
					</select>
					<input
						type="number"
						placeholder="transport_summ"
						value={this.state.transport_summ}
						min="1"
						onChange={this.handleTransportSummChange}
					/>
					<input
						type="number"
						placeholder="p2"
						min="1"
						value={this.state.p2}
						onChange={this.handleP2Change}
					/>
					<input
						type="number"
						placeholder="p3"
						value={this.state.p3}
						disabled={this.state.transport_kind == 3}
						onChange={this.handleP3Change}
					/>
					<input
						type="number"
						placeholder="p4"
						value={this.state.p4}
						disabled={!(this.state.transport_kind == 1)}
						onChange={this.handleP4Change}
					/>
					{!this.props.shouldEdit ?
					<AddButton 
						handleAdd={this.handleTtnAdd}
						clear={this.clearInputs}
					/> :
                    <SubmitButton 
                     	onEditChange={this.handleInputs}
                     	onSubmit={this.handleTtnUpdate}
                    />
                    }
                    <div>{this.props.error}</div>
				</div>
			);
	}
});
export default TtnRowEditor;
