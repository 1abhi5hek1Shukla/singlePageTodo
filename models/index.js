var mongoose = require("mongoose");

mongoose.set('debug',true);

mongoose.connect('mongodb://localhost/todo-api',{ useNewUrlParser: true, useUnifiedTopology: true })
// MongoClient.connect("mongodb://localhost:27017/YourDB", )

mongoose.Promise = Promise;

module.exports.Todo = require("./todo");