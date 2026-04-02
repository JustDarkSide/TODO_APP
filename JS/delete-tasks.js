import {
	taskManagmentPanelMain,
	taskManagmentPanelRemoval,
} from "./buttons-and-switchers.js";

import {
	showCheckboxes,
	hideCheckboxes,
	showAllSwitches,
	hideUnnecessarySwitches,
} from "./app.js";

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

exitButton.addEventListener("click", () => {
	taskManagmentPanelRemoval.style.display = "none";
	taskManagmentPanelMain.style.display = "flex";
	hideCheckboxes();
	showAllSwitches();
});

removeButtonMainPanel.addEventListener("click", () => {
	let tasks = document.querySelectorAll(".tasks-list__element");
	showCheckboxes(tasks);
	let allCheckboxes = document.querySelectorAll(
		".tasks-list__element__checkbox",
	);
	allCheckboxes.forEach((checkbox) => {
		checkbox.addEventListener("click", () => {
			checkbox.firstElementChild.firstElementChild.classList.toggle("checked");
		});
	});
	taskManagmentPanelMain.style.display = "none";
	taskManagmentPanelRemoval.style.display = "flex";
	hideUnnecessarySwitches();
});
