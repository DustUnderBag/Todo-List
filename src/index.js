import "./styles/reset.css";
import "./styles/task.css";
import "./styles/sidebar.css";
import "./styles/task-form-modal.css";

import { Project } from "./project.js";
import { getCurrentProjectTitle, loadCurrentProject, setCurrentProjectTitle } from "./loadProject.js";
import { makeTaskForm } from "./task-form.js";
import { populateProjects } from "./reset-projects.js";
import { makeListFromProjects, highlightProjectSelector } from "./project-selector.js";
import { displayFilterTaskCounts } from "./filter-task-counts.js";

console.log("Script entry point working");
populateProjects();

makeListFromProjects();
highlightProjectSelector(getCurrentProjectTitle());
loadCurrentProject();
displayFilterTaskCounts();

const addProject_btn = document.querySelector('button.add-project');
addProject_btn.addEventListener('click', e => {
    const title = document.querySelector('input#project-title').value;
    Project.addProject(new Project(title));
    
    makeListFromProjects();
    setCurrentProjectTitle(title);
    loadCurrentProject();
});

const showTaskForm_btn = document.querySelector('button.show-task-form');
showTaskForm_btn.addEventListener('click', makeTaskForm);