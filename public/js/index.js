$(document).ready(function() {
function insertTodo(event) {
    event.preventDefault();
    var todo = {
        text: $newItemInput.val().trim(),
        complete: false
    };

    $.post("/api/todos", todo, getTodos);
    $newItemInput.val("");
    }
});