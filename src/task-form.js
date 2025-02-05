import { format } from "date-fns";
import { makeNewTask } from "./newTask";
import { loadCurrentProject, getCurrentProjectTitle } from "./loadProject";
import { Project } from "./project";

const showTaskForm_btn = document.querySelector('button.show-task-form');
const taskForm_modal = document.querySelector('dialog.task-form-modal');
const taskForm = document.querySelector('dialog.task-form-modal form');
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
    //Set dueDate input min to today.
    const dueDate_input = document.querySelector('input#task-dueDate');
    const today = format( new Date(), 'yyyy-MM-dd' );
    dueDate_input.value = today;
    dueDate_input.setAttribute('min', today);

    //Populate priority select with options
    const priority_select = document.querySelector('select#task-priority');
    priority_select.textContent = "";
    makeOptionsForSelect(priority_select, priorities);

    //Populate project select with options
    const project_select = document.querySelector('select#task-project');
    project_select.textContent = "";
    makeOptionsForSelect(project_select, projectsToArray());

    const addTask_btn = document.querySelector('.task-form button.add-task');
    addTask_btn.addEventListener('click', newTaskHandler);

    const cancelTask_btn = document.querySelector('.task-form button.cancel-task');
    cancelTask_btn.addEventListener('click', closeTaskForm);

    preSelectProject();

    taskForm_modal.showModal();
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

function makeDateInput(inputId) {
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


function makeOptionsForSelect(select_input, options_arr) {
    options_arr.forEach(element => {
        const option = document.createElement('option');
        option.textContent = element.name;
        option.setAttribute('value', element.value);
        select_input.appendChild(option);
    });
}

export function preSelectProject() {
    //Pre-select the current project in the select menu.
    const currentProjectTitle = getCurrentProjectTitle();
    const currentProject_option = document.querySelector( `option[value='${ currentProjectTitle }']` );
    console.log(`option[value='${ currentProjectTitle }']`);
    console.log(currentProject_option);
    currentProject_option.selected = true;
}

function closeTaskForm() {
    taskForm_modal.close();
}
