//This file contains the method to use the database
const sqlite = require('sqlite3');
const dayjs = require('dayjs');

const db = new sqlite.Database('tasks.db', (err) => {
    if(err) throw err;
});

let lastId;
const getLastId = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT max(id) as lastId FROM tasks';
        db.get(sql, [], (err, row) => {
            if(err) reject(err);
            if(row === undefined){
                lastId = 0;
            }
            else
                lastId = row.lastId;

        });
    });
}

getLastId().then().catch();

exports.listAllTasks = () => {
    return new Promise(
        (resolve, reject) =>{
            const sql= "SELECT * FROM tasks";
            db.all(sql, [], (err, rows) => {
                if(err){
                    reject(err);
                    return;
                }
                const tasks = rows.map((e) => ({id : e.id, desc : e.description, 
                                                important : e.important, private : e.private,
                                                deadline : e.deadline, completed : e.completed,
                                                user : e.user}));
                resolve(tasks);
            });
        });
}

exports.getTaskById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM tasks WHERE id=?';
        db.get(sql, [id], (err, row) =>{
            if(err){
                reject(err);
                return;
            }
            if(row === undefined){
                reject({error : 'task not found'});
            }
            else{
                const task = {id : row.id, description : row.description, important : row.important,
                                private : row.private, deadline : row.deadline, completed : row.completed, user : row.user};
                resolve(task);
            }
        });
    });
}

exports.deleteTask = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM tasks WHERE id=?';
        db.run(sql, [id], (err) =>{
            if(err){
                reject(err);
                return;
            }
           else resolve();
        });
    });
}

exports.createTask = (t) => {
    return new Promise((resolve, reject) =>{
        const sql = `INSERT INTO tasks(id, description, important, private, deadline, completed, user)
                    VALUES(?, ?, ?, ?, DATE(?), ?, ?)`;
        db.run(sql, [lastId+1, t.description, t.important, t.private, t.deadline, t.completed, t.user],
                (err) => {
                    if(err){
                        reject(err);
                        return;
                    }
                    else{
                        lastId++;
                        resolve(this.lastId);
                    }
                });
    });
}

exports.updateTask = (t) => {
    return new Promise((resolve, reject) => {
        const sql =`UPDATE tasks SET 
        description = ?, important = ?, private = ?, deadline=DATE(?), completed=?, user= ?
         WHERE id = ?`;
        db.run(sql, [t.description, t.important, t.private, t.deadline, t.completed, t.user, t.id],
            (err) => {
                if(err){
                    reject(err);
                    return;
                }
                resolve();
            });
    });
}

exports.listImportant = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM tasks WHERE important = 1';
        db.all(sql, [], (err, rows) => {
            if(err){
                reject(err);
                return;
            }
            else{
                const taks = rows.map((e) => ({id : e.id, desc : e.description, 
                                            important : e.important, private : e.private,
                                            deadline : e.deadline, completed : e.completed,
                                            user : e.user}));
                resolve(tasks);
            }
        });
    });
}

exports.listPrivate = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM tasks WHERE private = 1';
        db.all(sql, [], (err, rows) => {
            if(err){
                reject(err);
                return;
            }
            else{
                const taks = rows.map((e) => ({id : e.id, desc : e.description, 
                                            important : e.important, private : e.private,
                                            deadline : e.deadline, completed : e.completed,
                                            user : e.user}));
                resolve(tasks);
            }
        });
    });
}

exports.listToday = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM tasks WHERE deadline != NULL';
        db.all(sql, [], (err, rows) => {
            if(err){
                reject(err);
                return;
            }
            const taks = rows.map((e) => ({id : e.id, desc : e.description, 
                important : e.important, private : e.private,
                deadline : e.deadline, completed : e.completed,
                user : e.user})).filter((t) => (dayjs(t.deadline).isSame(dayjs(), 'date')));
            resolve(tasks);
        });
    });
}

exports.list7Days = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM tasks WHERE deadline != NULL';
        db.all(sql, [], (err, rows) => {
            if(err){
                reject(err);
                return;
            }
            const taks = rows.map((e) => ({id : e.id, desc : e.description, 
                important : e.important, private : e.private,
                deadline : e.deadline, completed : e.completed,
                user : e.user})).filter((t) => (dayjs(t.deadline).diff(dayjs(), 'day') >= 0 && dayjs(t.deadline).diff(dayjs(), 'day') <= 7));
            resolve(tasks);
        });
    });
}

exports.setCompleted = (id, completed) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE tasks SET completed = ? WHERE id=?';
        db.run(sql, [complete, id], (err) => {
            if(err){
                reject(err);
                return;
            }
            resolve();
        });
    });
}
