import { Project } from "./project";
import { Task } from "./task";

export function populateProjects() {
    localStorage.clear();

    Project.addProject(new Project("Home"));
    Project.addProject(new Project("My Work"));
    Project.addProject(new Project("Hobbies"));
    Project.addProject(new Project("Web Development"));
    
    Task.addTask("House Chores", "Wash Dishes", new Date(2025, 1, 21), 2, "Home");
    Task.addTask("Buy Groceries", "Pick up milk, eggs, and vegetables from the supermarket.", new Date(2025, 0, 12), 2, "Home");
    Task.addTask("Do a weekly review of my goals", "Budget $200", new Date(2025, 0, 1), 3, "Home");
    Task.addTask("Pay Utility Bills", "Settle electricity and water bills before the due date.", new Date(2025, 3, 17), 3, "Home");

    Task.addTask("Call Manager", "Call to discuss project", new Date(2025, 0, 5), 3, "My Work");
    Task.addTask("Organize Workspace", "Clean up desk, sort documents, and declutter unnecessary items.", new Date(2025, 1, 4), 1, "My Work");
    Task.addTask("Schedule Doctor Appointment", "Call the clinic to book an annual checkup.", new Date(2025, 5, 21), 2, "My Work");
    Task.addTask("Prepare for Meeting", "Review project updates and draft key discussion points.", new Date(2025, 3, 4), 3, "My Work");

    Task.addTask("Practice Guitar", "Play for 30 minutes and learn a new chord progression.", new Date(2025, 0, 6), 1, "Hobbies");
    Task.addTask("Weight Training", "Upper & Lower Body Split training program", new Date(2025, 5, 26), 1, "Hobbies");
    Task.addTask("Watch a Movie", "Relax and watch a sci-fi movie in the evening.", new Date(2025, 1, 12), 1, "Hobbies");

    Task.addTask("Read 30 Minutes", "Continue reading 'Clean Code' to improve coding skills.", new Date(2025, 1, 12), 0, "Web Development");
    Task.addTask("Finish Coding Assignment", "Complete the todo list program and test all functionalities.", new Date(2024, 11, 1), 3, "Web Development");
    Task.addTask("Debug Responsive Layout", "Fix alignment issues on the homepage for mobile and tablet views.", new Date(2024, 11,31), 2, "Web Development");

}