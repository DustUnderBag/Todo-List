class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    #project; //Store task's location, reference to project.

    set project(newProject) {
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
        //If task isn't in this project, do nothing.
        if( !this.tasks.includes(task) ) {
            alert("Task not found in this project!");
            return;
        }
        //If new project already has this task, do nothing.
        if( newProject.tasks.includes(task) ) {
            alert("Task is already in this project!");
            return;
        }

        //Remove task from this project object
        this.deleteTask(task);

        //Change reference to location of task.
        task.project = newProject;

        //Push deleted task to newProject.tasks
        newProject.tasks.push(task);
        console.log(`Task "${task.title}" migrated to "${newProject.title}"`);
    }
}

export {Task, Project};