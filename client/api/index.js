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
	}
}