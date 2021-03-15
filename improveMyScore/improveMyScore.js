"use strict mode"

let grades = [24, 30, 18, 19, 28, 26, 19, 30];

console.log("The initial array is:");
console.log(...grades);

let min=30;
let min2=30;
let avg=0;

for(n of grades){
    avg=avg+n;

    if(n < min){
        min2=min;
        min=n;
    }
    else if(n < min2){
        min2=n;
    } 
}

avg=avg/grades.length;
avg=Math.round(avg);

console.log("The initial rounded average is: "+ avg);
console.log("");

let index = grades.indexOf(min);
grades.splice(index, 1);
index = grades.indexOf(min2);
grades.splice(index, 1);

avg = 0;

for(n of grades){

    avg += n;

}

avg = avg/grades.length;
avg=Math.round(avg);

grades.push(avg);
grades.push(avg);

avg = 0;

for(n of grades){

    avg += n;

}

avg = avg/grades.length;
avg=Math.round(avg);

console.log("Improved grades are:");
console.log(...grades);
console.log("New average is: "+avg);