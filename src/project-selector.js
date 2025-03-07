import { Project } from "./project";
import { updateContentPanel, setCurrentProjectTitle, getCurrentProjectTitle } from "./loadProject";

const project_list = document.querySelector('ul.project-window');

export function makeListFromProjects() {    
    project_list.textContent = "";
    
    for(const project in Project.projects) {
        const li = document.createElement('li');
        li.setAttribute('data-project-title', project);

        const btn = document.createElement('button');
        btn.classList.add("project");

        const span = document.createElement('span');
        span.textContent = project;
        btn.appendChild(span);
        //btn.textContent = project;
        btn.setAttribute('id', project);
        btn.setAttribute('type', 'button');
        
        btn.addEventListener('click', e => {
            //Deselect previous project selector.
            const oldProjectTitle = getCurrentProjectTitle();
            deselectProjectSelector(oldProjectTitle);
            
            setCurrentProjectTitle(e.target.id);
            updateContentPanel();

            //Highlight selector of the loaded project.
            highlightProjectSelector(getCurrentProjectTitle());
        });
        li.appendChild(btn);
        li.appendChild(showOptionsBtn(Project.projects[project]));
        project_list.appendChild(li);
    }
}

export function highlightProjectSelector(project_title) {
    const selector = `li[data-project-title="${project_title}"]`;
    const selectedProjectLi = document.querySelector(selector);
    selectedProjectLi.classList.add('current-project');
}

export function deselectProjectSelector(project_title) {
    const selector = `li[data-project-title="${project_title}"]`;
    const selectedProjectLi = document.querySelector(selector);
    selectedProjectLi.classList.remove('current-project');
}

//Attach a button that displays the task count, which also acts as a button for more options.
function showOptionsBtn(project) {   
    const btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.classList.add('show-options-project');
    btn.setAttribute('data-project-title', project.title);

    //Display the number of tasks in user project.
    const numberOfTasks = getTaskCountOfProject(project);
    btn.textContent = numberOfTasks;

    //Remove display of task count, to make space for an option button instead.
    btn.addEventListener("mouseenter", e => {
        btn.textContent = "";
    });

    //Resumes display of task count, when mouse leaves the button.
    btn.addEventListener("mouseleave", e => {
        btn.textContent = numberOfTasks;
    });

    //When clicked, render an option box/menu
    btn.addEventListener('click', e => {
        const optionsBox = renderOptionsBox(project);
        btn.classList.add('clicked');
        btn.appendChild(optionsBox);
    });

    return btn;
}

function renderOptionsBox(project) {
    const box = document.createElement('div');
    box.classList.add('options-box-project');
    box.setAttribute('data-project-title', project.title);

    box.appendChild(deleteProjectBtn(project)); //Delete button
    box.appendChild(renameProjectBtn(project)); //Rename button

    return box;
}

function deleteProjectBtn(project) {
    const btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.classList.add('delete-project');
    btn.setAttribute('data-project-title', project.title);
    btn.textContent = "Delete";

    btn.addEventListener('click', () => {
        Project.deleteProject(project);
        makeListFromProjects();
        updateContentPanel();
    });

    return btn;
}

function renameProjectBtn(project) {
    const btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.classList.add('rename-project');
    btn.setAttribute('data-project-title', project.title);
    btn.textContent = "Rename";

    return btn;
}

function getTaskCountOfProject(project) {
    return Object.keys(project.tasks).length;
}