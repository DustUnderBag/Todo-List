import "./reset.css";
import "./styles.css";
import { Project } from "./project.js";
import { loadCurrentProject, setCurrentProjectTitle } from "./loadProject.js";
import { makeTaskForm } from "./taskForm.js";
import { populateProjects } from "./reset-projects.js";

console.log("Script entry point working");
populateProjects();

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
        
        btn.addEventListener('click', e => {
            setCurrentProjectTitle(e.target.id);
            loadCurrentProject();
        });

        li.append(btn);

        li.append(deleteProjectBtn(Project.projects[project]));
        project_list.append(li);        
    }
    
}

function deleteProjectBtn(project) {
    const btn = document.createElement('button');
    btn.textContent = "Delete";
    btn.setAttribute('type', 'button');
    btn.classList.add('delete-project');
    btn.setAttribute('data-project-title', project.title);

    btn.addEventListener('click', e => {
        Project.deleteProject(project);
        makeListFromProjects();
        loadCurrentProject();
    });

    return btn;
}