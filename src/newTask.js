export function makeNewTask(currentProject) {
    const title = document.querySelector('input#task-title');
    const description = document.querySelector('input#task-description');
    const dueDate = document.querySelector('input#task-dueDate');
    const priority = document.querySelector('select#task-priority');

    const newTask = currentProject.addTask(title.value, 
                                           description.value, 
                                           dueDate.value, 
                                           priority.value);

    title.value = "";
    description.value = "";
    dueDate.value = "";
    priority.value = "";

    return newTask;
}