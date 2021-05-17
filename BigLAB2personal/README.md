# BigLab 2 - Class: 2021 WA1

## Team name: Team BAE

Team members:
* s236053 Amato Andrea
* s288265 Blangiardi Francesco
* s280192 Blangiari Giovanni

## Instructions

A general description of the BigLab 2 is avaible in the `course-materials` repository, [under _labs_](https://github.com/polito-WA1-AW1-2021/course-materials/tree/main/labs/BigLab2/BigLab2.pdf). In the same repository, you can find the [instructions for GitHub Classroom](https://github.com/polito-WA1-AW1-2021/course-materials/tree/main/labs/GH-Classroom-BigLab-Instructions.pdf), covering this and the next BigLab.

Once cloned this repository, instead, write your names in the above section.

When committing on this repository, please, do **NOT** commit the `node_modules` directory, so that it is not pushed to GitHub.
This should be already automatically excluded from the `.gitignore` file, but double-check.

When another member of the team pulls the updated project from the repository, remember to run `npm install` in the project directory to recreate all the Node.js dependencies locally, in the `node_modules` folder.

Finally, remember to add the `final` tag for the final submission, otherwise it will not be graded.

## List of APIs offered by the server

Provide a short description for API with the required parameters, follow the proposed structure.

* [HTTP Method] [URL, with any parameter]
* [One-line about what this API is doing]
* [Sample request, with body (if any)]
* [Sample response, with body (if any)]
* [Error responses, if any]

### List all tasks

* GET "/apis/tasks"
* Retrieves the list of all the available tasks
* GET /api/all Empty body
* HTTP 200 [{id, description, important, private deadline, completed, user}, {id, description, important, private deadline, completed, user} ...]
* HTTP 500 

### List tasks with filter

* GET "/apis/:filterId"
* Retrieves a list of tasks satisfying the filter
* GET /api/important ; Empty body
* HTTP 200 [{id, description, important, private deadline, completed, user}, {id, description, important, private deadline, completed, user} ...]
* HTTP 500

### Get a task by its Id

* GET "/apis/tasks/:taskId"
* Retrieves the task with the same Id of the parameter taskId
* GET /apis/tasks/20 ; Empty body
* HTTP 200 {id, description, important, private deadline, completed, user}
* HTTP 500 resource not found

### Add a new task

* POST "/apis/tasks"
* Creates and inserts a new task in the db
* POST /apis/tasks {description, important, private deadline, completed, user}
* HTTP 200 {id}
* HTTP 500 could not insert new item

### Update a task

* PUT "/apis/tasks"
* Updates an existing task in the db of given Id
* PUT /apis/tasks {id, description, important, private deadline, completed, user}
* HTTP 200 Empty body
* HTTP 500 item not found or error in updating

### Mark a task as completed

* PUT "/apis/completed"
* Mark an already exisiting task in the db as completed according to the value of the parameter in the req body
* PUT "/apis/complete" {id, completed}
* HTTP 200 Empty body
* HTTP 500 item not found or error in updating

### Delete a task

* DELETE "apis/tasks/:taskId"
* Deletes a task of given Id
* DELETE /apis/tasks/20 Empty Body
* HTTP 200 Empty body
* HTTP 200 item not found

