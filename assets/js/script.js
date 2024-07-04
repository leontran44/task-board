// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    if (nextId === null) { // Check if nextId is null
    nextId = 1; // Start at 1 if nextId is null
    }
let newId = nextId; // Assign nextId to newId
nextId++; // To make sure that when generateTaskId() is called, the next task has a unique id
localStorage.setItem("nextId", JSON.stringify(nextId)); // Update nextId in localStorage
return newId; 
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    let taskCard = $("<div>").addClass("card mb-3").attr("data-task-id", task.id);
    let taskCardBody = $("<div>").addClass("card-body").append(taskCard);
    let taskCardTile = $("<h5>").addClass("card-header").text(task.title).append(taskCardBody);
    let taskCardText = $("<p>").addClass("card-text").text(task.description).append(taskCardBody);
    let taskCardDueDate = $("<p>").addClass("card-text").append("<small>").addClass("text-muted").text("Due: " + task.dueDate).append(taskCardBody);
    let taskCardFooter = $("<div>").addClass("card-footer").append(taskCard);
    let taskCardDeleteBtn = $("<button>").addClass("btn btn-danger delete-task").attr("data-task-id", task.id).text("Delete").append(taskCardFooter);
    taskCard.append(taskCardTile, taskCardText, taskCardDueDate, taskCardDeleteBtn);
    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
