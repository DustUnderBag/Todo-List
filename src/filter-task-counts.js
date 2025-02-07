import { Project } from "./project";
import { isToday, isPast } from "date-fns";
import { getCurrentProjectTitle, setCurrentProjectTitle, generateTaskItem } from "./loadProject";
import { highlightProjectSelector, deselectProjectSelector } from "./project-selector";

const content = document.querySelector('div.content');
const projectTitle = document.querySelector('h1.project-title');

function filterHandler(e) {
    e.stopPropagation();

    const button = e.target;
    if(button.tagName !== "BUTTON") return;

    content.textContent = "";
    
    //Deselect previous project selector.
    const oldProjectTitle = getCurrentProjectTitle();
    deselectProjectSelector(oldProjectTitle);

    const newProjectTitle = button.getAttribute('data-project-title');
    setCurrentProjectTitle(newProjectTitle);
    console.log(newProjectTitle);
    loadTaskFilters[newProjectTitle.replace("-", " ")]();

    //Highlight selector of the loaded project.
    highlightProjectSelector(newProjectTitle);
}

const loadTaskFilters = {
    "All Tasks"() {
        projectTitle.textContent = "All Tasks";

        for(const project in Project.projects) {
            Project.projects[project].tasks.forEach( task => {
                content.append(generateTaskItem(task));
            });
        }
    },
    "Today"() {
        projectTitle.textContent = "Today's Tasks";

        for(const project in Project.projects) {
            Project.projects[project].tasks.forEach( task => {
                if(isToday(task.dueDate)) {
                    content.append(generateTaskItem(task));
                }
            });
        }
    },
    "Overdue"() {
        projectTitle.textContent = "Overdue Tasks";

        for(const project in Project.projects) {
            Project.projects[project].tasks.forEach( task => {
                if( !isToday(task.dueDate) && isPast(task.dueDate)) {
                    content.append(generateTaskItem(task));
                }
            });
        }
    },
};

const taskFilters_container = document.querySelector('ul#task-filters');
taskFilters_container.addEventListener('click', filterHandler);

export function displayFilterTaskCounts() {
    for( let filterName in filterTaskCounts) {
        let processed_filterName = filterName;
        const taskCount_span = document.querySelector(`[data-project-title = "${processed_filterName}"] + span`);
        taskCount_span.textContent = filterTaskCounts[filterName]();
    }
}

const filterTaskCounts = {
    "All Tasks"() {
        let taskCount = 0;
        for(const project in Project.projects) {
            taskCount += Project.projects[project].tasks.length;
        }
        return taskCount;
    },
    "Today"() {
        let taskCount = 0;
        for(const project in Project.projects) {
            Project.projects[project].tasks.forEach( task => {
                if(isToday(task.dueDate)) {
                    taskCount++;
                }
            });
        }
        return taskCount;
    },
    "Overdue"() {
        let taskCount = 0;
        for(const project in Project.projects) {
            Project.projects[project].tasks.forEach( task => {
                if( !isToday(task.dueDate) && isPast(task.dueDate)) {
                    taskCount++;
                }
            });
        }
        return taskCount;
    },
};
