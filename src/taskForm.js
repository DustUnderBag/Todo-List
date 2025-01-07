import { format } from "date-fns";
import { makeNewTask } from "./newTask";
import { loadCurrentProject, getCurrentProjectTitle } from "./loadProject";
import { Project } from "./project";

const taskForm_btn = document.querySelector('button.task-form-button');
const taskForm = document.querySelector('form.task-form');

const priorities = [
    {name: "None",   value: 0},
    {name: "Low",    value: 1},
    {name: "Medium", value: 2},
    {name: "High",   value: 3},
];

function projectsToArray() {
    const arr = [];
    for(const item in Project.projects) {
        const project_name = Project.projects[item].title;
        arr.push({name: project_name, value: project_name});
    }
    return arr;
}

export function makeTaskForm() {
    taskForm_btn.style.display = "none";
    taskForm.textContent = "";

    taskForm.appendChild( makeTextInput("Task title", "task-title", "text") );
    taskForm.appendChild( makeTextInput("Description", "task-description", "text") );
    taskForm.appendChild( makeDateInput("Due date", "task-dueDate", "date") );
    taskForm.appendChild( makeDropdown("Priority", "task-priority", priorities) );
    taskForm.appendChild( makeDropdown("Project", "task-project", projectsToArray()) );

    const addTask_btn = document.createElement('button');
    addTask_btn.classList.add('add-task');
    addTask_btn.textContent = "Add task";
    addTask_btn.setAttribute('type', 'button');
    addTask_btn.addEventListener('click', newTaskHandler);

    const cancelTask_btn = document.createElement('button');
    cancelTask_btn.classList.add('cancel-task');
    cancelTask_btn.textContent = "Cancel";
    cancelTask_btn.setAttribute('type', 'button');
    cancelTask_btn.addEventListener('click', closeTaskForm);

    taskForm.appendChild(addTask_btn);
    taskForm.appendChild(cancelTask_btn);

    
    preSelectProject();
}

function newTaskHandler(e) {
    makeNewTask();
    loadCurrentProject();

    closeTaskForm();
}

function makeTextInput(name, inputId) {
    const wrapper = document.createElement('p');
    wrapper.classList.add('form-row');

    const input = document.createElement('input');
    input.setAttribute('placeholder', name);
    input.setAttribute('type', "text");
    input.setAttribute('id', inputId);
    input.setAttribute('name', inputId);

    wrapper.append(input);

    return wrapper;
}

function makeDateInput(name, inputId, ) {
    const wrapper = document.createElement('p');
    wrapper.classList.add('form-row');

    const input = document.createElement('input');
    input.setAttribute('type', "date");
    input.setAttribute('id', inputId);
    input.setAttribute('name', inputId);
    
    const today = format( new Date(), 'yyyy-MM-dd' );
    input.value = today;
    input.setAttribute('min', today);

    wrapper.append(input);

    return wrapper;
}

function makeDropdown(name, inputId, options_arr) {
    const wrapper = document.createElement('p');
    wrapper.classList.add('form-row');

    const label = document.createElement('label');
    label.setAttribute('id', inputId);
    label.textContent = name;

    const dropdown = document.createElement('select');
    dropdown.setAttribute('id', inputId);
    dropdown.setAttribute('name', inputId);

    options_arr.forEach(element => {
        const option = document.createElement('option');
        option.textContent = element.name;
        option.setAttribute('value', element.value);
        dropdown.appendChild(option);
    });

    wrapper.appendChild(label);
    wrapper.appendChild(dropdown);
    return wrapper;
}

export function preSelectProject() {
    //If task form does not exist, don't select anything.
    if( taskForm.textContent === "" ) return;
    
    //Pre-select the current project in the select menu.
    const currentProjectTitle = getCurrentProjectTitle();
    const currentProject_option = document.querySelector( `option[value='${ currentProjectTitle }']` );
    currentProject_option.selected = true;
}

function closeTaskForm() {
    taskForm.textContent = "";
    taskForm_btn.style.display = "block";
}
