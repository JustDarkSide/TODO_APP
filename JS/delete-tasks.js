import {
	taskManagmentPanelMain,
	taskManagmentPanelRemoval,
} from "./buttons-and-switchers.js";

import { hideCheckboxes } from "./app.js";

let selectAllButton = document.querySelector(
	".task-managment-panel.task-managment-panel__removing .task-manager.select-all",
);

let checkTasksButton = document.querySelector(
	".task-managment-panel.task-managment-panel__removing .task-manager.remove-tasks",
);

let exitButton = document.querySelector(
	".task-managment-panel.task-managment-panel__removing .task-manager.exit",
);

exitButton.addEventListener("click", () => {
	taskManagmentPanelRemoval.style.display = "none";
	taskManagmentPanelMain.style.display = "flex";
	hideCheckboxes();
});
