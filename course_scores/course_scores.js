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

    this.printAll = () => (this.exams.forEach((s) => (console.log(s))));

}

let wa = new Exam("231hx", "Web Applications 1", 6, 30, true, "2021-06-27");
let sdp = new Exam("3xjk5", "System and Device Programming", 10, 18, true, "2030-09-22");

let myExams = new ExamList();
myExams.add(wa);
myExams.add(sdp);

myExams.printAll();

