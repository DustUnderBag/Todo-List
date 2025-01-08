import { format } from "date-fns";
import { makeNewTask } from "./newTask";
import { loadCurrentProject, getCurrentProjectTitle } from "./loadProject";
import { Project } from "./project";

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
    const uuid = task.uuid;

    const task_wrapper = document.querySelector(`.task-wrapper[ data-task-uuid="${uuid}" ]`);
    task_wrapper.textContent = "";

   
    const editor = document.createElement('form');
    editor.classList.add('task-editor');
    editor.setAttribute('data-task-uuid', task.uuid);
    editor.setAttribute('data-task-projectTitle', task.project.title);

    editor.append( makeTextInput("Task title", "task-title-edit") );
    editor.append( makeTextInput("Description", "task-description-edit") );
    editor.append( makeDateInput("task-dueDate-edit") );
    editor.append( makeDropdown("Priority", "task-priority-edit", priorities) );
    editor.append( makeDropdown("Project", "task-project", projectsToArray()) );

    const save_btn = document.createElement('button');
    save_btn.classList.add('edit-task');
    save_btn.textContent = "Save";
    save_btn.setAttribute('type', 'button');
    save_btn.addEventListener('click', () => true);

    const cancel_btn = document.createElement('button');
    cancel_btn.classList.add('cancel-task');
    cancel_btn.textContent = "Cancel";
    cancel_btn.setAttribute('type', 'button');
    cancel_btn.addEventListener('click',  () => true);

    editor.append(save_btn);
    editor.append(cancel_btn);

    task_wrapper.append(editor);
  
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