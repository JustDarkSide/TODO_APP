import {
	taskManagmentPanelMain,
	taskManagmentPanelRemoval,
	attachListenerToImportantFilter,
	removeListenerFromImportantFilter,
} from "./buttons-and-switchers.js";

import {
	showCheckboxes,
	hideCheckboxes,
	showAllSwitches,
	hideUnnecessarySwitches,
	deactivateAllSwitches,
	taskListIsEmpty,
	showAndReturnAllTasks,
	countSelectedTasks,
	selectedTaskCounterElement,
	tasksListBox,
} from "./mutual.js";

import { removeTasksFromStorage } from "./local-storage-manager.js";

let removeButtonMainPanel = document.querySelector(".task-manager.remove-task");

let selectAllButton = document.querySelector(
	".task-managment-panel.task-managment-panel__removing .task-manager.select-all",
);

let removeButton = document.querySelector(
	".task-managment-panel.task-managment-panel__removing .task-manager.remove-tasks",
);

let exitButton = document.querySelector(
	".task-managment-panel.task-managment-panel__removing .task-manager.exit",
);

let completedTasks = [];

const showAllExceptActive = () => {
	let tasks = document.querySelectorAll(".tasks-list__element");
	let completedTasks = [];
	for (const task of tasks) {
		if (!task.classList.contains("in-progress")) {
			task.style.display = "flex";
			completedTasks.push(task);
		} else {
			task.style.display = "none";
		}
	}
	return completedTasks;
};

removeButtonMainPanel.addEventListener("click", () => {
	deactivateAllSwitches();
	hideUnnecessarySwitches();
	removeListenerFromImportantFilter();
	completedTasks = showAllExceptActive();
	attachListenerToImportantFilter(
		completedTasks,
		"removing",
		"Nothing to delete",
	);
	taskListIsEmpty(completedTasks, "Nothing to delete");
	showCheckboxes(completedTasks);
	let allCheckboxes = document.querySelectorAll(
		".tasks-list__element__checkbox",
	);
	allCheckboxes.forEach((checkbox) => {
		checkbox.addEventListener("click", (e) => {
			checkbox.firstElementChild.firstElementChild.classList.toggle("checked");
			e.stopPropagation()
			countSelectedTasks(completedTasks);
		});
	});
	taskManagmentPanelMain.style.display = "none";
	taskManagmentPanelRemoval.style.display = "flex";
});

selectAllButton.addEventListener("click", () => {
	let checkedCheckboxes = [];
	let checkboxesToCheck = [];
	let allCheckboxes = [];
	for (let task of completedTasks) {
		let checkboxImg = task.lastElementChild.firstElementChild.firstElementChild;
		allCheckboxes.push(checkboxImg);
		if (checkboxImg.classList.contains("checked")) {
			checkedCheckboxes.push(checkboxImg);
		} else {
			checkboxesToCheck.push(checkboxImg);
		}
	}
	if (
		checkedCheckboxes.length == completedTasks.length ||
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
	countSelectedTasks(completedTasks);
});

removeButton.addEventListener("click", () => {
	let tasksToDeleteIndices = [];
	let tasks = document.querySelectorAll(".tasks-list__element");
	for (const [index, task] of tasks.entries()) {
		let checkboxOuterDiv = task.lastElementChild;
		if (checkboxOuterDiv.classList.contains("tasks-list__element__checkbox")) {
			let checkboxElement =
				checkboxOuterDiv.firstElementChild.firstElementChild;

			if (checkboxElement.classList.contains("checked")) {
				{
					tasksToDeleteIndices.push(index);
				}
			}
		}
	}
	for (const taskIndex of tasksToDeleteIndices) {
		tasksListBox.removeChild(tasks[taskIndex]);
	}
	removeTasksFromStorage(tasksToDeleteIndices);
	removeListenerFromImportantFilter();
	completedTasks = showAllExceptActive();
	attachListenerToImportantFilter(
		completedTasks,
		"removing",
		"Nothing to delete",
	);
	countSelectedTasks(completedTasks);
	taskListIsEmpty(completedTasks, "Nothing to delete");
});

exitButton.addEventListener("click", () => {
	hideCheckboxes();
	selectedTaskCounterElement.textContent = "";
	selectedTaskCounterElement.style.padding = 0;
	deactivateAllSwitches();
	removeListenerFromImportantFilter();
	attachListenerToImportantFilter([], "main", "Empty list");
	let tasks = showAndReturnAllTasks();
	showAllSwitches();
	taskListIsEmpty(tasks, "Empty list");
	taskManagmentPanelRemoval.style.display = "none";
	taskManagmentPanelMain.style.display = "flex";
});
