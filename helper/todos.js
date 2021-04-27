var db = require("../models")

exports.getTodos = function(req, res){
	// console.log("db.Todo" + db.Todo)
	db.Todo.find()
	.then((todos)=>{
		res.json(todos)
	})
	.catch((err)=>{
		res.send(err)
	})
}

exports.createTodos = function(req,res){
	db.Todo.create(req.body)
	.then((newTodo)=>{
		res.status(201).json(newTodo)
	})
	.catch((err)=>{
		res.send(err)
	})
}

exports.getTodo = (req, res)=>{
	db.Todo.findById(req.params.todoId)
	.then((foundTodo)=>{
		res.json(foundTodo)
	})
	.catch((err)=>{
		res.send(err)
	})
}
exports.updateTodo = (req,res)=>{
	db.Todo.findOneAndUpdate({_id:req.params.todoId},req.body,{new:true})
	.then((todo)=>{
		res.json(todo)
	})
	.catch((err)=>{
		res.send(err)
	})
}

exports.deleteTodo = (req,res)=>{
	db.Todo.remove({_id:req.params.todoId})
	.then(()=>{
		res.send("Deleted")
	})
	.catch((err)=>{
		res.send(err)
	})
}

module.exports = exports;