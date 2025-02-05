import { Project } from "./project";
import { loadCurrentProject, setCurrentProjectTitle, getCurrentProjectTitle } from "./loadProject";

const project_list = document.querySelector('ul.project-window');

export function makeListFromProjects() {    
    project_list.textContent = "";
    
    for(const project in Project.projects) {
        const li = document.createElement('li');
        li.setAttribute('data-project-title', project);
        const btn = document.createElement('button');
        btn.classList.add("project");
        btn.textContent = project;
        btn.setAttribute('id', project);
        btn.setAttribute('type', 'button');
        
        btn.addEventListener('click', e => {
            setCurrentProjectTitle(e.target.id);
            loadCurrentProject();

            makeListFromProjects();
            if(project === getCurrentProjectTitle() ) li.classList.add('current-project');
        });
        li.appendChild(btn);
        li.appendChild(showOptionsBtn(Project.projects[project]));
        project_list.appendChild(li);        
    }
    const selector = `li[data-project-title="${getCurrentProjectTitle()}"]`;
    const selectedProjectLi = document.querySelector(selector);
    selectedProjectLi.classList.add('current-project');
}

function showOptionsBtn(project) {   
    const btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.classList.add('show-options-project');
    btn.setAttribute('data-project-title', project.title);

    const numberOfTasks = Object.keys(project.tasks).length;
    btn.textContent = numberOfTasks;

    const optionsBox = renderOptionsBox(project);

    btn.addEventListener("mouseenter", e => {
        btn.textContent = "";
    });

    btn.addEventListener("mouseleave", e => {
        btn.textContent = numberOfTasks;
    });

    btn.addEventListener('click', e => {
        btn.classList.add('clicked');
        btn.appendChild(optionsBox);
    });

    return btn;
}

function renderOptionsBox(project) {
    const box = document.createElement('div');
    box.classList.add('options-box-project');
    box.setAttribute('data-project-title', project.title);

    box.appendChild(deleteProjectBtn(project));
    box.appendChild(renameProjectBtn(project));

    return box;
}

function deleteProjectBtn(project) {
    const btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.classList.add('delete-project');
    btn.setAttribute('data-project-title', project.title);
    btn.textContent = "Delete";

    btn.addEventListener('click', e => {
        Project.deleteProject(project);
        makeListFromProjects();
        loadCurrentProject();
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