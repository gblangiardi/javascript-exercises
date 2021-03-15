"use strict mode"

const sqlite = require('sqlite3');
const dayjs = require('dayjs');

const db = new sqlite.Database("./tasks.db", 
    (err) => {if(err) throw err});

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
    
        this.printAll = () => {
            this.tasks.forEach((tsk) => {
                console.log(`Id: ${tsk.id}, Description: ${tsk.desc}, Urgent: ${tsk.urgent}, Private: ${tsk.private}, Deadline: ${tsk.date}`);
            })
        };
    }

let list = new TaskList();
let today = dayjs();
let list2 = new TaskList();
let list3 = new TaskList();

const sql = "SELECT * FROM tasks"

db.all(sql, (err, rows) => {
    if(err) throw err;

    console.log("******All the tasks present in the db******");
    rows.forEach((s) => {
        list.add(new Task(s.id, s.description, s.urgent, s.private, dayjs(s.deadline)));
    });

    list.printAll();
})

const sql2= "SELECT * FROM tasks WHERE deadline > ?";

db.all(sql2, today.format(), (err, rows) => {
    if(err) throw err;

    console.log("******All the tasks present in the db with deadline > today******");
    rows.forEach((s) => (list2.add(new Task(s.id, s.description, s.urgent, s.private, dayjs(s.deadline)))));

    list2.printAll();

});

const sql3 = "SELECT * FROM tasks WHERE description LIKE ?"

db.all(sql3, "%lab%", (err, rows) => {
    if(err) throw err;

    console.log("******Show tasks whose description is similar to 'lab'******");
    rows.forEach((s) => (list3.add(new Task(s.id, s.description, s.urgent, s.private, dayjs(s.deadline)))));

    list3.printAll();
})
db.close();