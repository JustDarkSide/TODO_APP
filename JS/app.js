import "./local-storage-manager.js";
import "./buttons-and-switchers.js";
import "./add-task.js";
import "./check-tasks.js";
import "./delete-tasks.js";

let allSwitchesElements = document.querySelectorAll(".task-selector__item");
let tasksListBox = document.querySelector(".tasks-list");

export const deactivateAllSwitches = () => {
	for (const switchElement of allSwitchesElements) {
		if (switchElement.firstElementChild.classList.contains("active")) {
			switchElement.firstElementChild.classList.remove("active");
			switchElement.firstElementChild.firstElementChild.classList.remove(
				"moved",
			);
		} else if (switchElement.firstElementChild.classList.contains("disabled")) {
			switchElement.firstElementChild.classList.remove("disabled");
		}
	}
};
export const hideCheckboxes = () => {
	let tasks = document.querySelectorAll(".tasks-list__element");
	tasks.forEach((element) => {
		if (
			element.lastElementChild.classList.contains(
				"tasks-list__element__checkbox",
			)
		) {
			element.removeChild(element.lastElementChild);
		}
	});
};

export const hideUnnecessarySwitches = () => {
	//Hides unnecessary switches
	let switchesParent = allSwitchesElements[0].parentElement;
	for (let switcher of allSwitchesElements) {
		if (
			switcher.firstElementChild.classList.contains(
				"task-selector__item__button__important",
			)
		) {
			continue;
		} else {
			switcher.classList.add("checking");
		}
	}
	switchesParent.classList.add("checking");
};

export const showAllSwitches = () => {
	let switchesParent = allSwitchesElements[0].parentElement;
	for (let switcher of allSwitchesElements) {
		if (switcher.classList.length > 1) {
			switcher.classList.remove(
				switcher.classList[switcher.classList.length - 1],
			);
		}
	}
	if (switchesParent.classList.length > 1) {
		switchesParent.classList.remove(
			switchesParent.classList[switchesParent.classList.length - 1],
		);
	}
};

export const showCheckboxes = (tasks) => {
	//Creates the checkbox element within the task
	tasks.forEach((element) => {
		let outerDiv = document.createElement("div");
		let innerDiv = document.createElement("div");
		let img = document.createElement("img");
		outerDiv.classList.add("tasks-list__element__checkbox");
		innerDiv.classList.add("tasks-list__element__checkbox__icon-box");
		img.classList.add("checkmark");
		img.setAttribute("src", "img/check.svg");
		img.setAttribute("alt", "");

		innerDiv.appendChild(img);
		outerDiv.appendChild(innerDiv);
		element.appendChild(outerDiv);
	});
};

export const taskListIsEmpty = (tasksArray, text) => {
	if (tasksArray.length == 0) {
		let doesExist = document.querySelector(".tasks-list__empty");
		if (doesExist) {
			doesExist.textContent = `${text}`;
		} else {
			let p = document.createElement("p");
			p.textContent = `${text}`;
			p.classList.add("tasks-list__empty");
			p.classList.add("inter-normal");
			tasksListBox.appendChild(p);
		}
	} else {
		let emptyListParagraph = document.querySelector(".tasks-list__empty");
		if (emptyListParagraph) {
			tasksListBox.removeChild(emptyListParagraph);
		}
	}
};
