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
        
        //return an array of deleted elements
        if(index > -1) {
            project.tasks.splice(index, 1);
            updateProjectsInLocalStorage(projects);
            return;
        } else { 
            alert("task to delete NOT found!");
        }
    }

    static migrateTask(task, new_project_title) {
        const projects = parseProjectsFromLocalStorage();

        const old_project = projects[task.projectTitle];
        const new_project = projects[new_project_title];

        //Find the same task obj from the storage.
        const task_migrated = old_project.tasks.find( item => item.uuid === task.uuid);

        //If task isn't in old project, do nothing.
        if( !old_project.tasks.includes(task_migrated) ) {
            alert("Task not found in this project!");
            return;
        }
        //If task already exists in new project, do nothing.
        if( new_project.tasks.includes(task_migrated) ) {
            alert("Task is already in this project!");
            return;
        }

        //Change reference to location of task.
        task_migrated.projectTitle = new_project_title;

        //Push deleted task to newProject.tasks
        new_project.tasks.push(task_migrated);
        updateProjectsInLocalStorage(projects);

        //The removal must happen after storage is updated.
        //Remove task from storage project object.
        Task.deleteTask(task);
        console.log(`Task "${task_migrated.title}" migrated to "${new_project.title}"`);
    }
}