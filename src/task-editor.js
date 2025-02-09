import { format } from "date-fns";
import { updateContentPanel } from "./loadProject";
import { Project, parseProjectsFromLocalStorage, updateProjectsInLocalStorage } from "./project";
import { Task } from "./task";
import { makeListFromProjects } from "./project-selector";
import { displayFilterTaskCounts } from "./filter-selector";

//Search for all editor's inputs at once, returned in an object.
const cache_editorInputs = () => {
    const title_edit = document.querySelector('#task-title-edit');
    const description_edit = document.querySelector('#task-description-edit');
    const dueDate_edit = document.querySelector('#task-dueDate-edit');

    const priority_edit = document.querySelector('#task-priority-edit > option:checked');

    const project_edit = document.querySelector('#task-project-edit > option:checked');

    return {
        title_edit,
        description_edit,
        dueDate_edit,

        priority_edit,
        project_edit,
    }
}

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

export function makeTaskEditor(task) {
    const task_wrapper = document.querySelector(`.task-wrapper[ data-task-uuid="${task.uuid}" ]`);
    task_wrapper.textContent = "";
    task_wrapper.style.border = "none";
   
    const editor = document.createElement('form');
    editor.classList.add('task-editor');
    editor.setAttribute('data-task-uuid', task.uuid);
    editor.setAttribute('data-task-projectTitle', task.projectTitle);

    //Title
    const formRow_title = makeFormRow();
    formRow_title.appendChild( makeTextInput("Task title", "task-title-edit") );
    editor.appendChild( formRow_title );

    //Description
    const formRow_description = makeFormRow();
    formRow_description.appendChild( makeTextInput("Description", "task-description-edit") );
    editor.appendChild( formRow_description );

    //dueDate and priorities inside one form-row
    const multiFormRow = makeFormRow();
    multiFormRow.classList.add('multi-inputs');
    multiFormRow.appendChild( makeDateInput("task-dueDate-edit") );
    multiFormRow.appendChild( makeDropdown("task-priority-edit", priorities) );
    editor.appendChild(multiFormRow);

    //project, save button & cancel button inside one form-row
    const finalFormRow = makeFormRow();
    finalFormRow.appendChild( makeDropdown("task-project-edit", projectsToArray()) )
    editor.appendChild( finalFormRow );

    const save_btn = document.createElement('button');
    save_btn.classList.add('save-task');
    save_btn.textContent = "Save";
    save_btn.setAttribute('type', 'button');
    save_btn.addEventListener('click', (e) => {
        saveTaskChanges(task);

        //Refresh task counts of filters and projects.
        makeListFromProjects();
        displayFilterTaskCounts();

        //Load filter if project title is a filter.
        updateContentPanel();
    });

    const cancel_btn = document.createElement('button');
    cancel_btn.classList.add('cancel-task');
    cancel_btn.textContent = "Cancel";
    cancel_btn.setAttribute('type', 'button');
    cancel_btn.addEventListener('click',  updateContentPanel);

    finalFormRow.appendChild(cancel_btn);
    finalFormRow.appendChild(save_btn);

    task_wrapper.appendChild(editor);
    prefill(task);
}

function prefill(task) {
    document.querySelector('#task-title-edit').value = task.title
    document.querySelector('#task-description-edit').value = task.description;

    //Pre-fill Due Date.
    //task.dueDate is a Date instance, convert its format to 'year - month - day';
    const formatted_dueDate = format(task.dueDate, 'yyyy-MM-dd'); 
    document.querySelector('#task-dueDate-edit').value = formatted_dueDate;

    //Pre-fill priority.
    document.querySelector(`#task-priority-edit > option[value="${task.priority}"]`).selected = true;

    //Pre-fill project.
    document.querySelector(`#task-project-edit > option[value="${task.projectTitle}"]`).selected = true;

}

function makeFormRow() {
    const formRow = document.createElement('p');
    formRow.classList.add('form-row');
    return formRow;
}

function makeTextInput(name, inputId) {
    const input = document.createElement('input');
    input.setAttribute('placeholder', name);
    input.setAttribute('type', "text");
    input.setAttribute('id', inputId);
    input.setAttribute('name', inputId);

    return input;
}

function makeDateInput(inputId) {
    const input = document.createElement('input');
    input.setAttribute('type', "date");
    input.setAttribute('id', inputId);
    input.setAttribute('name', inputId);
    
    const today = format( new Date(), 'yyyy-MM-dd' );
    input.setAttribute('min', today);

    return input;
}

function makeDropdown(inputId, options_arr) {
    const dropdown = document.createElement('select');
    dropdown.setAttribute('id', inputId);
    dropdown.setAttribute('name', inputId);

    options_arr.forEach(element => {
        const option = document.createElement('option');
        option.textContent = element.name;
        option.setAttribute('value', element.value);
        dropdown.appendChild(option);
    });

    return dropdown;
}

function saveTaskChanges(task) {
    const inputs = cache_editorInputs();

    const new_title = inputs.title_edit.value;
    const new_description = inputs.description_edit.value;
    const [year, month, day] = inputs.dueDate_edit.value.split('-');
    const new_dueDate =  new Date(year, month - 1, day);
    const new_priority = inputs.priority_edit.value;
    const new_projectTitle = inputs.project_edit.value;

    const projects = parseProjectsFromLocalStorage();
    const project = projects[task.projectTitle]; 
    const task_edit = project.tasks.find( item => item.uuid === task.uuid );

    task_edit.title = new_title;
    task_edit.description = new_description;
    task_edit.dueDate = new_dueDate;
    task_edit.priority = new_priority;
    updateProjectsInLocalStorage(projects);

    //Migrate after the storage's been updated after modification.
    if(task_edit.projectTitle !== new_projectTitle) {
        Task.migrateTask(task_edit, new_projectTitle);
    }
}