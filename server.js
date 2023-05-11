const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

let todos = [];

// Body parser middleware
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
// GET all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// GET a specific todo
app.get("/todos/:id", (req, res) => {
  const id = req.params.id;
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).send("Todo not found");
  }
});

// POST a new todo
app.post("/todos", (req, res) => {
  const todo = req.body;
  todo.id = Date.now().toString();
  todos.push(todo);
  res.status(201).json(todo);
});

// PUT update a todo
app.put("/todos/:id", (req, res) => {
  const id = req.params.id;
  const updatedTodo = req.body;
  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos[index] = updatedTodo;
    res.json(updatedTodo);
  } else {
    res.status(404).send("Todo not found");
  }
});

// DELETE a todo
app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404).send("Todo not found");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
