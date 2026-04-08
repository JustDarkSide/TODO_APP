import {
	createTaskObject,
	returnTasksFromStorage,
	getTaskInfo,
} from "./local-storage-manager.js";

import {
	taskListIsEmpty,
	shadow,
	addTaskWindow,
	taskPreviewWindow,
	taskPreviewImportanceDiv,
} from "./mutual.js";

let taskTitle = document.querySelector(".new-task .new-task__title__input");
let taskDescription = document.querySelector(
	".new-task .new-task__description__textarea",
);
let dateInput = document.querySelector(".new-task__metadata__deadline input");
let taskImportance = document.querySelector(
	".new-task .new-task__metadata .new-task__metadata__importance__checkbox",
);

let tasksListBox = document.querySelector(".tasks-list");
let tasks = document.querySelectorAll(".tasks-list__element");
let newTaskCheckbox = document.querySelector(
	".new-task__metadata__importance__checkbox",
);
let addNewTaskButton = document.querySelector(
	".new-task__buttons__button.new-task__buttons__button__insert",
);

let cancelTaskAdditionButton = document.querySelector(
	".new-task__buttons__button.new-task__buttons__button__close",
);
let taskAdditionState = document.querySelector(".new-task__state .result");

let taskPreviewTitle = document.querySelector(".task-preview__title__value");

let taskPreviewDeadline = document.querySelector(
	".task-preview__deadline__date",
);

let taskPreviewImportance = document.querySelector(
	".task-preview__importance__value",
);

let taskPreviewDescription = document.querySelector(
	".task-preview__description__value",
);

const showPreviewInfo = (task) => {
	let tasks = document.querySelectorAll(".tasks-list__element");
	const index = Array.from(tasks).indexOf(task);
	const clickedTaskInfo = getTaskInfo(index);
	setPreviewInfo(
		clickedTaskInfo.title,
		clickedTaskInfo.description,
		clickedTaskInfo.deadline,
		clickedTaskInfo.importance,
	);
	taskPreviewWindow.classList.add("task-preview__window__show");
	shadow.style.zIndex = 1;
	shadow.style.opacity = 1;
};

const setPreviewInfo = (taskTitle, taskDescription, date, important) => {
	let date_elements = date.split("-");
	let proper_date_format = `${date_elements[2]}.${date_elements[1]}.${date_elements[0]}`;

	taskPreviewTitle.textContent = taskTitle;
	taskPreviewDeadline.textContent = proper_date_format;
	taskPreviewImportance.textContent = important ? "Important" : "Regular";
	if (important) {
		let img = document.createElement("img");
		img.setAttribute("src", "img/alert-circle.svg");
		img.setAttribute("alt", "Ikonka mówiąca o tym, że zadanie jest ważne");
		img.classList.add("task-preview__importance__icon");
		taskPreviewImportanceDiv.appendChild(img);
	}
	taskPreviewDescription.textContent = taskDescription;
};

const insertTask = (
	taskTitle,
	taskDescription,
	date,
	important,
	status,
	toLocalStorage = true,
) => {
	let tasks = document.querySelectorAll(".tasks-list__element");
	if (taskTitle.length == 0) {
		taskAdditionState.textContent = "Fill in task title";
		taskAdditionState.style.color = "tomato";
	} else {
		//-------------------------Adding task to localStorage------------------------
		if (toLocalStorage) {
			createTaskObject(taskTitle, taskDescription, date, important, status);
		}

		//-------------------------Task elmement creation-----------------------------
		let taskDiv = document.createElement("div");
		let statusDiv = document.createElement("div");
		let importanceDiv = null;
		let h3 = document.createElement("h3");
		let imgStatus = document.createElement("img");

		taskDiv.classList.add("tasks-list__element");
		statusDiv.classList.add("tasks-list__element__status");

		h3.textContent = taskTitle;
		h3.classList.add("tasks-list__element__name");
		h3.classList.add("inter-bold");
		// p.textContent = taskTitle;

		imgStatus.classList.add("tasks-list__element__status__icon");

		if (status == "in progress") {
			taskDiv.classList.add("in-progress");
			imgStatus.setAttribute("src", "img/active-task.svg");
		} else {
			taskDiv.classList.add("completed");
			imgStatus.setAttribute("src", "img/completed.svg");
		}
		imgStatus.setAttribute("alt", "Ikonka statusu");

		taskDiv.appendChild(h3);
		statusDiv.appendChild(imgStatus);

		if (important) {
			importanceDiv = document.createElement("div");
			let imgImportance = document.createElement("img");

			importanceDiv.classList.add("tasks-list__element__importance");
			imgImportance.classList.add("tasks-list__element__importance__icon");
			imgImportance.setAttribute("src", "img/alert-circle.svg");
			imgImportance.setAttribute(
				"alt",
				"Ikonka oznaczająca, że zadanie jest ważne",
			);
			importanceDiv.appendChild(imgImportance);
		}

		if (importanceDiv) {
			taskDiv.appendChild(importanceDiv);
		}
		taskDiv.appendChild(statusDiv);
		//Final element creation step

		if (tasks.length == 0) {
			tasksListBox.removeChild(tasksListBox.firstElementChild);
		}
		tasksListBox.appendChild(taskDiv);
		taskDiv.addEventListener("click", (e) => {
			showPreviewInfo(e.currentTarget);
		});
		if (toLocalStorage) {
			taskAdditionState.textContent = "New task has been created successfully";
			taskAdditionState.style.color = "lime";
		}
	}
};

