import "./styles/reset.css";
import "./styles/task.css";
import "./styles/sidebar.css";
import "./styles/task-form-modal.css";

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

const addProject_btn = document.querySelector('button.add-project');
addProject_btn.addEventListener('click', e => {
    const title = document.querySelector('input#project-title').value;
    Project.addProject(new Project(title));
    
    makeListFromProjects();
    setCurrentProjectTitle(title);
    updateContentPanel();
});

const showTaskForm_btn = document.querySelector('button.show-task-form');
showTaskForm_btn.addEventListener('click', makeTaskForm);