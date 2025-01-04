class Project {
    static projects = {};

    static addProject(project) {
        Project.projects[project.title] = project;
        return project;
    }
    
    tasks = [];

    constructor(title) {
        this.title = title;
    }
}

export { Project };