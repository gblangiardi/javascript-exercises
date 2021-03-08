"use strict";

function Exam(code, name, cfu, score, laude, date){
    this.code=code;
    this.name=name;
    this.cfu=cfu;
    this.score=score;

    if(this.score === 30)
        this.laude=laude;
    else
        this.laude=false;
    
    this.date=date;
    
}

function ExamList(){
    this.exams = [];

    this.add = (ex) => (this.exams.push(ex));

    this.find = function(code){
        
        const result = this.exams.filter((s) => (code === s.code));

        if(result.length === 1)
            return result;
    }

    this.afterDate = function(date){
        const result = this.exams.filter(ex => ex.date > date);

        return result;
    }

    this.listByDate = function(){

        const result = this.exams.sort((a, b) => {
            if(a.date > b.date)
                return 1;
            else if(a.date === b.date)
                return 0;
            else if(a.date < b.date)
                return -1;
        });
        return result;
    }

    this.listByScore = () => {
        const result = this.exams.sort((a, b) => {
            if(a.score > b.score)
                return -1;
            else if(a.score === b.score)
                return 0;
            else if(a.score < b.score)
                return 1;
        })

        return result;
    } 

    this.average = () => {
        let avg = 0;
        let i=0;

        this.exams.forEach((s) => {
            avg = avg + s.score;
            i++;
        })

        avg=avg/i;
        avg=Math.round(avg);
        return avg;
    }

    this.printAll = () => (this.exams.forEach((s) => (console.log(s))));

}

let wa = new Exam("231hx", "Web Applications 1", 6, 19, true, "2021-06-27");
let sdp = new Exam("3xjk5", "System and Device Programming", 10, 30, true, "2030-09-22");
let apa = new Exam("34hjd", "Algorithms and Programming", 10, 20, false, "2018-02-19");

let myExams = new ExamList();
myExams.add(wa);
myExams.add(sdp);
myExams.add(apa);

//console.log(myExams.find("3xjk5"));

//console.log(myExams.afterDate("2030-01-01"));

//console.log(myExams.listByDate());

console.log(myExams.listByScore());
console.log(myExams.average());

//myExams.printAll();

