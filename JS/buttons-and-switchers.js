//----------------IMPORTS -------------------
import { taskListIsEmpty } from "./app.js";
//----------------DEFINING VARIABLES ----------------------
let importantSwitch = document.querySelector(
	".task-selector__item__button__important",
);

let activeSwitch = document.querySelector(
	".task-selector__item__button__active",
);
let completedSwitch = document.querySelector(
	".task-selector__item__button__completed",
);

let allSwitches = [importantSwitch, activeSwitch, completedSwitch];

let addButton = document.querySelector(".task-manager.add-task");

let addTaskWindow = document.querySelector(".add-task__window");

export let allCheckboxes = null;

let tasks = document.querySelectorAll(".tasks-list__element");

export let taskManagmentPanelMain = document.querySelector(
	".task-managment-panel__main",
);
export let taskManagmentPanelCheck = document.querySelector(
	".task-managment-panel__checking",
);

export let taskManagmentPanelRemoval = document.querySelector(
	".task-managment-panel__removing",
);

export let shadow = document.querySelector(".shadow");

let currentImportantSwitchListener = null;

const handleSwitch = (currentSwitch) => {
	//Enable or disable the switch
	currentSwitch.classList.toggle("active");
	currentSwitch.firstElementChild.classList.toggle("moved");
};

const checkAcivationPermission = (switchList, currentSwitch) => {
	//Checks if any other switch is active and returns the allowance for activation
	let allow_for_action = true;
	switchList.forEach((element) => {
		if (element.classList.contains("active") && element != currentSwitch) {
			allow_for_action = false;
		}
	});
	return allow_for_action;
};
const blockOrUnblock = (allSwitches, currentSwitch) => {
	//Disables the possibility to enable other switches if any of the switches is active
	if (currentSwitch.classList.contains("active")) {
		allSwitches.forEach((element) => {
			element.classList.remove("disabled");
		});
	} else {
		allSwitches.forEach((element) => {
			if (element != currentSwitch) {
				element.classList.add("disabled");
			}
		});
	}
};

const handleImportantTasksFilter = (tasksArray) => {
	let tasksToHide = [];
	if (importantSwitch.classList.contains("active")) {
		for (const task of tasksArray) {
			if (
				!task.children[1].classList.contains("tasks-list__element__importance")
			) {
				tasksToHide.push(task);
			}
		}
		if (tasksArray.length == tasksToHide.length) {
			taskListIsEmpty([], "No important tasks");
		}
		for (const task of tasksToHide) {
			task.style.display = "none";
		}
	} else {
		taskListIsEmpty(tasksArray, "");
		for (const task of tasksArray) {
			task.style.display = "flex";
		}
	}
};

const handleActiveTasksFilter = (tasksArray) => {
	let tasksToHide = [];
	if (activeSwitch.classList.contains("active")) {
		for (const task of tasksArray) {
			if (!task.classList.contains("in-progress")) {
				tasksToHide.push(task);
			}
		}
		if (tasksArray.length == tasksToHide.length) {
			taskListIsEmpty([], "No active tasks");
		}
		for (const task of tasksToHide) {
			task.style.display = "none";
		}
	} else {
		taskListIsEmpty(tasksArray, "");
		for (const task of tasksArray) {
			task.style.display = "flex";
		}
	}
};

const handleCompletedTasksFilter = (tasksArray) => {
	let tasksToHide = [];
	if (completedSwitch.classList.contains("active")) {
		for (const task of tasksArray) {
			if (!task.classList.contains("completed")) {
				tasksToHide.push(task);
			}
		}
		if (tasksArray.length == tasksToHide.length) {
			taskListIsEmpty([], "No completed tasks");
		}
		for (const task of tasksToHide) {
			task.style.display = "none";
		}
	} else {
		taskListIsEmpty(tasksArray, "");
		for (const task of tasksArray) {
			task.style.display = "flex";
		}
	}
};

const showAddTaskWindow = () => {
	//Shows the window for adding task
	addTaskWindow.classList.add("add-task__window__show");
	shadow.style.zIndex = 1;
	shadow.style.opacity = 1;
};
export const hideAddTaskWindow = () => {
	//Hides the task adding window
	if (addTaskWindow.classList.contains("add-task__window__show")) {
		shadow.style.opacity = 0;
		addTaskWindow.classList.remove("add-task__window__show");
		setTimeout(() => {
			shadow.style.zIndex = -1;
		}, 300);
	}
};

const functionsForImportantFilter = (tasksArray) => {
	if (tasksArray.length == 0) {
		let permission = checkAcivationPermission(allSwitches, importantSwitch);
		if (permission) {
			tasks = document.querySelectorAll(".tasks-list__element");
			blockOrUnblock(allSwitches, importantSwitch);
			handleSwitch(importantSwitch);
			handleImportantTasksFilter(tasks);
		}
	} else {
		blockOrUnblock(allSwitches, importantSwitch);
		handleSwitch(importantSwitch);

		handleImportantTasksFilter(tasksArray);
	}
};

export const attachListenerToImportantFilter = (tasksArray) => {
	currentImportantSwitchListener = () => {
		functionsForImportantFilter(tasksArray);
	};
	importantSwitch.addEventListener("click", currentImportantSwitchListener);
};

export const removeListenerFromImportantFilter = () => {
	importantSwitch.removeEventListener("click", currentImportantSwitchListener);
};

// importantSwitch.addEventListener("click", (e) => {
// 	if (permission) {
// 		tasks = document.querySelectorAll(".tasks-list__element");
// 		blockOrUnblock(allSwitches, e.currentTarget);
// 		handleSwitch(e.currentTarget);

// 		handleImportantTasksFilterHelperFunction(tasks);
// 	}
// });

document.addEventListener("DOMContentLoaded", () => {
	attachListenerToImportantFilter([]);
});

activeSwitch.addEventListener("click", (e) => {
	let permission = checkAcivationPermission(allSwitches, e.currentTarget);
	if (permission) {
		tasks = document.querySelectorAll(".tasks-list__element");
		blockOrUnblock(allSwitches, e.currentTarget);
		handleSwitch(e.currentTarget);
		handleActiveTasksFilter(tasks);
	}
});

completedSwitch.addEventListener("click", (e) => {
	let permission = checkAcivationPermission(allSwitches, e.currentTarget);
	if (permission) {
		tasks = document.querySelectorAll(".tasks-list__element");
		blockOrUnblock(allSwitches, e.currentTarget);
		handleSwitch(e.currentTarget);
		handleCompletedTasksFilter(tasks);
	}
});

addButton.addEventListener("click", () => {
	showAddTaskWindow();
});

shadow.addEventListener("click", () => {
	hideAddTaskWindow();
});
