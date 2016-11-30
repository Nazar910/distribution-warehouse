
export default{ 
	handle(data,reply){
		// switch(data.error){
		// 	case 'ER_DUP_ENTRY':{
		// 		reply('Unique value is needed');
		// 		break;
		// 	}
		// 	case 'ER_ROW_IS_REFERENCED_2':{
		// 		reply('Cannot delete or update this row. It can be refferenced in the other tables');
		// 		break;
		// 	}
		// 	default :{
		// 		reply('Unknown error');
		// 	}
		// }
		reply(data.message.split(':')[1]);
	}
}