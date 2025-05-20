const arrayOfElements =[4, 4, 8, 3, 3, 3, 2, 4, 4]
console.log("Вивести кожен елемент масиву:")
console.log(arrayOfElements)
console.log("або через цикл:")
arrayOfElements.forEach(item=>{
    console.log(item)
})


console.log("Вивести перші 3 елементи масиву:")
console.log(arrayOfElements[0],arrayOfElements[1],arrayOfElements[2])


console.log("Вивести суму всіх елементів:")
console.log(arrayOfElements[0]+arrayOfElements[1]+arrayOfElements[2]+arrayOfElements[3]+arrayOfElements[4]+arrayOfElements[5]+arrayOfElements[6]+arrayOfElements[7]+arrayOfElements[8]) // так додумалась я, інші два нижче допоміг chatgpt

var sum =0;
for (var i=0; i<arrayOfElements.length; i++){
    sum+=arrayOfElements[i];    // += - це скорочена форма запису: a += b (те саме, що: a = a + b)
}
console.log(sum)

const summ = arrayOfElements.reduce ((acc, value) => acc+value, 0);
console.log(summ)
//reduce() - Метод, який згортає масив в одне значення
// (acc, value)	Це функція, яку reduce() викликає для кожного елемента
// acc	Accumulated value — накопичувач, тобто те, що повертається кожного разу
// value	Поточне значення з масиву
// 0	Початкове значення для acc (тобто sum = 0)
console.log("Вивести суму всіх елементів окрім елемента що = 4:")
var sum2 =0;
for (var i=0; i<arrayOfElements.length; i++){
    if (arrayOfElements[i]!=4){
        sum2+=arrayOfElements[i];
    } 
}
console.log(sum2); // - тут я зробила сама(чому приємно здивована), але нижче написала для себе варіанти які запропонував chatgpt

let summ2 = 0;
arrayOfElements.forEach(num =>{
    if (num !== 4){
        summ2 += num;
    }
})
console.log(summ2)

const sum3 = arrayOfElements
.filter(num => num!==4)
.reduce((acc, val)=> acc+val,0);
console.log(sum3)
//filter() — фільтрує масив. Мутод, який створює новий масив, що містить лише ті елементи, які задовольняють умову.
//reduce() — згортає масив до одного значення.Метод проходить по масиву й поступово накопичує одне значення (наприклад, суму, добуток, об’єднану строку тощо).
//acc (accumulator) — накопичувач (починається з 0)
//val — поточне значення з масиву

console.log("Вивести на екран ID та name обєктів lists:")
import{readFileSync} from 'fs';
var body = readFileSync('lists.json','utf8');
const data = JSON.parse(body);
for (var i=0; i<data.lists.length; i++){
    console.log(data.lists[i].name)
    console.log(data.lists[i].id)
}