import { Task, Project } from "./task.js";

export function makeNewTask() {
    const title = document.querySelector('input#task-title');
    const description = document.querySelector('input#task-description');
    const dueDate = document.querySelector('input#task-dueDate');
    const priority = document.querySelector('select#task-priority');
    const project = document.querySelector('select#task-project');

    const newTask = Task.addTask(title.value, 
                                 description.value, 
                                 dueDate.value, 
                                 priority.value,
                                 project.value);

    title.value = "";
    description.value = "";
    dueDate.value = "";
    priority.value = "";

    return newTask;
}