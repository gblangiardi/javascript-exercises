"use strict mode"

const dayjs = require('dayjs');

function Task(id, desc, urgent=false, private=true, date=undefined){

    this.id=id;
    this.desc=desc;

    
    this.urgent=urgent;
       
    this.private = private;

    this.date=date;
    
}

function TaskList(){
    this.tasks = [];

    this.add = (tsk) => (this.tasks.push(tsk));

    this.sortAndPrint = function(){

        const sorted = this.tasks.sort((a, b) => {
            if(a.date === undefined)
                return 1;
            else
                return a.date.isAfter(b.date);
        });

        console.log("****** Tasks sorted by deadline (most recent first): ******");
        for(let tsk of sorted){
            console.log(`Id: ${tsk.id}, Description: ${tsk.desc}, Urgent: ${tsk.urgent}, Private: ${tsk.private}, Deadline: ${tsk.date}`);
        }
    }

    this.filterAndPrint = function(){
        const result = this.tasks.filter((t) => (t.urgent));

        console.log("****** Tasks filtered, only (urgent == true): ******");
        for(let tsk of result){
            console.log(`Id: ${tsk.id}, Description: ${tsk.desc}, Urgent: ${tsk.urgent}, Private: ${tsk.private}, Deadline: ${tsk.date}`);
        }
    }


    this.printAll = () => (console.log(...this.tasks));
}

let list = new TaskList();

let today = dayjs('2021-05-15T12:00');
let anotherday = dayjs('2021-04-05T17:00');

let dentist = new Task(13, "Appointment with the dentist", true, true, today);
let lab = new Task(32, "WA1 laboratory to do", true, false, today);
let calcetto = new Task(5, "Football match with friends", false, false, anotherday);
let graduate = new Task(34, "Get this degree", false, true, undefined);

list.add(graduate);
list.add(dentist);
list.add(lab);
list.add(calcetto);
//list.printAll();
list.sortAndPrint();
list.filterAndPrint();

