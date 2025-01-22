import "./reset.css";
import { Task } from "./task.js";
import { Project, parseProjectsFromLocalStorage, updateProjectsInLocalStorage } from "./project.js";
import { loadCurrentProject, setCurrentProjectTitle } from "./loadProject.js";
import { makeTaskForm } from "./taskForm.js";
import { populateProjects } from "./reset-projects.js";

console.log("Script entry point working");
populateProjects();
//localStorage.clear();

makeListFromProjects();
loadCurrentProject();

const project_btn = document.querySelector('button.add-project');
project_btn.addEventListener('click', e => {
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

function makeListFromProjects(item) {
    const project_list = document.querySelector('ul.project-window');
    project_list.textContent = "";
    
    for(const project in Project.projects) {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.classList.add("project");
        btn.textContent = project;
        btn.setAttribute('id', project);
        btn.setAttribute('type', 'button');

        li.append(btn);
        project_list.append(li);

        btn.addEventListener('click', e => {
            setCurrentProjectTitle(e.target.id);
            loadCurrentProject();
        });
    }
    
}
