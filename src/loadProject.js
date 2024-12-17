const content = document.querySelector('div.content');
const projectTitle = document.querySelector('h1.project-title');

export function loadCurrentProject(project) {
    projectTitle.textContent = project.title;
    for(const task of project.tasks) {
        content.append(generateTaskItem(task));
    }
}

function generateTaskItem(task) {
    const taskWrapper = document.createElement('div');
    taskWrapper.classList.add('task-wrapper');

    const checkbox = document.createElement('button');
    checkbox.classList.add('task-checkbox');
    taskWrapper.append(checkbox);

    const title = document.createElement('h3');
    title.classList.add('task-title');
    title.textContent = task.title;
    taskWrapper.append(title);

    const description = document.createElement('p');
    description.classList.add('task-description');
    description.textContent = task.description;
    taskWrapper.append(description);

    const dueDate = document.createElement('span');
    dueDate.classList.add('task-dueDate');
    dueDate.textContent = task.dueDate;
    taskWrapper.append(dueDate);

    return taskWrapper;
}

