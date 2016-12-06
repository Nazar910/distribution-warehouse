export function sort(array,field){
	let temp, item;
	for (let counter = 1; counter < array.length; counter++){
          temp = array[counter]; 
          item = counter-1; 
          while(item >= 0 && array[item][field] > temp[field]) {
            array[item + 1] = array[item];
            array[item] = temp;
            item--;
           }
 	}
}
export function sortReverse(array,field){
	let temp, item;
	for (let counter = 1; counter < array.length; counter++){
          temp = array[counter]; 
          item = counter-1; 
          while(item >= 0 && array[item][field] < temp[field]) {
            array[item + 1] = array[item];
            array[item] = temp;
            item--;
           }
 	}
}