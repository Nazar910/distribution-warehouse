import React from 'react';
import '../Item.less';

const Ttn = React.createClass({
	showTitles(){
		console.log(this.props.titleP2);
	},
	printTtn(){
		var mywindow = window.open('','printDiv','height=600,width=1000,top=0,left=0');
		var hello = 'Добрый день';
		let optionalThs= this.props.titleP3 == '' && this.props.titleP4 == ''?
		`<th>${this.props.labels.aviaTicket}</th>`: 
		this.props.titleP4 == ''?
		`<th>${this.props.labels.trainTicket}</th><th>${this.props.labels.coachId}</th>`:
		`<th>${this.props.labels.nTrip}</th><th>${this.props.labels.nAuto}</th><th>${this.props.labels.driverFIO}</th>`;
		let optionalTds= this.props.titleP3 == '' && this.props.titleP4 == ''?
		`<td>${this.props.p2}</td>`: 
		this.props.titleP4 == ''?
		`<td>${this.props.p2}</td><td>${this.props.p3}</td>`:
		`<td>${this.props.p2}</td><td>${this.props.p3}</td><td>${this.props.p4}</td>`;
		let table=`<table border="1"><tr align="center"><th>${this.props.labels.id}</th><th>${this.props.labels.agreement}</th>`+
		`<th>${this.props.labels.client}</th><th>${this.props.labels.container}</th>`+
		`<th>${this.props.labels.containerCount}</th><th>${this.props.labels.transportKind}</th>`+
		`<th>${this.props.labels.transportSumm}</th>${optionalThs}</tr>`+
		`<tr><td>${this.props.id}</td><td>${this.props.agreement}</td><td>${this.props.product}</td><td>${this.props.container}</td>`+
		`<td>${this.props.container_count}</td><td>${this.props.transport}</td><td>${this.props.transport_summ}</td>${optionalTds}</tr></table>`;
		mywindow.document.write(`<html><head><title></title></head><body>${table}</body></html>`);
		mywindow.print();
	},
	render(){
		return(		
					<tr className="Item">
						<td>{this.props.agreement}</td>
						<td>{this.props.product}</td>
						<td>{this.props.container}</td>
						<td>{this.props.container_count}</td>
						<td>{this.props.transport}</td>
						<td>{this.props.transport_summ}</td>
						<td title={this.props.titleP2}>{this.props.p2}</td>
						<td title={this.props.titleP3}>{this.props.p3}</td>
						<td title={this.props.titleP4}>{this.props.p4}</td>
						<td><span className='Item__del-edit' onClick={this.printTtn}>{this.props.labels.print}&nbsp;&nbsp;</span></td>
						<td><span className='Item__del-edit' onClick={this.props.onEdit}>{this.props.labels.edit}&nbsp;&nbsp;</span></td>
						<td><span className='Item__del-edit' onClick={this.props.onDelete}> x&nbsp;&nbsp; </span></td>
					</tr>
			);
	}
});

export default Ttn;
