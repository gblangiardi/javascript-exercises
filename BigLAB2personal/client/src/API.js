import {TaskList} from './Task.js';

async function loadTasks(apiFilter){
    try{
      const response = await fetch('/apis/filter/' + apiFilter, {
        method : 'GET',
        headers : {
          "Content-Type" : "application/json"
        }
      });
      const dbList = await response.json();
      let newTasks = new TaskList([]);
      dbList.forEach(e => {
        newTasks.add(e);
      });


      return newTasks;

    }
    catch(err){
      console.log(err);
    }
  }

  async function myAdd(task){

    const newT = {"description" : task.description, "important" : task.important, "private" : task.private, "deadline" : task.deadline, "user" : 1}

    await fetch('/apis/tasks', {
      method : 'POST',
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(newT)
    });
  }

  async function deleteTask(task){
    await fetch('/apis/tasks/'+task.id, {
      method : 'DELETE',
    });
  }

  async function modifyTask(task){
    const newT = {"id" : task.id, "description" : task.description, "important" : task.important, "private" : task.private, "deadline" : task.deadline, "user" : 1}
    await fetch('/apis/tasks', {
      method : 'PUT',
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(newT)
    });
  }

  async function setCompleted(id, completed){
    const reqBody = {"id" : id, "completed" : completed};
    await fetch('/apis/completed', {
      method : 'PUT',
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(reqBody)
    });
  }

 const API = { loadTasks, myAdd, deleteTask, modifyTask, setCompleted };
 export default API;