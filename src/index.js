import "./reset.css";
import { Project } from "./task.js";
import { loadCurrentProject, setCurrentProjectTitle } from "./loadProject.js";
import { makeTaskForm } from "./taskForm.js";

console.log("Script entry point working");

const home = Project.addProject(new Project("Home"));
const work = Project.addProject(new Project("My Work"));
const hobbies = Project.addProject(new Project("Hobbies"));

const task1 = home.addTask("House Chores", "Wash Dishes", new Date(2024, 11, 16), "Everyday");
const task2 = home.addTask("Buy Groceries", "Budget $200", new Date(2025, 0, 12), "Every week");
const task3 = work.addTask("Call Manager", "Call to discuss project", new Date(2025, 0, 5), "Important");
const task4 = work.addTask("Drafting", "Draft a new design", new Date(2025, 1, 4), "Important");
const task5 = hobbies.addTask("Weight Training", "Upper & Lower Body Split training program", new Date(2024, 11,31), "Not urgent");

work.migrateTask(task3, home);
console.log(task3);

makeListFromProjects();
loadCurrentProject();

const project_btn = document.querySelector('button.add-project');
project_btn.addEventListener('click', e => {
    const title = document.querySelector('input#project-title').value;
    Project.addProject(new Project(title));
    makeListFromProjects();
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
