import dayjs from "dayjs";


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
            console.log(`Id: ${tsk.id}, Description: ${tsk.desc}, Urgent: ${tsk.urgent}, personal: ${tsk.personal}, Deadline: ${tsk.date}`);
        }
    }

    this.urgentFilter = function(){
        const result = this.tasks.filter((t) => (t.urgent));
        return result;
    }

    this.personalFilter = function(){
        const result = this.tasks.filter((t) => (t.personal));
        return result;
    }

    this.todayFilter = function(){
        const result = this.tasks.filter((t) => {
            if(t.date !== undefined)
                return t.date.format('DD/MM/YYYY') === dayjs().format('DD/MM/YYYY');
            else
                return false;
        });
        return result;
    }

    this.nextDaysFilter = function(){
        const result = this.tasks.filter((t) => {
            if(t.date !== undefined)
                return (t.date.diff(dayjs(), "day") <= 7 && t.date.diff(dayjs(), "day") >= 0);
            else
                return false;
        });
        return result;
    }

    this.printAll = () => (console.log(...this.tasks));
}

function Task(id, desc, urgent=false, personal=true, date=undefined){

    this.id=id;
    this.desc=desc;

    
    this.urgent=urgent;
       
    this.personal = personal;

    this.date=date;
    
}

let list = new TaskList();

    let today = dayjs();
    let anotherday = dayjs('2021-07-05T17:00');

    let dentist = new Task(13, "Appointment with the dentist", true, true, today);
    let lab = new Task(32, "WA1 laboratory to do", true, false, today);
    let calcetto = new Task(5, "Football match with friends", false, false, anotherday);
    let graduate = new Task(34, "Get this degree", false, true, undefined);

    list.add(graduate);
    list.add(dentist);
    list.add(lab);
    list.add(calcetto);
export default list;