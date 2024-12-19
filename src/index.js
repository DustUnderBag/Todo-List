import "./reset.css";
import { Project } from "./task.js";
import { loadCurrentProject } from "./loadProject.js";
import { makeNewTask } from "./newTask.js";

console.log("Script entry point working");

const home = Project.addProject(new Project("Home"));
const work = Project.addProject(new Project("My Work"));
const hobbies = Project.addProject(new Project("Hobbies"));
let currentProject = home;

const task1 = home.addTask("House Chores", "Wash Dishes", "Today Afternoon", "Everyday");
const task2 = home.addTask("Buy Groceries", "Budget $200", "Tomorrow noon", "Every week");
const task3 = work.addTask("Call Manager", "Call to discuss project", "2024-11-29", "Important");
const task4 = work.addTask("Drafting", "Draft a new design", "2025-02-15", "Important");
const task5 = hobbies.addTask("Weight Training", "Upper & Lower Body Split training program", "Every Weekdays", "Not urgent");

logger(home);
logger(work);
logger(hobbies);

//home.migrateTask(task1, hobbies);

logger(home);
logger(work);
logger(hobbies);


function displayProjects() {
    const projects = document.querySelector('ul.project-window');
    projects.textContent = "";

    for(const project of Project.projects) {
        projects.append(listProjectItem(project));
    }
}

function listProjectItem(item) {
    const li = document.createElement('li');
    li.classList.add("project");
    li.textContent = item.title;
    return li;
}

displayProjects();
loadCurrentProject(currentProject);

const projectBtn = document.querySelector('button.add-project');
projectBtn.addEventListener('click', e => {
    e.preventDefault();
    const title = document.querySelector('input#project-title').value;
    Project.addProject(new Project(title));
    console.log(Project.projects);
    displayProjects();
});


const newTask_btn = document.querySelector('button.add-task');

newTask_btn.addEventListener('click', newTaskHandler);

function newTaskHandler(e) {
    e.preventDefault();
    makeNewTask(currentProject);
    loadCurrentProject(currentProject);
}

function logger(message) {
    console.log(message);
}
