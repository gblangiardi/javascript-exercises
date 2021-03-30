'use strict mode'


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

    this.urgentFilter = function(){
        const result = this.tasks.filter((t) => (t.urgent));
        return result;
    }

    this.privateFilter = function(){
        const result = this.tasks.filter((t) => (t.private));
        return result;
    }

    this.todayFilter = function(){
        const result = this.tasks.filter((t) => (t.date.format('DD/MM/YYYY') === dayjs().format('DD/MM/YYYY')));
        return result;
    }

    this.nextDaysFilter = function(){
        const result = this.tasks.filter((t) => (t.diff(dayjs(), "day") >= 7));
        return result;
    }

    this.printAll = () => (console.log(...this.tasks));
}

function createListNode(tsk, i){
    let node = document.createElement('li');
    let div1 = document.createElement('div')
    node.className = "list-group-item";
    div1.className = "d-flex w-100 justify-content-between"
    let important;

    if(tsk.urgent)
        important="important";
    else
        important="";

    div1.innerHTML = `<div class="custom-control custom-checkbox">
    <input type="checkbox" class="custom-control-input" id="check-t${i}">
    <label class="custom-control-label ${important}" for="check-t${i}" id="label${i}">${tsk.desc}</label>
  </div>`;
 

    if(tsk.private){
        let fragm = `                <svg class="bi bi-person-square" width="1.2em" height="1.2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/>
        <path fill-rule="evenodd" d="M2 15v-1c0-1 1-4 6-4s6 3 6 4v1H2zm6-6a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
      </svg>`
        div1.insertAdjacentHTML('beforeend', fragm);
    }

    let day = document.createElement("small");

    if(tsk.date != undefined){
        day.innerText = tsk.date.format('DD-MM-YYYY');
    }
    div1.appendChild(day);

    node.appendChild(div1);

    return node;

}

let list = new TaskList();

let today = dayjs();
let anotherday = dayjs('2021-04-05T17:00');

let dentist = new Task(13, "Appointment with the dentist", true, true, today);
let lab = new Task(32, "WA1 laboratory to do", true, false, today);
let calcetto = new Task(5, "Football match with friends", false, false, anotherday);
let graduate = new Task(34, "Get this degree", false, true, undefined);

list.add(graduate);
list.add(dentist);
list.add(lab);
list.add(calcetto);

let node = document.getElementById("tasklist");
let i=0;
for(tsk of list.tasks){
    i++;
    let tmp = createListNode(tsk, i);
    node.appendChild(tmp);
}