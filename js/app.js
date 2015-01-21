// Make it so that pressing Enter does the same as add button (.onchange()?)	
// Prevent creation of empty tasks
// Make button say "save" while in editMode


// Select elements and assign to variables
var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0]; // Get the first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

// New Task List Item
var createNewTaskElement = function(taskString) {

	var listItem = document.createElement("li");
	// input(checkbox)
	var checkbox = document.createElement("input");
	// label
	var label = document.createElement("label");
	// input (text)
	var editInput = document.createElement("input");
	// button.edit
	var editButton = document.createElement("button");
	// button.delete
	var deleteButton = document.createElement("button");

	// Set the type of input 
	checkbox.type = "checkbox";
	editInput.type = "text";

	// Set the text and class names of buttons and label
	editButton.innerText = "Edit";
	editButton.className = "edit";
	deleteButton.innerText = "Delete";
	deleteButton.className = "delete"
	label.innerText = taskString;

	// Append each element to incompleteTaskHolder
	listItem.appendChild(checkbox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);

	return listItem;
}


// Add a new task
var addTask = function() {
	console.log("add task");
	//Create an li with text from #new-task
	var listItem = createNewTaskElement(taskInput.value);
	// Append listItem to completeTaskHolder
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
	// Clear the task field once it's added
	taskInput.value = ""; 
};

// Edit existing task
var editTask = function() {
	console.log("edit task");

	var listItem = this.parentNode;

	var editInput = listItem.querySelector("input[type=text]");
	var label = listItem.querySelector("label");

	var containsClass = listItem.classList.contains("editMode");

		if (containsClass) {
		// switch from .editMode and set the label text to the input value
		label.innerText = editInput.value;
		} else {
		// switch to .editMode and set the input value to the label's text
		editInput.value = label.innerText;
		};
		// Toggle .editMode on the list item
		listItem.classList.toggle("editMode");
};

// Delete an existing task
var deleteTask = function() {
	console.log("delete task");
	var listItem = this.parentNode;
	var ul = listItem.parentNode;
	// remove the parent list item from the ul
	ul.removeChild(listItem);
};

// Mark a task as complete
var taskCompleted = function() {
	console.log("complete task");
	// When the checkbox is checked, append the tasklist item to #completed-tasks
	var listItem = this.parentNode;
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);
};

// Mark a task as incomplete
var taskIncomplete = function() {
	console.log("incomplete task");
	// When the checkbox is unchecked, append the tasklist item to #incomplete-tasks
	var listItem = this.parentNode;
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
};

// 
var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
	console.log("Bind list item events");
	// select taskListItem's children that match the specified selector
	var checkBox = taskListItem.querySelector("input[type=checkbox]");
	var editButton = taskListItem.querySelector("button.edit");
	var deleteButton = taskListItem.querySelector("button.delete");

	// bind task functions to corresponding elements
	editButton.onclick = editTask;
	deleteButton.onclick = deleteTask;
	checkBox.onchange = checkBoxEventHandler;
};

var ajaxRequest = function() {
	console.log("ajax request");
};

// Set the click handler to the addTask function and log ajaxRequest
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


// Cycle over incompleteTasksHolder ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
	// bind events to list item's children (taskCompleted)
	bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
};

// Cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
	// bind events to list item's children (taskIncomplete)
	bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
};





