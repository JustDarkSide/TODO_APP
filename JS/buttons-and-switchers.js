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

let addTaskWindow = document.querySelector(".add-task__window");

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
