'use strict'

const express = require('express');
const morgan = require('morgan');
const dao = require("./dao");

const PORT = 3001;

const app = new express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello from your server!");
});

app.get('/apis/tasks/:id', async (req, res) => {
    const code = req.params.id;
    try {
        let task = await dao.getTaskById(code);
        res.json(task);
    } catch (error) {
        res.status(500).json(error);
    }

});

app.get('/apis/tasks', (req, res) => {
    dao.listAllTasks()
    .then((tasks) => {res.json(tasks)})
    .catch((err) => {res.status(500).json(err)});
});

app.get('/apis/filter/:filterId', (req, res) => {

    let promiseFunct;

    switch(req.params.filterId){
        case 'all':
            promiseFunct = dao.listAllTasks;
            break;
        case 'important':
            promiseFunct = dao.listImportant;
            break;
        case 'private':
            promiseFunct = dao.listPrivate;
            break;
        case 'next7days':
            promiseFunct = dao.list7Days;
            break;
        case 'today':
            promiseFunct = dao.listToday;
            break;
        default:
            res.status(500).send("Unknown filter option.");
            break;

    }

    if(promiseFunct !== undefined){
        promiseFunct()
            .then((tasks) => {
                res.json(tasks);
            })
            .catch((err) => {res.status(500).json(err)});
    }
});

app.post('/apis/tasks', async (req, res) => {
    
    let description = req.body.description;
    let important = req.body.important;
    let priv = req.body.private;
    let deadline = req.body.deadline;
    let user = req.body.user;
    let completed = req.body.completed;
    try {
        let id = await dao.createTask({ description: description, important: important, 
            private : priv, deadline: deadline, completed: completed, user: user});
        res.json(id);
    } catch (error) {
        res.status(500).json(error);
    }
});

app.put("/apis/tasks", (req, res) => {
    dao.updateTask({id: req.body.id, description : req.body.description, important : req.body.important,
        private : req.body.private, deadline : req.body.deadline, user : req.body.user})
        .then((id) => {res.json(id)})
        .catch((err) => {res.status(500).json(err)});
});

app.put("/apis/completed", async (req, res) => {
    try{
        let id = await dao.setCompleted(req.body.id, req.body.completed);
            res.end();
    }
    catch(error){
        res.status(500).json(error);
    }
});

app.delete('/apis/tasks/:id', async (req, res) => {
    const code = req.params.id;
    try {
        let task = await dao.deleteTask(code);
        res.end();
    } catch (error) {
        res.status(500).json(error);
    }

});

app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}/`));