import { Project } from "./project";
import { Task } from "./task";

export function populateProjects() {
    if( !isEmpty() ) return;
    const home = Project.addProject(new Project("Home"));
    const work = Project.addProject(new Project("My Work"));
    const hobbies = Project.addProject(new Project("Hobbies"));
    
    const task1 = Task.addTask("House Chores", "Wash Dishes", new Date(2024, 11, 16), 2, "Home");
    const task2 = Task.addTask("Buy Groceries", "Budget $200", new Date(2025, 0, 12), 3, "Home");
    const task3 = Task.addTask("Call Manager", "Call to discuss project", new Date(2025, 0, 5), 3, "My Work");
    const task4 = Task.addTask("Drafting", "Draft a new design", new Date(2025, 1, 4), 0, "My Work");
    const task5 = Task.addTask("Weight Training", "Upper & Lower Body Split training program", new Date(2024, 11,31), 1, "Hobbies");
}

function isEmpty() {
    return Object.keys(Project.projects).length === 0;
}