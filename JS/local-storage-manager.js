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
	status,
) => {
	const task = {
		title: taskTitle,
		description: taskDescription,
		deadline: taskDeadline,
		importance: taskImportance,
		status: status,
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

export const getTaskInfo = (taskIndex) => {
	return tasks[taskIndex];
};

export const editTasksStatus = (tasksIndices) => {
	for (const index of tasksIndices) {
		tasks[index].status = "completed";
	}
	loadTasksToStorage(tasks);
};

export const editTaskInfo = (
	taskIndex,
	taskTitle,
	taskDescription,
	taskDeadline,
	taskImportance,
) => {
	tasks[taskIndex].title = taskTitle;
	tasks[taskIndex].description = taskDescription;
	tasks[taskIndex].deadline = taskDeadline;
	tasks[taskIndex].importance = taskImportance;

	loadTasksToStorage(tasks);
};

export const removeTasksFromStorage = (tasksIndices) => {
	tasksIndices.sort((a, b) => b - a);
	for (const index of tasksIndices) {
		tasks.splice(index, 1);
	}
	loadTasksToStorage();
};

window.addEventListener("load", () => {
	tasks = returnTasksFromStorage();
});
