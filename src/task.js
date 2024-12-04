class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

class Project {
    tasks = [];
    
    constructor(title) {
        this.title = title;
    }

    addTask(title, description, dueDate, priority) {
        const newTask = new Task(title, description, dueDate, priority);
        this.tasks.push(newTask);
        return newTask;
    }


}

export {Task, Project};