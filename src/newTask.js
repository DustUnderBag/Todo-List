import { Task } from "./task.js";
import { makeListFromProjects } from "./project-selector.js";

export function makeNewTask() {
    const title = document.querySelector('input#task-title');
    const description = document.querySelector('input#task-description');
    const dueDate = document.querySelector('input#task-dueDate');
    const priority = document.querySelector('select#task-priority');
    const project = document.querySelector('select#task-project');

    const [year, month, day] = dueDate.value.split("-");

    const newTask = Task.addTask(title.value, 
                                 description.value, 
                                 new Date(year, month - 1, day), 
                                 priority.value,
                                 project.value);

    title.value = "";
    description.value = "";
    dueDate.value = "";
    priority.value = "";

    return newTask;
}