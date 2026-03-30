let tasksListBox = document.querySelector(".tasks-list");
let tasks = document.querySelectorAll(".tasks-list__element");
let newTaskCheckbox = document.querySelector(".new-task__importance__checkbox");
let addNewTaskButton = document.querySelector(
	".new-task__buttons__button.new-task__buttons__button__insert",
);
let addAnotherTaskButton = document.querySelector(
	".new-task__buttons__button.new-task__buttons__button__add-another",
);
let cancelTaskAdditionButton = document.querySelector(
	"new-task__buttons__button new-task__buttons__button__cancel",
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
const insertTask = () => {
	let taskTitle = document.querySelector(".new-task .new-task__title__input");
	let taskImportance = document.querySelector(
		".new-task .new-task__importance__checkbox",
	);
	let taskDescription = document.querySelector(
		".new-task .new-task__description__textarea",
	);
	let tasks = document.querySelectorAll(".tasks-list__element");
	//Getting input values
	taskTitle = taskTitle.value;
	let important = taskImportance.classList.contains("checked");
	taskDescription = taskDescription.value;

	if (taskTitle.length == 0) {
		taskAdditionState.textContent = "Fill in task title";
		taskAdditionState.style.color = "tomato";
	} else {
		//Task elmement creation
		let taskDiv = document.createElement("div");
		let checkboxDiv = document.createElement("div");
		let p = document.createElement("p");
		let img = document.createElement("img");

		taskDiv.classList.add("tasks-list__element");
		checkboxDiv.classList.add("tasks-list__element__checkbox");

		p.textContent = taskTitle;
		p.classList.add("tasks-list__element__name");
		p.classList.add("inter-normal");
		p.textContent = taskTitle;

		img.classList.add("checkmark");
		img.setAttribute("src", "img/check.svg");
		img.setAttribute("alt", "Ikonka zatwierdzenia");

		taskDiv.appendChild(p);
		checkboxDiv.appendChild(img);
		taskDiv.appendChild(checkboxDiv);

		//Final element creation step

		if (tasks.length == 0) {
			tasksListBox.removeChild(tasksListBox.firstElementChild);
		}
		tasksListBox.appendChild(taskDiv);
		taskAdditionState.textContent = "New task added successfully";
		taskAdditionState.style.color = "lime";
	}
};

document.addEventListener("DOMContentLoaded", () => {
	taskListIsEmpty();
});

newTaskCheckbox.addEventListener("click", () => {
	newTaskCheckbox.classList.toggle("checked");
	if (newTaskCheckbox.classList.contains("checked")) {
		newTaskCheckbox.firstElementChild.style.display = "block";
	} else {
		newTaskCheckbox.firstElementChild.style.display = "none";
	}
});

addNewTaskButton.addEventListener("click", () => {
	insertTask();
});
