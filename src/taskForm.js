import { format } from "date-fns";
import { makeNewTask } from "./newTask";
import { loadCurrentProject, getCurrentProjectTitle } from "./loadProject";
import { Project } from "./task";

const priorities = [
    {name: "None", value: ""},
    {name: "Low", value: "0"},
    {name: "Medium", value: "1"},
    {name: "High", value: "2"},
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
    const form = document.querySelector('.task-form');
    form.textContent = "";

    form.appendChild( makeTextInput("Task title", "task-title", "text") );
    form.appendChild( makeTextInput("Description", "task-description", "text") );
    form.appendChild( makeDateInput("Due date", "task-dueDate", "date") );
    form.appendChild( makeDropdown("Priority", "task-priority", priorities) );
    form.appendChild( makeDropdown("Project", "task-project", projectsToArray()) );
    preSelectOptions();

    const addTask_btn = document.createElement('button');
    addTask_btn.classList.add('add-task');
    addTask_btn.textContent = "Add task";
    addTask_btn.addEventListener('click', newTaskHandler);

    const cancelTask_btn = document.createElement('button');
    cancelTask_btn.classList.add('cancel-task');
    cancelTask_btn.textContent = "Cancel";

    form.appendChild(addTask_btn);
    form.appendChild(cancelTask_btn);    
}

function newTaskHandler(e) {
    e.preventDefault();
    makeNewTask();
    loadCurrentProject();
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


function preSelectProject() {
    //Pre-select the current project in the select menu.
    const currentProjectTitle = getCurrentProjectTitle();
    const currentProject_option = document.querySelector( `option[value='${ currentProjectTitle }']` );
    currentProject_option.selected = true;
}