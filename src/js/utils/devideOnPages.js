// -------------example--------------
const arrayOfId = [9, 3, 6, 4, 6, 0, 6, 8, 9, 10, 11, 12, 15];
const perPageAmount = 3;
const newArr = [];

function divideOnPages(idEl, count) {
  idEl.map((elem, inde, arr) => {
    while (idEl.length > 0) {
      newArr.push(arr.splice(0, count));
    }
    return newArr;
  });
}
divideOnPages(arrayOfId, perPageAmount);

//функция которая принимает массив id (в частности из localStorage)
//и возвращает двухмерный массив

//для примера
//[1,2,3,4,5,6,7,8,9,10,11,12] - arrayOfId, perPageAmount - 4    - входящие параметры

//на выходе должны получить двухмерный массив
//[0]=[1,2,3,4]
//[1]=[5,6,7,8]
//[2]=[9,10,11,12]

export { divideOnPages };
