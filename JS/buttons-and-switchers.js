let importantSwitch = document.querySelector(
	".task-selector__item__button__important",
);

let activeSwitch = document.querySelector(
	".task-selector__item__button__active",
);
let completedSwitch = document.querySelector(
	".task-selector__item__button__completed",
);
let allSwitches = [importantSwitch, activeSwitch, completedSwitch];

let addButton = document.querySelector(".task-manager.add-task");

let checkButton = document.querySelector(".task-manager.mark-as-completed");

let removeButton = document.querySelector(".task-manager.remove-task");

let addTaskWindow = document.querySelector(".add-task__window");

export let taskManagmentPanelMain = document.querySelector(
	".task-managment-panel__main",
);
export let taskManagmentPanelCheck = document.querySelector(
	".task-managment-panel__checking",
);

export let taskManagmentPanelRemoval = document.querySelector(
	".task-managment-panel__removing",
);

export let shadow = document.querySelector(".shadow");

const handleSwitch = (currentSwitch) => {
	currentSwitch.classList.toggle("active");
	currentSwitch.firstElementChild.classList.toggle("moved");
};

const checkAcivationPermission = (switchList, currentSwitch) => {
	let allow_for_action = true;
	switchList.forEach((element) => {
		if (element.classList.contains("active") && element != currentSwitch) {
			allow_for_action = false;
		}
	});
	return allow_for_action;
};
const blockOrUnblock = (allSwitches, currentSwitch) => {
	if (currentSwitch.classList.contains("active")) {
		allSwitches.forEach((element) => {
			element.classList.remove("disabled");
		});
	} else {
		allSwitches.forEach((element) => {
			if (element != currentSwitch) {
				element.classList.add("disabled");
			}
		});
	}
};
const showAddTaskWindow = () => {
	addTaskWindow.classList.add("add-task__window__show");
	shadow.style.zIndex = 1;
	shadow.style.opacity = 1;
};
export const hideAddTaskWindow = () => {
	if (addTaskWindow.classList.contains("add-task__window__show")) {
		shadow.style.opacity = 0;
		addTaskWindow.classList.remove("add-task__window__show");
		setTimeout(() => {
			shadow.style.zIndex = -1;
		}, 300);
	}
};

const showCheckboxes = () => {
	let tasks = document.querySelectorAll(".tasks-list__element");
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

importantSwitch.addEventListener("click", (e) => {
	let permission = checkAcivationPermission(allSwitches, e.currentTarget);
	if (permission) {
		blockOrUnblock(allSwitches, e.currentTarget);
		handleSwitch(e.currentTarget);
	}
});

activeSwitch.addEventListener("click", (e) => {
	let permission = checkAcivationPermission(allSwitches, e.currentTarget);
	if (permission) {
		blockOrUnblock(allSwitches, e.currentTarget);
		handleSwitch(e.currentTarget);
	}
});

completedSwitch.addEventListener("click", (e) => {
	let permission = checkAcivationPermission(allSwitches, e.currentTarget);
	if (permission) {
		blockOrUnblock(allSwitches, e.currentTarget);
		handleSwitch(e.currentTarget);
	}
});

addButton.addEventListener("click", () => {
	showAddTaskWindow();
});

shadow.addEventListener("click", () => {
	hideAddTaskWindow();
});

removeButton.addEventListener("click", () => {
	showCheckboxes();
	taskManagmentPanelMain.style.display = "none";
	taskManagmentPanelRemoval.style.display = "flex";
});

checkButton.addEventListener("click", () => {
	showCheckboxes();
	taskManagmentPanelMain.style.display = "none";
	taskManagmentPanelCheck.style.display = "flex";
});
