class Project {
    static get projects() {
        return parseProjectsFromLocalStorage();
    }

    static set projects(data) {
        updateProjectsInLocalStorage(data);
    }

    static addProject(project) {
        const projects = parseProjectsFromLocalStorage();

        if(projects[project.title]) return;
        projects[project.title] = project;

        updateProjectsInLocalStorage(projects);
        return project;
    }
    
    static deleteProject(project) {
        const projects = parseProjectsFromLocalStorage();

        if(!projects[project.title]) return;

        delete projects[project.title];
        console.log("Delete project '" + project.title + "'.");
        updateProjectsInLocalStorage(projects);
    }

    tasks = [];

    constructor(title) {
        this.title = title;
    }
}

function parseProjectsFromLocalStorage() {
    if( !localStorage.getItem('projects') ) updateProjectsInLocalStorage({});

    const parsedProjects = JSON.parse( localStorage.getItem('projects') );
    return parsedProjects;
}

function updateProjectsInLocalStorage(data) {
    const stringified_data = JSON.stringify(data);
    localStorage.setItem('projects', stringified_data);
}

export { Project, parseProjectsFromLocalStorage, updateProjectsInLocalStorage };