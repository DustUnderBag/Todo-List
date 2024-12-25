import "./reset.css";
import { Project } from "./task.js";
import { loadCurrentProject } from "./loadProject.js";
import { makeNewTask } from "./newTask.js";

console.log("Script entry point working");

const home = Project.addProject(new Project("Home"));
const work = Project.addProject(new Project("My Work"));
const hobbies = Project.addProject(new Project("Hobbies"));

const task1 = home.addTask("House Chores", "Wash Dishes", "Today Afternoon", "Everyday");
const task2 = home.addTask("Buy Groceries", "Budget $200", "Tomorrow noon", "Every week");
const task3 = work.addTask("Call Manager", "Call to discuss project", "2024-11-29", "Important");
const task4 = work.addTask("Drafting", "Draft a new design", "2025-02-15", "Important");
const task5 = hobbies.addTask("Weight Training", "Upper & Lower Body Split training program", "Every Weekdays", "Not urgent");

let currentProject = "Home";


work.migrateTask(task3, home);
console.log(task3);

makeListFromProjects();
loadCurrentProject(currentProject);

const projectBtn = document.querySelector('button.add-project');
projectBtn.addEventListener('click', e => {
    e.preventDefault();
    const title = document.querySelector('input#project-title').value;
    Project.addProject(new Project(title));
    makeListFromProjects();
});

function makeListFromProjects(item) {
    const project_list = document.querySelector('ul.project-window');
    project_list.textContent = "";
    
    for(const project in Project.projects) {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.classList.add("project");
        btn.textContent = project;
        btn.setAttribute('id', project);

        li.append(btn);
        project_list.append(li);

        btn.addEventListener('click', e => {
            e.preventDefault();
            setCurrentProject(e.target.id);
            loadCurrentProject(currentProject);
        });
    }
    
}

const newTask_btn = document.querySelector('button.add-task');

newTask_btn.addEventListener('click', newTaskHandler);

function newTaskHandler(e) {
    e.preventDefault();
    makeNewTask(currentProject);
    loadCurrentProject(currentProject);
}

function setCurrentProject(project_name) {
    currentProject = project_name;
}

function logger(message) {
    console.log(message);
}

