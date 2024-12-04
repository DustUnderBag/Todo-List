import "./reset.css";
import {Task, Project} from "./task.js"

console.log("Script entry point working");

const home = new Project("Home", "orange");
const work = new Project("My Work", "Green");

const task1 = home.addTask("House Chores", "Wash Dishes", "Today Afternoon", "Everyday");
const task2 = home.addTask("Buy Groceries", "Budget $200", "Tomorrow noon", "Every week");
const task3 = work.addTask("Call Manager", "Call to discuss project", "2024-11-29", "Important");
const task4 = work.addTask("Drafting", "Draft a new design", "2025-02-15", "Important");

console.log(home);
console.log(work);

home.deleteTask(task2);

console.log(home);
console.log(work);