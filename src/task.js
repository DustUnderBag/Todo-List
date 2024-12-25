class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    #project; //Store task's location, reference to project.

    set project(newProject) {
        //If new project already has this task, do nothing.
        if( newProject.tasks.includes(this) ) {
            alert("Task is already in this project!");
            return;
        }
        this.#project = newProject;
    }

    get project() {
        return this.#project;
    }
}

class Project {
    static projects = {};

    static addProject(project) {
        Project.projects[project.title] = project;
        return project;
    }
    
    tasks = [];

    constructor(title) {
        this.title = title;
    }

    addTask(title, description, dueDate, priority) {
        const newTask = new Task(title, description, dueDate, priority);

        //Store location of new task.
        newTask.project = this; 
        console.log(`Task "${title}" created at "${newTask.project.title}". `);

        this.tasks.push(newTask);
        return newTask;
    }

    deleteTask(task) {
        console.log(`Deleted Task ${task.title} from Project ${this.title}`);
        const index = this.tasks.indexOf(task);
        
        //return deleted element then convert from array to a single object using pop().
        if(index > -1) return this.tasks.splice(index, 1).pop(); 
        else alert("task to delete NOT found!");
    }

    migrateTask(task, newProject) {
        //Remove task from this project object
        this.deleteTask(task);
        //Push deleted task to newProject.tasks
        newProject.tasks.push(task);
    }
}

export {Task, Project};