import {
	taskManagmentPanelMain,
	taskManagmentPanelCheck,
} from "./buttons-and-switchers.js";

import { hideCheckboxes } from "./app.js";

let checkAllButton = document.querySelector(
	".task-managment-panel.task-managment-panel__checking .task-manager.select-all",
);

let checkTasksButton = document.querySelector(
	".task-managment-panel.task-managment-panel__checking .task-manager.check-tasks",
);

let exitButton = document.querySelector(
	".task-managment-panel.task-managment-panel__checking .task-manager.exit",
);

exitButton.addEventListener("click", () => {
	taskManagmentPanelCheck.style.display = "none";
	taskManagmentPanelMain.style.display = "flex";
	hideCheckboxes();
});
