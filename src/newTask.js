import { Project } from "./task.js";

export function makeNewTask(project_name) {
    const title = document.querySelector('input#task-title');
    const description = document.querySelector('input#task-description');
    const dueDate = document.querySelector('input#task-dueDate');
    const priority = document.querySelector('select#task-priority');

    const newTask = Project.projects[project_name].addTask(title.value, 
                                           description.value, 
                                           dueDate.value, 
                                           priority.value);

    title.value = "";
    description.value = "";
    dueDate.value = "";
    priority.value = "";

    return newTask;
}