import "./reset.css";
import {Task, Project} from "./task.js"

console.log("Script entry point working");

const home = new Project("Home");
const work = new Project("My Work");
const hobbies = new Project("Hobbies");

const task1 = home.addTask("House Chores", "Wash Dishes", "Today Afternoon", "Everyday");
const task2 = home.addTask("Buy Groceries", "Budget $200", "Tomorrow noon", "Every week");
const task3 = work.addTask("Call Manager", "Call to discuss project", "2024-11-29", "Important");
const task4 = work.addTask("Drafting", "Draft a new design", "2025-02-15", "Important");
const task5 = hobbies.addTask("Weight Training", "Upper & Lower Body Split training program", "Every Weekdays", "Not urgent");


logger(home);
logger(work);
logger(hobbies);

home.migrateTask(task1, hobbies);

logger(home);
logger(work);
logger(hobbies);

function logger(message) {
    console.log(message);
}