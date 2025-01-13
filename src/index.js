import "./reset.css";
import { Task } from "./task.js";
import { Project } from "./project.js";
import { loadCurrentProject, setCurrentProjectTitle } from "./loadProject.js";
import { makeTaskForm } from "./taskForm.js";

console.log("Script entry point working");

const home = Project.addProject(new Project("Home"));
const work = Project.addProject(new Project("My Work"));
const hobbies = Project.addProject(new Project("Hobbies"));

const task1 = Task.addTask("House Chores", "Wash Dishes", new Date(2024, 11, 16), 2, "Home");
const task2 = Task.addTask("Buy Groceries", "Budget $200", new Date(2025, 0, 12), 3, "Home");
const task3 = Task.addTask("Call Manager", "Call to discuss project", new Date(2025, 0, 5), 3, "My Work");
const task4 = Task.addTask("Drafting", "Draft a new design", new Date(2025, 1, 4), 0, "My Work");
const task5 = Task.addTask("Weight Training", "Upper & Lower Body Split training program", new Date(2024, 11,31), 1, "Hobbies");

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
