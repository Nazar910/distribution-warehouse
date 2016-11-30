import axios from 'axios';
import { apiPrefix } from '../../config.json';

export default{
	listProducts(){
		return axios.get(`${apiPrefix}/products`);
	},
	createProduct(data){
		return axios.post(`${apiPrefix}/products`,data);
	},
	deleteProduct(id){
		return axios.delete(`${apiPrefix}/products/${id}`);
	},
	updateProduct(data){
		return axios.post(`${apiPrefix}/products/${data.id}`,data);
	},
	listClients(){
		return axios.get(`${apiPrefix}/clients`);
	},
	createClient(data){
		return axios.post(`${apiPrefix}/clients`,data);
	},
	deleteClient(id){
		return axios.delete(`${apiPrefix}/clients/${id}`);
	},
	updateClient(data){
		return axios.post(`${apiPrefix}/clients/${data.id}`,data);
	},
	listContainers(){
		return axios.get(`${apiPrefix}/containers`);
	},
	createContainer(data){
		return axios.post(`${apiPrefix}/containers`,data);
	},
	deleteContainer(id){
		return axios.delete(`${apiPrefix}/containers/${id}`);
	},
	updateContainer(data){
		return axios.post(`${apiPrefix}/containers/${data.id}`,data);
	},
	listTransportKinds(){
		return axios.get(`${apiPrefix}/transport_kinds`);
	},
	createTransportKind(data){
		return axios.post(`${apiPrefix}/transport_kinds`,data);
	},
	deleteTransportKind(id){
		return axios.delete(`${apiPrefix}/transport_kinds/${id}`);
	},
	updateTransportKind(data){
		return axios.post(`${apiPrefix}/transport_kinds/${data.id}`,data);
	},
	listAgreements(){
		return axios.get(`${apiPrefix}/agreements`);
	},
	createAgreement(data){
		return axios.post(`${apiPrefix}/agreements`,data);
	},
	deleteAgreement(id){
		return axios.delete(`${apiPrefix}/agreements/${id}`);
	},
	updateAgreement(data){
		return axios.post(`${apiPrefix}/agreements/${data.id}`,data);
	},
	listTtns(){
		return axios.get(`${apiPrefix}/ttns`);
	},
	createTtn(data){
		return axios.post(`${apiPrefix}/ttns`,data);
	},
	deleteTtn(id){
		return axios.delete(`${apiPrefix}/ttns/${id}`);
	},
	updateTtn(data){
		return axios.post(`${apiPrefix}/ttns/${data.id}`,data);
	}
}