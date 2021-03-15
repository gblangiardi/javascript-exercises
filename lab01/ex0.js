"use strict mode"

let arr = ["spring", "winter", "summer", "autmn", "ye"];

for(let word of arr){
    let length = word.length;
    if(length >= 4)
        console.log(word[0]+word[1]+word[length-2]+word[length-1]);
    else   
        console.log("");
}