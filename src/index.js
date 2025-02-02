import "./styles/reset.css";
import "./styles/task.css";
import "./styles/sidebar.css"

import { Project } from "./project.js";
import { loadCurrentProject, setCurrentProjectTitle } from "./loadProject.js";
import { makeTaskForm } from "./taskForm.js";
import { populateProjects } from "./reset-projects.js";
import { makeListFromProjects } from "./project-list.js";

console.log("Script entry point working");
populateProjects();

makeListFromProjects();
loadCurrentProject();

const addProject_btn = document.querySelector('button.add-project');
addProject_btn.addEventListener('click', e => {
    const title = document.querySelector('input#project-title').value;
    Project.addProject(new Project(title));
    makeListFromProjects();

    //Update and open the task form when task form is already opened,
    //so that the project select menu can auto-select the newly created project.
    if( document.querySelector('form.task-form').textContent !== "" ) makeTaskForm();

    setCurrentProjectTitle(title);
    loadCurrentProject();
});

const taskForm_btn = document.querySelector('button.task-form-button');
taskForm_btn.addEventListener('click', makeTaskForm);

