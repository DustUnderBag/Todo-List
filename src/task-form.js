import { format } from "date-fns";
import { makeNewTask } from "./newTask";
import { loadCurrentProject, getCurrentProjectTitle, isFilter } from "./loadProject";
import { Project } from "./project";
import { displayFilterTaskCounts } from "./filter-task-counts.js";

const taskForm_modal = document.querySelector('dialog.task-form-modal');

function projectsToArray() {
    const arr = [];
    for(const item in Project.projects) {
        const project_name = Project.projects[item].title;
        arr.push({name: project_name, value: project_name});
    }
    return arr;
}

export function makeTaskForm() {
    //Clear text inputs.
    document.querySelector('input#task-title').value = "";
    document.querySelector('input#task-description').value = "";
    
    //Set dueDate input min to today.
    const dueDate_input = document.querySelector('input#task-dueDate');
    const today = format( new Date(), 'yyyy-MM-dd' );
    dueDate_input.value = today;
    dueDate_input.setAttribute('min', today);

    //Revert priority to default.
    const defaultPriority = document.querySelector('option[value="0"]');
    defaultPriority.selected = true;

    //Populate project select with options.
    const project_select = document.querySelector('select#task-project');
    project_select.textContent = "";
    makeOptionsForSelect(project_select, projectsToArray());

    //Pre-select project to current project title.
    preSelectProject();

    const addTask_btn = document.querySelector('.task-form button.add-task');
    addTask_btn.addEventListener('click', newTaskHandler);

    const cancelTask_btn = document.querySelector('.task-form button.cancel-task');
    cancelTask_btn.addEventListener('click', closeTaskForm);


    taskForm_modal.showModal();
}

function newTaskHandler(e) {
    makeNewTask();
    loadCurrentProject();
    displayFilterTaskCounts();
    closeTaskForm();
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
    if(isFilter(currentProjectTitle)) return;
    
    const currentProject_option = document.querySelector( `option[value='${ currentProjectTitle }']` );
    currentProject_option.selected = true;
}

function closeTaskForm() {
    taskForm_modal.close();
}
