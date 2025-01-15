import { Project, parseProjectsFromLocalStorage, updateProjectsInLocalStorage } from "./project";

export class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }

    projectTitle;
    
    #uuid = Task.#getUUID();
    get uuid() {
        return this.#uuid;
    }
    static #sequence_count = 0;
    static #getUUID() {
        const new_id = Task.#sequence_count;
        Task.#sequence_count++;
        return new_id;
    }

    static addTask(title, description, dueDate, priority, project_title) {
        const projects = parseProjectsFromLocalStorage();

        const newTask = new Task(title, description, dueDate, priority);

        //Store location of new task.
        newTask.projectTitle = project_title;
        console.log(`Task "${title}" created at "${newTask.projectTitle}". `);

        projects[newTask.projectTitle].tasks.push(newTask);

        updateProjectsInLocalStorage(projects);

        return newTask;
    }

    static deleteTask(task) {
        console.log(`Deleted Task "${task.title}" from Project "${task.project.title}"`);
        const project = task.project;
        const index = project.tasks.indexOf(task);
        
        //return an array of deleted elements, then return the last element using pop().
        if(index > -1) return project.tasks.splice(index, 1).pop(); 
        else alert("task to delete NOT found!");
    }

    static migrateTask(task, new_project_title) {
        const old_project = task.project;
        const new_project = Project.projects[new_project_title];

        //If task isn't in old project, do nothing.
        if( !old_project.tasks.includes(task) ) {
            alert("Task not found in this project!");
            return;
        }
        //If task already exists in new project, do nothing.
        if( new_project.tasks.includes(task) ) {
            alert("Task is already in this project!");
            return;
        }

        //Remove task from this project object
        Task.deleteTask(task);

        //Change reference to location of task.
        task.project = new_project;

        //Push deleted task to newProject.tasks
        new_project.tasks.push(task);
        console.log(`Task "${task.title}" migrated to "${new_project.title}"`);
    }
}