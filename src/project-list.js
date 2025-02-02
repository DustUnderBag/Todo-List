import { Project } from "./project";
import { loadCurrentProject, setCurrentProjectTitle } from "./loadProject";

export function makeListFromProjects() {
    const project_list = document.querySelector('ul.project-window');
    project_list.textContent = "";
    
    for(const project in Project.projects) {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.classList.add("project");
        btn.textContent = project;
        btn.setAttribute('id', project);
        btn.setAttribute('type', 'button');
        
        btn.addEventListener('click', e => {
            setCurrentProjectTitle(e.target.id);
            loadCurrentProject();
        });

        li.append(btn);

        li.append(deleteProjectBtn(Project.projects[project]));
        project_list.append(li);        
    }
    
}

function deleteProjectBtn(project) {
    const btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.classList.add('delete-project');
    btn.setAttribute('data-project-title', project.title);

    btn.addEventListener('click', e => {
        Project.deleteProject(project);
        makeListFromProjects();
        loadCurrentProject();
    });

    return btn;
}