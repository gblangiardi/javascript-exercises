"use strict mode"

const courseList = "Web Applications I, Computer Architectures, Data Science and Database Technology, Computer network technologies and services, Information systems security, Software engineering, System and device programming";

let courses = courseList.split(", ");

function createAcr(words){
    let acr = "";
    for(let n of words){
        acr = acr + n[0];
    }

    return acr;
}

/*for(let i=0; i<courses.length; i++)
    courses[i].trim;*/


console.log(...courses);

let tmp;
let acronyms = [];
let i=0;

for(let n of courses){
    n = n.toUpperCase();
    tmp = n.split(" ");
    acronyms[i++] = createAcr(tmp);
}

acronyms.sort();

console.log(acronyms);