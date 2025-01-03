class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }

    #project; //Store task's location, reference to project.

    set project(newProject) {
        this.#project = newProject;
    }

    get project() {
        return this.#project;
    }

    static addTask(title, description, dueDate, priority, project_title) {
        const newTask = new Task(title, description, dueDate, priority);
        const project = Project.projects[project_title];

        project.tasks.push(newTask);

        //Store location of new task.
        newTask.project = project;
        console.log(`Task "${title}" created at "${newTask.project.title}". `);
        
        return newTask;
    }

    static deleteTask(task) {
        console.log(`Deleted Task ${task.title} from Project ${this.title}`);
        const project = task.project;
        const index = project.tasks.indexOf(task);
        
        //return deleted element then convert from array to a single object using pop().
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
}

export {Task, Project};