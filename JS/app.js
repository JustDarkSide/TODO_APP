import "./buttons-and-switchers.js";
import "./add-task.js";
import "./check-tasks.js";
import "./delete-tasks.js";

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
