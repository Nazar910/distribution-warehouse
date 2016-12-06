	const array = [ 8,4,7,1,3,7,0,5,2 ];
	console.log(array);
    var temp, // временная переменная для хранения значения элемента сортируемого массива
        item; // индекс предыдущего элемента
    for (var counter = 1; counter < array.length; counter++)
    {
        temp = array[counter]; // инициализируем временную переменную текущим значением элемента массива
        item = counter-1; // запоминаем индекс предыдущего элемента массива
        while(item >= 0 && array[item] > temp) // пока индекс не равен 0 и предыдущий элемент массива больше текущего
        {
            array[item + 1] = array[item]; // перестановка элементов массива
            array[item] = temp;
            item--;
        }
    }
console.log(array);