const hideAddTaskWindow = () => {
	//Hides the task adding window
	if (addTaskWindow.classList.contains("add-task__window__show")) {
		shadow.style.opacity = 0;
		addTaskWindow.classList.remove("add-task__window__show");
		setTimeout(() => {
			shadow.style.zIndex = -1;
		}, 300);
	}
};

const setDate = () => {
	const now = new Date();
	const offset = now.getTimezoneOffset() * 60000;
	const localISODate = new Date(now - offset).toISOString().split("T")[0];
	dateInput.value = localISODate;
	dateInput.setAttribute("min", localISODate);
};

const isDateValid = () => {
	let isValid = true;
	const now = new Date();
	const offset = now.getTimezoneOffset() * 60000;
	const localISODate = new Date(now - offset).toISOString().split("T")[0];
	const selectedDate = dateInput.value;
	if (selectedDate < localISODate && selectedDate !== "") {
		alert("Error: You cannot select a date in the past.");
		dateInput.value = localISODate;
		isValid = false;
	}
	return isValid;
};

const clearInputFields = () => {
	let taskTitle = document.querySelector(".new-task .new-task__title__input");
	let taskDescription = document.querySelector(
		".new-task .new-task__description__textarea",
	);
	let taskImportance = document.querySelector(
		".new-task .new-task__metadata__importance__checkbox",
	);

	taskTitle.value = "";
	taskDescription.value = "";
	taskImportance.classList.remove("checked");
	newTaskCheckbox.firstElementChild.style.display = "none";
	setDate();
};

const setStateAsFillingInfo = () => {
	if (taskAdditionState.textContent != "Filling in information") {
		taskAdditionState.textContent = "Filling in information";
		taskAdditionState.style.color = "#fff";
	}
};

window.addEventListener("load", () => {
	let tasks = returnTasksFromStorage();
	if (tasks.length > 0) {
		for (const task of tasks) {
			insertTask(
				task.title,
				task.description,
				task.deadline,
				task.importance,
				task.status,
				false,
			);
		}
	}
});

document.addEventListener("DOMContentLoaded", () => {
	taskListIsEmpty(tasks, "Empty list");
	setDate();
});

newTaskCheckbox.addEventListener("click", () => {
	newTaskCheckbox.classList.toggle("checked");
	if (newTaskCheckbox.classList.contains("checked")) {
		newTaskCheckbox.firstElementChild.style.display = "block";
	} else {
		newTaskCheckbox.firstElementChild.style.display = "none";
	}
	setStateAsFillingInfo();
});

addNewTaskButton.addEventListener("click", () => {
	let taskTitleValue = taskTitle.value;
	let taskDescriptionValue = taskDescription.value;
	let date = dateInput.value;
	let important = taskImportance.classList.contains("checked");
	let status = "in progress";
	insertTask(taskTitleValue, taskDescriptionValue, date, important, status);
	clearInputFields();
});

cancelTaskAdditionButton.addEventListener("click", () => {
	hideAddTaskWindow();
	cancelTaskAdditionButton.firstElementChild.textContent = "Cancel";
	clearInputFields();
	setStateAsFillingInfo();
});

dateInput.addEventListener("change", () => {
	setStateAsFillingInfo();
	isDateValid();
});
dateInput.addEventListener("focus", () => {
	setStateAsFillingInfo();
});

taskDescription.addEventListener("focus", () => {
	setStateAsFillingInfo();
});

taskTitle.addEventListener("focus", () => {
	setStateAsFillingInfo();
});

shadow.addEventListener("click", () => {
	if (addTaskWindow.classList.contains("add-task__window__show")) {
		clearInputFields();
		setStateAsFillingInfo();
		hideAddTaskWindow();
	} else if (
		taskPreviewWindow.classList.contains("task-preview__window__show")
	) {
		shadow.style.opacity = 0;
		taskPreviewWindow.classList.remove("task-preview__window__show");
		setTimeout(() => {
			shadow.style.zIndex = -1;
		}, 500);

		if (
			taskPreviewImportanceDiv.lastElementChild.classList.contains(
				"task-preview__importance__icon",
			)
		) {
			taskPreviewImportanceDiv.removeChild(
				taskPreviewImportanceDiv.lastElementChild,
			);
		}
	}
});
