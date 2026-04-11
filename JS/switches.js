//----------------IMPORTS -------------------
import { taskListIsEmpty, addTaskWindow, shadow } from "./mutual.js";
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


export let allCheckboxes = null;

let tasks = document.querySelectorAll(".tasks-list__element");


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

const handleImportantTasksFilter = (tasksArray, textWhenEmptyArray) => {
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
		taskListIsEmpty(tasksArray, textWhenEmptyArray);
		for (const task of tasksArray) {
			task.style.display = "flex";
		}
	}
};

const handleActiveTasksFilter = (tasksArray, textWhenEmptyArray) => {
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
		taskListIsEmpty(tasksArray, textWhenEmptyArray);
		for (const task of tasksArray) {
			task.style.display = "flex";
		}
	}
};

const handleCompletedTasksFilter = (tasksArray, textWhenEmptyArray) => {
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
		taskListIsEmpty(tasksArray, textWhenEmptyArray);
		for (const task of tasksArray) {
			task.style.display = "flex";
		}
	}
};



const functionsForImportantFilter = (
	tasksArray,
	sectionName,
	textWhenEmptyArray,
) => {
	if (sectionName == "main") {
		let permission = checkAcivationPermission(allSwitches, importantSwitch);
		if (permission) {
			tasks = document.querySelectorAll(".tasks-list__element");
			blockOrUnblock(allSwitches, importantSwitch);
			handleSwitch(importantSwitch);
			handleImportantTasksFilter(tasks, textWhenEmptyArray);
		}
	} else {
		handleSwitch(importantSwitch);
		handleImportantTasksFilter(tasksArray, textWhenEmptyArray);
	}
};

export const attachListenerToImportantFilter = (
	tasksArray,
	sectionName,
	textWhenEmptyArray,
) => {
	currentImportantSwitchListener = () => {
		functionsForImportantFilter(tasksArray, sectionName, textWhenEmptyArray);
	};
	importantSwitch.addEventListener("click", currentImportantSwitchListener);
};

export const removeListenerFromImportantFilter = () => {
	importantSwitch.removeEventListener("click", currentImportantSwitchListener);
};

document.addEventListener("DOMContentLoaded", () => {
	attachListenerToImportantFilter([], "main", "Empty list");
});

activeSwitch.addEventListener("click", (e) => {
	let permission = checkAcivationPermission(allSwitches, e.currentTarget);
	if (permission) {
		tasks = document.querySelectorAll(".tasks-list__element");
		blockOrUnblock(allSwitches, e.currentTarget);
		handleSwitch(e.currentTarget);
		handleActiveTasksFilter(tasks, "Empty list");
	}
});

completedSwitch.addEventListener("click", (e) => {
	let permission = checkAcivationPermission(allSwitches, e.currentTarget);
	if (permission) {
		tasks = document.querySelectorAll(".tasks-list__element");
		blockOrUnblock(allSwitches, e.currentTarget);
		handleSwitch(e.currentTarget);
		handleCompletedTasksFilter(tasks, "Empty list");
	}
});


