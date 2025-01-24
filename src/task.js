import { Project, parseProjectsFromLocalStorage, updateProjectsInLocalStorage } from "./project";
import { storageIsEmpty } from "./storage";

function getUUID() {
    if( storageIsEmpty() ) setUUID(0);
    
    let uuid = +localStorage.getItem('uuid_count');
    const new_uuid = uuid;
    setUUID(uuid + 1);
    return new_uuid;
}

function setUUID(value) {
    localStorage.setItem('uuid_count', value);
}

export class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }

    projectTitle;
    
    uuid = getUUID();
    
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
        const projects = parseProjectsFromLocalStorage();

        console.log(`Deleted Task "${task.title}" from Project "${task.projectTitle}"`);

        const project = projects[task.projectTitle];
        const uuid = task.uuid;       
        const index = project.tasks.findIndex( item => item.uuid === uuid);
        console.log(index);
        

        //return an array of deleted elements, then return the last element using pop().
        if(index > -1) {
            const deleted = project.tasks.splice(index, 1).pop(); 
            updateProjectsInLocalStorage(projects);
            return;
        } else { 
            alert("task to delete NOT found!");
        }
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