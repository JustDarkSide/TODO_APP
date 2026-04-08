import {
	shadow,
	taskPreviewWindow,
	taskPreviewImportanceDiv,
} from "./mutual.js";

let taskPreviewCloseButton = document.querySelector(".task-preview__button");

taskPreviewCloseButton.addEventListener("click", () => {
	taskPreviewWindow.classList.remove("task-preview__window__show");
	shadow.style.opacity = 0;
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
});
