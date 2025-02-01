import { Task } from "./task.js";
import { Project, parseProjectsFromLocalStorage } from "./project.js";
import { getFormattedDate } from "./formatDate.js";
import { preSelectProject } from "./taskForm.js";
import { makeTaskEditor } from "./task-editor.js";
import { isToday, isPast } from "date-fns";

const content = document.querySelector('div.content');
const projectTitle = document.querySelector('h1.project-title');

let currentProjectTitle = "All Days";

export function loadCurrentProject() {
    const projects = parseProjectsFromLocalStorage();
    content.textContent = "";
    if( Object.keys(projects).length === 0 ) return; //Do nothing if empty projects.

    //Load the filters when non-user-created projects are opened.
    if(currentProjectTitle === "All Tasks" 
        || currentProjectTitle === "Today" 
        || currentProjectTitle === "Overdue") {
        taskFilters[currentProjectTitle]();
        return;
    }

    projectTitle.textContent = getCurrentProjectTitle();
    
    const currentProject = projects[getCurrentProjectTitle()];
    currentProject.tasks.forEach(task => {
        content.append(generateTaskItem(task));
    });
}

export function getCurrentProjectTitle() {
    //If current project doesn't exist, return the next available project's title.
    if(!Project.projects[currentProjectTitle]) {
        const nextProjectTitle = Object.keys(Project.projects)[0];
        setCurrentProjectTitle(nextProjectTitle);
    }
    return currentProjectTitle;
}

export function setCurrentProjectTitle(project_title) {
    currentProjectTitle = project_title;
    
    //Pre-select project location of task form to be the current project.
    preSelectProject();
}

export function generateTaskItem(task) {
    const taskWrapper = document.createElement('div');
    taskWrapper.classList.add('task-wrapper');
    taskWrapper.setAttribute('data-task-uuid', task.uuid);

    const complete_btn = makeCompletedBtn(task);
    taskWrapper.append(complete_btn);

    const edit_btn = makeEditBtn(task);
    taskWrapper.append(edit_btn);

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
    loadCurrentProject();
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
    
    loadCurrentProject();
    makeTaskEditor(task);
}

const taskFilters_container = document.querySelector('ul#task-filters');
taskFilters_container.addEventListener('click', filterHandler);

function filterHandler(e) {
    e.stopPropagation();
    const button = e.target;
    if(button.tagName !== "BUTTON") return;

    setCurrentProjectTitle(button.id);
    loadCurrentProject();
}

const taskFilters = {
    "All Tasks"() {
        projectTitle.textContent = "All Tasks";

        for(const project in Project.projects) {
            Project.projects[project].tasks.forEach( task => {
                content.append(generateTaskItem(task));
            });
        }
    },
    "Today"() {
        projectTitle.textContent = "Today's Tasks";

        for(const project in Project.projects) {
            Project.projects[project].tasks.forEach( task => {
                if(isToday(task.dueDate)) {
                    content.append(generateTaskItem(task));
                }
            });
        }
    },
    "Overdue"() {
        projectTitle.textContent = "Overdue Tasks";

        for(const project in Project.projects) {
            Project.projects[project].tasks.forEach( task => {
                if( !isToday(task.dueDate) && isPast(task.dueDate)) {
                    content.append(generateTaskItem(task));
                }
            });
        }
    },
};