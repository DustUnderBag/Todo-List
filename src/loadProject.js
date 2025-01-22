import { Task } from "./task.js";
import { Project, parseProjectsFromLocalStorage, updateProjectsInLocalStorage } from "./project.js";
import { getFormattedDate } from "./formatDate.js";
import { preSelectProject } from "./taskForm.js";
import { makeTaskEditor } from "./task-editor.js";

const content = document.querySelector('div.content');
const projectTitle = document.querySelector('h1.project-title');

let currentProjectTitle = "Home";

export function loadCurrentProject() {
    const projects = parseProjectsFromLocalStorage();
    content.textContent = "";
    
    projectTitle.textContent = getCurrentProjectTitle();
    
    const currentProject = projects[getCurrentProjectTitle()];
    currentProject.tasks.forEach(task => {
        content.append(generateTaskItem(task));
    });
}

export function getCurrentProjectTitle() {
    return currentProjectTitle;
}

export function setCurrentProjectTitle(project_title) {
    currentProjectTitle = project_title;
    
    //Pre-select project location of task form to be the current project.
    preSelectProject();
}

function generateTaskItem(task) {
    const taskWrapper = document.createElement('div');
    taskWrapper.classList.add('task-wrapper');
    taskWrapper.setAttribute('data-task-uuid', task.uuid);

    const complete_btn = makeCompletedBtn(task);
    taskWrapper.append(complete_btn);

    const edit_btn = makeEditBtn(task);
    taskWrapper.append(edit_btn);

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

function makeCompletedBtn(task) {
    const complete_btn = document.createElement('button');
    complete_btn.classList.add('task-complete');
    complete_btn.setAttribute('data-task-uuid', task.uuid);
    complete_btn.setAttribute('data-task-projectTitle', task.projectTitle);
    complete_btn.setAttribute('type', 'button');
    complete_btn.textContent = "complete";

    complete_btn.addEventListener('click', completeBtnHandler);

    return complete_btn;
}

function completeBtnHandler(e) {
    const uuid = parseInt(this.getAttribute('data-task-uuid'))
    const project_title = this.getAttribute('data-task-projectTitle');
    const taskFolder = Project.projects[project_title].tasks;

    const task = taskFolder.find( task => task.uuid === uuid);
    Task.deleteTask(task);
    loadCurrentProject();
}


function makeEditBtn(task) {
    const edit_btn = document.createElement('button');
    edit_btn.classList.add('task-edit');
    edit_btn.setAttribute('data-task-uuid', task.uuid);
    edit_btn.setAttribute('data-task-projectTitle', task.projectTitle);
    edit_btn.setAttribute('type', 'button');
    edit_btn.textContent = "Edit";

    edit_btn.addEventListener('click', editBtnHandler);

    return edit_btn;
}

function editBtnHandler(e) {
    const uuid = parseInt(this.getAttribute('data-task-uuid'));
    const project_title = this.getAttribute('data-task-projectTitle');
    const taskFolder = Project.projects[project_title].tasks;

    const task = taskFolder.find( task => task.uuid === uuid);
    
    loadCurrentProject();
    makeTaskEditor(task);
}