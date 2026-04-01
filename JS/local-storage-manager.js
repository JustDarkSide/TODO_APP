let tasks = [];

const loadTasksToStorage = () => {
	let serializedTasks = JSON.stringify(tasks);
	localStorage.setItem("tasks", serializedTasks);
};

export const createTaskObject = (
	taskTitle,
	taskDescription,
	taskDeadline,
	taskImportance,
) => {
	const task = {
		title: taskTitle,
		description: taskDescription,
		deadline: taskDeadline,
		importance: taskImportance,
	};

	tasks.push(task);
	loadTasksToStorage(); 
};

export const returnTasksFromStorage = () => {
	try {
		const storedData = localStorage.getItem("tasks");
		return storedData ? JSON.parse(storedData) : [];
	} catch (e) {
		console.error("Error parsing tasks:", e);
		return [];
	}
};
window.addEventListener("load", () => {
	tasks = returnTasksFromStorage();
});
