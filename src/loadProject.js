import { Task } from "./task.js";
import { Project, parseProjectsFromLocalStorage } from "./project.js";
import { getFormattedDate } from "./formatDate.js";
import { makeTaskEditor } from "./task-editor.js";
import { displayFilterTaskCounts, loadTaskFilter } from "./filter-selector.js";
import { makeListFromProjects } from "./project-selector.js";

const content = document.querySelector('div.content');
const projectTitle = document.querySelector('h1.project-title');

let currentProjectTitle = "Home";

export function updateContentPanel() {
    if(isFilter(currentProjectTitle)) {
        loadTaskFilter(currentProjectTitle);
    } else {
        loadCurrentProject();
    }
}

export function isFilter(project_title) {
    return ( project_title === "All Tasks" || 
        project_title === "Today" || 
        project_title === "Overdue");
}

function loadCurrentProject() {
    const projects = parseProjectsFromLocalStorage();
    content.textContent = "";
    if( Object.keys(projects).length === 0 ) return; //Do nothing if empty projects.

    projectTitle.textContent = getCurrentProjectTitle();
    
    const currentProject = projects[getCurrentProjectTitle()];
    currentProject.tasks.forEach(task => {
        content.append(generateTaskItem(task));
    });
}

export function getCurrentProjectTitle() {
    //If current project doesn't exist, return the next available project's title.
    if( !Project.projects[currentProjectTitle] && !isFilter(currentProjectTitle) ) {
        const nextProjectTitle = Object.keys(Project.projects)[0];
        setCurrentProjectTitle(nextProjectTitle);
    }
    return currentProjectTitle.replace("-", " ");
}

export function setCurrentProjectTitle(project_title) {
    currentProjectTitle = project_title.replace("-", " ");
}

export function generateTaskItem(task) {
    const taskWrapper = document.createElement('div');
    taskWrapper.classList.add('task-wrapper');
    taskWrapper.setAttribute('data-task-uuid', task.uuid);
    //Add className to wrapper that represents priority level.
    const priority_className = "priority-" + task.priority;
    taskWrapper.classList.add(priority_className);

    const complete_btn = makeCompletedBtn(task);
    taskWrapper.append(complete_btn);

    const infoWrapper = document.createElement('div');
    infoWrapper.classList.add('info-wrapper');

    const title = document.createElement('h3');
    title.classList.add('task-title');
    title.textContent = task.title;
    infoWrapper.append(title);

    const description = document.createElement('p');
    description.classList.add('task-description');
    description.textContent = task.description;
    infoWrapper.append(description);

    const dueDate = document.createElement('span');
    dueDate.classList.add('task-dueDate');
    dueDate.textContent = getFormattedDate(task.dueDate);
    infoWrapper.append(dueDate);

    taskWrapper.append(infoWrapper);

    const edit_btn = makeEditBtn(task);
    taskWrapper.append(edit_btn);

    return taskWrapper;
}

function makeCompletedBtn(task) {
    const complete_btn = document.createElement('button');
    complete_btn.classList.add('task-complete');
    complete_btn.setAttribute('data-task-uuid', task.uuid);
    complete_btn.setAttribute('data-task-projectTitle', task.projectTitle);
    complete_btn.setAttribute('type', 'button');
    complete_btn.textContent = "";

    complete_btn.addEventListener('click', completeBtnHandler);

    return complete_btn;
}

function completeBtnHandler(e) {
    const uuid = parseInt(this.getAttribute('data-task-uuid'))
    const project_title = this.getAttribute('data-task-projectTitle');
    const taskFolder = Project.projects[project_title].tasks;

    const task = taskFolder.find( task => task.uuid === uuid);
    Task.deleteTask(task);

    //Refresh task counts of filters and projects.
    makeListFromProjects();
    displayFilterTaskCounts();

    //Load filter if project title is a filter.
    updateContentPanel();
}

function makeEditBtn(task) {
    const edit_btn = document.createElement('button');
    edit_btn.classList.add('task-edit');
    edit_btn.setAttribute('data-task-uuid', task.uuid);
    edit_btn.setAttribute('data-task-projectTitle', task.projectTitle);
    edit_btn.setAttribute('type', 'button');
    edit_btn.textContent = "";

    edit_btn.addEventListener('click', editBtnHandler);

    return edit_btn;
}

function editBtnHandler(e) {
    const uuid = parseInt(this.getAttribute('data-task-uuid'));
    const project_title = this.getAttribute('data-task-projectTitle');
    const taskFolder = Project.projects[project_title].tasks;

    const task = taskFolder.find( task => task.uuid === uuid);
    
    //Load filter if project title is a filter.
    updateContentPanel();

    makeTaskEditor(task);
}