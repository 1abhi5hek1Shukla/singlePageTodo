$(document).ready(function(){
	$.getJSON("/api/todos")
	.then(addTodos)
	.catch((err)=>{
		console.log(err)
	})
	$("#todoInput").keypress((event)=>{
		if(event.which==13){
			createTodo();
		}
	})
	$(".list").on('click', 'li',function(){
		updateTodo($(this))
	})
	
	$(".list").on('click', 'span', function(event){
		event.stopPropagation();
		removeTodo($(this).parent())
	})
});

function addTodos(todos){
	todos.forEach(addTodo);
}

function createTodo(){
	var usrInput = $("#todoInput").val();
	$.post('api/todos', {name: usrInput})
	.then(function(newTodo){
		addTodo(newTodo)
		$("#todoInput").val('');
	})
	.catch(function(err){
		console.log(err)
	})
}

function addTodo(todo){
	var newTodo = $('<li>'+todo.name+'<span>X</span></li>');
	newTodo.addClass("task")
	newTodo.data('id',todo._id)
	newTodo.data('completed',todo.completed)
	if(todo.completed){
		newTodo.addClass("done")
	}
	$('.list').append(newTodo);
}

function removeTodo(todo){
	var clickedId = todo.data('id')
	var deleteUrl = "/api/todos/"+ clickedId
	$.ajax({
		method:"DELETE",
		url:deleteUrl
	})
	.then((mess)=>{
		todo.remove()
	})
	.catch((err)=>{
		console.log(err)
	})
}
function updateTodo(todo){
	var updateUrl = "/api/todos/"+ todo.data('id')
	var isDone = !todo.data('completed')
	var updatedData = {completed:isDone}
	$.ajax({
		method:"PUT",
		url:updateUrl,
		data: updatedData
	})
	.then(function(updatedTodo){
		todo.toggleClass("done")
		todo.data('completed',isDone)
	})
	.catch((err)=>{
		console.log(err)
	})
}