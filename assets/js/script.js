// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

function generateTaskId() {
    if (nextId === null) { // Check if nextId is null
    nextId = 1; // Start at 1 if nextId is null
    } 
nextId++; // To make sure that when generateTaskId() is called, the next task has a unique id
localStorage.setItem("nextId", JSON.stringify(nextId)); // Update nextId in localStorage
return nextId;
}

function getBackgroundColor(dueDate) {
    const now = dayjs();
    const due = dayjs(dueDate);
    if (due.isBefore(now, 'day')) {
        return 'bg-danger'; // red for past due
    } else if (due.isSame(now, 'day')) {
        return 'bg-warning'; // yellow for due today
    } else {
        return 'bg-success'; // green for future due date
    }
}

function createTaskCard(task) {
    let backgroundColorClass = getBackgroundColor(task.dueDate);
    let taskCard = $("<div>").addClass(`card mb-3 ${backgroundColorClass}`).attr("id", task.id);
    let cardBody = $("<div>").addClass("card-body");
    let cardTitle = $("<h5>").addClass("card-title").text(task.title);
    let cardText = $("<p>").addClass("card-text text-dark").text(task.description);
    let cardDueDate = $("<p>").addClass("card-text").text(`Due: ${dayjs(task.dueDate).format('MMM D, YYYY')}`);

    let deleteButton = $("<button>")
    .addClass("btn btn-danger")
    .text("Delete")
    .attr("id", task.id)
    .on("click", handleDeleteTask);

    // Append the elements in the correct order
    cardBody.append(cardTitle, cardText, cardDueDate, deleteButton);
    taskCard.append(cardBody);

    return taskCard;
}

function renderTaskList() {
// Clear the existing task cards from each column
$("#todo-cards").empty();
$("#in-progress-cards").empty();
$("#done-cards").empty();

// Loop through the taskList array
for (let i = 0; i < taskList.length; i++) {
    let task = taskList[i];
    let taskCard = createTaskCard(task);
    // Append the task card to the appropriate column
    if (task.status === "To Do") {
        $("#todo-cards").append(taskCard);
    } else if (task.status === "In Progress") {
        $("#in-progress-cards").append(taskCard);
    } else if (task.status === "Done") {
        $("#done-cards").append(taskCard);
    }
    taskCard.draggable({
    revert: "invalid",
    cursor: "move", cursorAt: { top: 56, left: 56 }, // Reference: https://jqueryui.com/draggable/#cursor-style 
    zIndex: 3,
    });
}

}

function handleAddTask(event){
    event.preventDefault();
    // Retrieve form data
    let taskTitle = $("#taskTitle").val();
    let taskDescription = $("#taskDescription").val();
    let taskDueDate = $("#taskDueDate").val();

    // Create new task object
    let newTask = {
        id: generateTaskId(),
        title: taskTitle,
        description: taskDescription,
        dueDate: taskDueDate,
        status: "To Do",
    };
    // Add new task to taskList array
    taskList.push(newTask);
    // Update taskList in localStorage
    localStorage.setItem("tasks", JSON.stringify(taskList));
    localStorage.setItem("nextId", JSON.stringify(nextId));

    // Render the task list
    renderTaskList();
    // Reset the form and close modal
    $("#taskForm").trigger("reset");
    $("#formModal").modal("hide");
}

function handleDeleteTask(event){
    let taskId = $(this).attr("id");
    // Filter the taskList array to exclude the task with the matching id
    taskList = taskList.filter(task => task.id != taskId); // Determine if each task should be included in the new array.
    // Update taskList in localStorage
    localStorage.setItem("tasks", JSON.stringify(taskList));
    // Render the task list
    renderTaskList();
}

function handleDrop(event, ui) {
    event.preventDefault();
    let taskId = ui.draggable.attr("id");
    // Find the task with the matching id
    const task = taskList.find(task => task.id === parseInt(taskId)); 
    // Update the task's status
    task.status = event.target.dataset.status;
    // Update taskList in localStorage
    localStorage.setItem("tasks", JSON.stringify(taskList));
    // Render the task list
    renderTaskList();

}

$(document).ready(function () {
    renderTaskList();

    $("#taskForm").submit(handleAddTask);

    // Add event listener for the delete task button
    $(document).on("click", ".delete-task", handleDeleteTask);

    // Make lanes droppable
    $(".card-body").droppable({
        accept: ".card",
        drop: handleDrop
    });

    $("#taskDueDate").datepicker({
        showButtonPanel: true
    });
});


