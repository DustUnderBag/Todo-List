import { Project } from "./project";
import { isToday, isPast } from "date-fns";

export function displayFilterTaskCounts() {
    for( let filterName in filterTaskCounts) {
        let processed_filterName = filterName.replace(" ", "-");
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
