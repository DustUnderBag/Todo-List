import { Project } from "./task.js";
import { getFormattedDate } from "./formatDate.js";
import { preSelectProject } from "./taskForm.js";

const content = document.querySelector('div.content');
const projectTitle = document.querySelector('h1.project-title');

let currentProjectTitle = "Home";

export function loadCurrentProject() {
    content.textContent = "";
    
    projectTitle.textContent = getCurrentProjectTitle();
    
    const currentProject = Project.projects[getCurrentProjectTitle()];
    currentProject.tasks.forEach(task => {
        content.append(generateTaskItem(task));
    });
}

export function getCurrentProjectTitle() {
    return currentProjectTitle;
}

export function setCurrentProjectTitle(project_title) {
    currentProjectTitle = project_title;
    
    loadCurrentProject(); //
    preSelectProject();
}

function generateTaskItem(task) {
    const taskWrapper = document.createElement('div');
    taskWrapper.classList.add('task-wrapper');

    const checkbox = document.createElement('button');
    checkbox.classList.add('task-checkbox');
    taskWrapper.append(checkbox);

    const title = document.createElement('h3');
    title.classList.add('task-title');
    title.textContent = task.title;
    taskWrapper.append(title);

    const description = document.createElement('p');
    description.classList.add('task-description');
    description.textContent = task.description;
    taskWrapper.append(description);

    const dueDate = document.createElement('span');
    dueDate.classList.add('task-dueDate');
    dueDate.textContent = getFormattedDate(task.dueDate);
    taskWrapper.append(dueDate);

    return taskWrapper;
}