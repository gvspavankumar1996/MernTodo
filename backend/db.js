const mongoose = require("mongoose");
const { string, boolean } = require("zod");

mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.ibj5rbs.mongodb.net/todoDatabase"
);

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const todo = mongoose.model("Todos", todoSchema);

module.exports = todo;
