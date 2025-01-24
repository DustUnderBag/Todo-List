import { parseProjectsFromLocalStorage } from "./project";

export function storageIsEmpty() {
    const projects = parseProjectsFromLocalStorage();
    return Object.keys(projects).length === 0;
}