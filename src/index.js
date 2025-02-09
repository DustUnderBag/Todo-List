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

console.log("Script entry point working");
populateProjects();

makeListFromProjects();
highlightProjectSelector(getCurrentProjectTitle());
updateContentPanel();
displayFilterTaskCounts();

const showProjectInput_btn = document.querySelector('button#show-project-input');
const projectTitle_input = document.querySelector('input#project-title');
const addProject_btn = document.querySelector('button.add-project');
const cancelProject_btn = document.querySelector('button.cancel-project');

showProjectInput_btn.addEventListener('click', showProjectInput);
cancelProject_btn.addEventListener('click', closeProjectInput);

addProject_btn.addEventListener('click', e => {    
    Project.addProject(new Project(projectTitle_input.value) );
    projectTitle_input.value = "";
    closeProjectInput();

    makeListFromProjects();
    setCurrentProjectTitle(projectTitle_input.value);
    updateContentPanel();
});

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

const showTaskForm_btn = document.querySelector('button.show-task-form');
showTaskForm_btn.addEventListener('click', () => {
    makeTaskForm();
    updateContentPanel();
});