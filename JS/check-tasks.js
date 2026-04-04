import {
	taskManagmentPanelMain,
	taskManagmentPanelCheck,
	attachListenerToImportantFilter,
	removeListenerFromImportantFilter,
} from "./buttons-and-switchers.js";

import {
	showCheckboxes,
	hideCheckboxes,
	showAllSwitches,
	hideUnnecessarySwitches,
	deactivateAllSwitches,
	showAndReturnAllTasks,
} from "./app.js";

import {
	taskListIsEmpty,
	selectedTaskCounterElement,
	countSelectedTasks,
} from "./app.js";

import { editTasksStatus } from "./local-storage-manager.js";

let checkTasksButtonMainPanel = document.querySelector(
	".task-manager.mark-as-completed",
);

let checkAllButton = document.querySelector(
	".task-managment-panel.task-managment-panel__checking .task-manager.select-all",
);

let checkTasksButton = document.querySelector(
	".task-managment-panel.task-managment-panel__checking .task-manager.check-tasks",
);

let exitButton = document.querySelector(
	".task-managment-panel.task-managment-panel__checking .task-manager.exit",
);

let tasksInProgress = [];

const showAllTasksExceptCompleted = () => {
	let tasks = document.querySelectorAll(".tasks-list__element");
	let tasksInProgress = [];
	for (const task of tasks) {
		if (!task.classList.contains("completed")) {
			task.style.display = "flex";
			tasksInProgress.push(task);
		} else {
			task.style.display = "none";
		}
	}
	return tasksInProgress;
};

checkTasksButtonMainPanel.addEventListener("click", () => {
	deactivateAllSwitches();
	//Hides unnecessary switches during task checking procedure
	hideUnnecessarySwitches();
	removeListenerFromImportantFilter();
	tasksInProgress = showAllTasksExceptCompleted();
	attachListenerToImportantFilter(
		tasksInProgress,
		"checking",
		"Nothing to mark as completed",
	);
	taskListIsEmpty(tasksInProgress, "Nothing to mark as completed");
	showCheckboxes(tasksInProgress);
	let allCheckboxes = document.querySelectorAll(
		".tasks-list__element__checkbox",
	);
	allCheckboxes.forEach((checkbox) => {
		checkbox.addEventListener("click", () => {
			checkbox.firstElementChild.firstElementChild.classList.toggle("checked");
			countSelectedTasks(tasksInProgress);
		});
	});
	//Hides the main task managment panel and shows the one responsible for task checking
	taskManagmentPanelMain.style.display = "none";
	taskManagmentPanelCheck.style.display = "flex";
});

checkAllButton.addEventListener("click", () => {
	let checkedCheckboxes = [];
	let checkboxesToCheck = [];
	let allCheckboxes = [];
	for (let task of tasksInProgress) {
		let checkboxImg = task.lastElementChild.firstElementChild.firstElementChild;
		allCheckboxes.push(checkboxImg);
		if (checkboxImg.classList.contains("checked")) {
			checkedCheckboxes.push(checkboxImg);
		} else {
			checkboxesToCheck.push(checkboxImg);
		}
	}
	if (
		checkedCheckboxes.length == tasksInProgress.length ||
		checkedCheckboxes.length == 0
	) {
		for (const checkbox of allCheckboxes) {
			checkbox.classList.toggle("checked");
		}
	} else {
		for (const checkbox of checkboxesToCheck) {
			checkbox.classList.add("checked");
		}
	}
	countSelectedTasks(tasksInProgress);
});

checkTasksButton.addEventListener("click", () => {
	let tasks = document.querySelectorAll(".tasks-list__element");
	// let checkedCheckboxesArray = [];
	let tasksIndicesArray = [];
	for (const [index, task] of tasks.entries()) {
		let checkboxOuterDiv = task.lastElementChild;
		if (checkboxOuterDiv.classList.contains("tasks-list__element__checkbox")) {
			let checkboxElement =
				checkboxOuterDiv.firstElementChild.firstElementChild;

			if (checkboxElement.classList.contains("checked")) {
				{
					task.classList.remove("in-progress");
					task.classList.add("completed");
					tasksIndicesArray.push(index);
					// checkedCheckboxesArray.push(checkboxElement);
				}
			}
		}
	}

	// for (const checkbox of checkedCheckboxesArray) {
	// 	checkbox.classList.remove("checked");
	// }
	for (const taskIndex of tasksIndicesArray) {
		tasks[taskIndex]
			.querySelector(".tasks-list__element__status")
			.firstElementChild.setAttribute("src", "img/completed.svg");
	}
	editTasksStatus(tasksIndicesArray);
	tasksInProgress = showAllTasksExceptCompleted();
	removeListenerFromImportantFilter();
	attachListenerToImportantFilter(
		tasksInProgress,
		"checking",
		"Nothing to mark as completed",
	);
	countSelectedTasks(tasksInProgress);
	taskListIsEmpty(tasksInProgress, "Nothing to mark as completed");
});

exitButton.addEventListener("click", () => {
	taskManagmentPanelCheck.style.display = "none";
	taskManagmentPanelMain.style.display = "flex";
	selectedTaskCounterElement.textContent = "";
	selectedTaskCounterElement.style.padding = 0;
	hideCheckboxes();
	deactivateAllSwitches();
	removeListenerFromImportantFilter();
	attachListenerToImportantFilter([], "main", "Empty list");
	let tasks = showAndReturnAllTasks();
	showAllSwitches();
	taskListIsEmpty(tasks, "Empty list");
});
