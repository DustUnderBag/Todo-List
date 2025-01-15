class Project {
    static get projects() {
        return parseProjectsFromLocalStorage();
    }

    static set projects(data) {
        updateProjectsToLocalStorage(data);
    }

    static addProject(project) {
        const projects = parseProjectsFromLocalStorage();
        projects[project.title] = project;

        updateProjectsToLocalStorage(projects);
        return project;
    }
    
    tasks = [];

    constructor(title) {
        this.title = title;
    }
}

function parseProjectsFromLocalStorage() {
    if( !localStorage.getItem('projects') ) updateProjectsToLocalStorage({});

    const parsedProjects = JSON.parse( localStorage.getItem('projects') );
    return parsedProjects;
}

function updateProjectsToLocalStorage(data) {
    const stringified_data = JSON.stringify(data);
    localStorage.setItem('projects', stringified_data);
}

export { Project };