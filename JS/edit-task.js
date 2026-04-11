import { getTaskInfo, editTaskInfo } from "./local-storage-manager.js";
import {
	deactivateAllSwitches,
	hideCheckboxes,
	hideUnnecessarySwitches,
	showAllSwitches,
	showAllTasksExceptCompleted,
	showAndReturnAllTasks,
	showCheckboxes,
	taskListIsEmpty,
	taskManagmentPanelMain,
	shadow,
	isDateValid,
	setMinimumDate,
	editTaskWindow,
} from "./mutual.js";
import {
	attachListenerToImportantFilter,
	removeListenerFromImportantFilter,
} from "./switches.js";

let editButton = document.querySelector(
	".task-managment-panel.task-managment-panel__main .task-manager.edit-task",
);
let taskManagmentPanelEdit = document.querySelector(
	".task-managment-panel.task-managment-panel__editing",
);

let startEditingButton = document.querySelector(
	".task-managment-panel.task-managment-panel__editing .task-manager.start-editing",
);
let exitButton = document.querySelector(
	".task-managment-panel.task-managment-panel__editing .task-manager.exit",
);

let editTaskTitleInput = document.querySelector(".edit-task__title__input");

let editTaskDeadlineInput = document.querySelector(
	".edit-task__deadline__input",
);

let editTaskImportanceCheckboxDiv = document.querySelector(
	".edit-task__importance__checkbox",
);

let editTaskImportanceCheckboxIcon = document.querySelector(
	".edit-task__importance__checkbox__icon",
);

let editTaskDescriptionTextarea = document.querySelector(
	".edit-task__description__textarea",
);

let editTaskCancelButton = document.querySelector(".edit-task__button.cancel");

let editTaskSaveChangesButton = document.querySelector(
	".edit-task__button.save-changes",
);

let tasksToEdit = null;

let currentlySelectedTask = null;

let indexOfSelectedTask = null;

const checkForCheckingPermission = (tasksArray, currentCheckbox) => {
	for (const task of tasksArray) {
		let checkbox = task.lastElementChild;
		let checkboxIcon = checkbox.firstElementChild.firstElementChild;
		let currentCheckboxIcon =
			currentCheckbox.firstElementChild.firstElementChild;
		if (
			checkboxIcon.classList.contains("checked") &&
			checkboxIcon == currentCheckboxIcon
		) {
			return true;
		} else if (checkboxIcon.classList.contains("checked")) {
			return false;
		}
	}
	return true;
};

editButton.addEventListener("click", () => {
	currentlySelectedTask = null;
	indexOfSelectedTask = null;
	deactivateAllSwitches();
	hideUnnecessarySwitches();
	removeListenerFromImportantFilter();
	tasksToEdit = showAllTasksExceptCompleted();
	attachListenerToImportantFilter(tasksToEdit, "editing", "No tasks to edit");
	taskListIsEmpty(tasksToEdit, "No tasks to edit");
	showCheckboxes(tasksToEdit);
	let allCheckboxes = document.querySelectorAll(
		".tasks-list__element__checkbox",
	);
	allCheckboxes.forEach((checkbox) => {
		checkbox.addEventListener("click", (e) => {
			e.stopPropagation();
			let permission = checkForCheckingPermission(tasksToEdit, e.currentTarget);
			if (permission) {
				let checkboxIcon = checkbox.firstElementChild.firstElementChild;

				checkboxIcon.classList.toggle("checked");
				let currentTask = e.currentTarget.parentElement;
				// for (const task of tasksToEdit) {
				// 	if (
				// 		task != currentTask &&
				// 		checkboxIcon.classList.contains("checked")
				// 	) {
				// 		task.classList.add("disabled");
				// 		currentlySelectedTask = currentTask;
				// 	} else if (
				// 		task != currentTask &&
				// 		!checkboxIcon.classList.contains("checked")
				// 	) {
				// 		task.classList.remove("disabled");
				// 		currentlySelectedTask = null;
				// 	}
				// }
				if (checkboxIcon.classList.contains("checked")) {
					for (const task of tasksToEdit) {
						if (task == currentTask) {
							continue;
						} else {
							task.classList.add("disabled");
						}
					}
					currentlySelectedTask = currentTask;
				} else {
					for (const task of tasksToEdit) {
						if (task == currentTask) {
							continue;
						} else {
							task.classList.remove("disabled");
						}
					}
					currentlySelectedTask = null;
				}
			}
		});
	});
	taskManagmentPanelMain.style.display = "none";
	taskManagmentPanelEdit.style.display = "flex";
});

