import { hideAddTaskWindow, shadow } from "./buttons-and-switchers.js";
import {
	createTaskObject,
	returnTasksFromStorage,
} from "./local-storage-manager.js";

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

const taskListIsEmpty = () => {
	if (tasks.length == 0) {
		let p = document.createElement("p");
		p.textContent = "Empty List";
		p.classList.add("tasks-list__empty");
		p.classList.add("inter-normal");
		tasksListBox.appendChild(p);
	}
};
const insertTask = (
	taskTitle,
	taskDescription,
	date,
	important,
	toLocalStorage = true,
) => {
	let tasks = document.querySelectorAll(".tasks-list__element");
	if (taskTitle.length == 0) {
		taskAdditionState.textContent = "Fill in task title";
		taskAdditionState.style.color = "tomato";
	} else {
		//-------------------------Adding task to localStorage------------------------
		if (toLocalStorage) {
			createTaskObject(taskTitle, taskDescription, date, important);
		}

		//-------------------------Task elmement creation-----------------------------
		let taskDiv = document.createElement("div");
		let statusDiv = document.createElement("div");
		let importanceDiv = null;
		let p = document.createElement("p");
		let imgStatus = document.createElement("img");

		taskDiv.classList.add("tasks-list__element");
		statusDiv.classList.add("tasks-list__element__status");

		p.textContent = taskTitle;
		p.classList.add("tasks-list__element__name");
		p.classList.add("inter-normal");
		p.textContent = taskTitle;

		imgStatus.classList.add("tasks-list__element__status__icon");
		imgStatus.setAttribute("src", "img/active-task.svg");
		imgStatus.setAttribute("alt", "Ikonka statusu");

		taskDiv.appendChild(p);
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

		if (toLocalStorage) {
			taskAdditionState.textContent = "New task has been created successfully";
			taskAdditionState.style.color = "lime";
		}
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
	if (tasks != null) {
		for (const task of tasks) {
			insertTask(
				task.title,
				task.description,
				task.deadline,
				task.importance,
				false,
			);
		}
	}
});

document.addEventListener("DOMContentLoaded", () => {
	taskListIsEmpty();
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
	insertTask(taskTitleValue, taskDescriptionValue, date, important);
	clearInputFields();
});

cancelTaskAdditionButton.addEventListener("click", () => {
	hideAddTaskWindow();
	cancelTaskAdditionButton.firstElementChild.textContent = "Cancel";
	clearInputFields();
	setStateAsFillingInfo();
});

shadow.addEventListener("click", () => {
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
