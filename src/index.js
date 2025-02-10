import "./styles/reset.css";
import "./styles/task.css";
import "./styles/sidebar.css";
import "./styles/task-form-editor.css";

import { Project } from "./project.js";
import { getCurrentProjectTitle, updateContentPanel, setCurrentProjectTitle } from "./loadProject.js";
import { makeTaskForm } from "./task-form.js";
import { populateProjects } from "./reset-projects.js";
import { makeListFromProjects, highlightProjectSelector } from "./project-selector.js";
import { displayFilterTaskCounts } from "./filter-selector.js";
import { storageIsEmpty } from "./storage";

console.log("Script entry point working");

if(storageIsEmpty()) populateProjects();

initializeAppContents();

function initializeAppContents() {
    setCurrentProjectTitle("All Tasks");
    makeListFromProjects();
    highlightProjectSelector(getCurrentProjectTitle());
    updateContentPanel();
    displayFilterTaskCounts();
}

const showProjectInput_btn = document.querySelector('button#show-project-input');
const projectTitle_input = document.querySelector('input#project-title');
const addProject_btn = document.querySelector('button.add-project');
const cancelProject_btn = document.querySelector('button.cancel-project');

showProjectInput_btn.addEventListener('click', showProjectInput);
cancelProject_btn.addEventListener('click', closeProjectInput);

addProject_btn.addEventListener('click', addProject_handler);

function addProject_handler() {
    Project.addProject(new Project(projectTitle_input.value) );
    projectTitle_input.value = "";
    closeProjectInput();

    makeListFromProjects();
    highlightProjectSelector(getCurrentProjectTitle());

    setCurrentProjectTitle(projectTitle_input.value);
    updateContentPanel();
}

function showProjectInput() {
    showProjectInput_btn.style.display = "none";
    projectTitle_input.style.display = "inline";
    projectTitle_input.focus();
    addProject_btn.style.display = "inline";
    cancelProject_btn.style.display = "inline";
}

function closeProjectInput() {
    projectTitle_input.value = "";

    showProjectInput_btn.style.display = "flex";
    projectTitle_input.style.display = "none";
    addProject_btn.style.display = "none";
    cancelProject_btn.style.display = "none";
}

const showTaskForm_btns = document.querySelectorAll('button.show-task-form');
showTaskForm_btns.forEach( button => button.addEventListener('click', showTaskForm_handler) );

function showTaskForm_handler() {
    makeTaskForm();
    updateContentPanel();
}

const sidebar_toggles = document.querySelectorAll('button.sidebar-toggle');
sidebar_toggles.forEach( toggle => {
    toggle.addEventListener('click', toggleSidebar);
});

function toggleSidebar() {
    const sidebar = document.querySelector('nav.sidebar-panel');
    const projectPanel = document.querySelector('main.project-panel');
    //sidebar.classList.toggle('collapsed');
    const sidebar_directChildren = document.querySelectorAll(".sidebar-panel > *");
    const sidebarChild_style = window.getComputedStyle(sidebar_directChildren[0]);
    const sidebarChild_opacity = Number(sidebarChild_style.opacity);

    let sidebarFullWidth = (screen.width >= 800) ? "300px"
                           :(screen.width >= 700 && screen.width < 800) ? "250px"
                           :(screen.width >= 555 && screen < 700) ? "200px"
                           : "300px";

    //Collapse sidebar if one of its direct children has opacity:0;
    if(sidebarChild_opacity > 0) {
        //Collapsing
        sidebar.style.width = "0";
        sidebar.style.left = "-" + sidebarFullWidth;
        sidebar.style.position = "absolute";
        projectPanel.style.marginLeft = "0";
        //Set opacity of sidebar's direct children one by one
        sidebar_directChildren.forEach(childNode => {
            childNode.style.opacity = "0";
        });
    }else {
        //Expanding
        sidebar.style.width = sidebarFullWidth;
        sidebar.style.left = "0";
        sidebar.style.position = "fixed";
        projectPanel.style.marginLeft = sidebarFullWidth;
        //Set opacity of sidebar's direct children one by one
        sidebar_directChildren.forEach(childNode => {
            childNode.style.opacity = "1";
        });
    }

    if(screen.width >= 500) {
        const secondary_toggle = document.querySelector('main button.sidebar-toggle');
        secondary_toggle.classList.toggle('hidden');
    }
}

const resetTodos_btn = document.querySelector('button#reset-todos');
resetTodos_btn.addEventListener('click', resetTodos);

function resetTodos() {
    populateProjects();
    initializeAppContents();
}