startEditingButton.addEventListener("click", () => {
	if (currentlySelectedTask != null) {
		const tasks = Array.from(document.querySelectorAll(".tasks-list__element"));
		indexOfSelectedTask = tasks.indexOf(currentlySelectedTask);
		const taskToEditInfo = getTaskInfo(indexOfSelectedTask);
		const title = taskToEditInfo.title;
		const description = taskToEditInfo.description;
		const deadline = taskToEditInfo.deadline;
		const importance = taskToEditInfo.importance;
		// const status = taskToEditInfo.status;

		editTaskTitleInput.value = title;
		editTaskDeadlineInput.value = deadline;
		setMinimumDate(editTaskDeadlineInput);

		if (importance) {
			editTaskImportanceCheckboxIcon.classList.add("checked");
		} else if (
			editTaskImportanceCheckboxIcon.classList.contains("checked") &&
			importance == false
		) {
			editTaskImportanceCheckboxIcon.classList.remove("checked");
		}

		editTaskDescriptionTextarea.value = description;

		editTaskWindow.classList.add("edit-task__window__show");
		shadow.style.opacity = 1;
		shadow.style.zIndex = 1;
	}
});

exitButton.addEventListener("click", () => {
	currentlySelectedTask = null;
	hideCheckboxes();
	deactivateAllSwitches();
	removeListenerFromImportantFilter();
	attachListenerToImportantFilter([], "main", "Empty list");
	showAndReturnAllTasks();
	for (const task of tasksToEdit) {
		if (task.classList.contains("disabled")) {
			task.classList.remove("disabled");
		}
	}
	showAllSwitches();
	taskManagmentPanelEdit.style.display = "none";
	taskManagmentPanelMain.style.display = "flex";
});

editTaskDeadlineInput.addEventListener("change", (e) => {
	isDateValid(e.currentTarget);
});

editTaskImportanceCheckboxDiv.addEventListener("click", () => {
	editTaskImportanceCheckboxIcon.classList.toggle("checked");
});

editTaskCancelButton.addEventListener("click", () => {
	shadow.style.opacity = 0;
	editTaskWindow.classList.remove("edit-task__window__show");
	setTimeout(() => {
		shadow.style.zIndex = -1;
	}, 500);
});

editTaskSaveChangesButton.addEventListener("click", () => {
	const title = editTaskTitleInput.value;
	const description = editTaskDescriptionTextarea.value;
	const deadline = editTaskDeadlineInput.value;
	const importance =
		editTaskImportanceCheckboxIcon.classList.contains("checked");

	const currentlySelectedTaskTitle = currentlySelectedTask.firstElementChild;
	currentlySelectedTaskTitle.textContent = title;

	if (importance) {
		if (
			!currentlySelectedTask.querySelector(".tasks-list__element__importance")
		) {
			let importanceDiv = document.createElement("div");
			let img = document.createElement("img");
			let secondChild = currentlySelectedTask.children[1];

			importanceDiv.classList.add("tasks-list__element__importance");
			img.classList.add("tasks-list__element__importance__icon");
			img.setAttribute("src", "img/alert-circle.svg");

			importanceDiv.appendChild(img);

			currentlySelectedTask.insertBefore(importanceDiv, secondChild);
		}
	} else {
		if (
			currentlySelectedTask.querySelector(".tasks-list__element__importance")
		) {
			let importanceDiv = currentlySelectedTask.querySelector(
				".tasks-list__element__importance",
			);
			currentlySelectedTask.removeChild(importanceDiv);
		}
	}

	editTaskInfo(indexOfSelectedTask, title, description, deadline, importance);

	shadow.style.opacity = 0;
	editTaskWindow.classList.remove("edit-task__window__show");
	setTimeout(() => {
		shadow.style.zIndex = -1;
	}, 500);
});
