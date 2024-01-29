const express = require("express");
const { createTodo, updateTodo } = require("./types");
const todo = require("./db");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/todo", async (req, res) => {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);

  if (!parsedPayload.success) {
    res.status(411).json({ msg: "you have sent wrong inputs" });
  }

  await todo.create({
    title: req.body.title,
    description: req.body.description,
    completed: false,
  });

  res.status(200).json({ msg: "Todo created" });
  //put it in mongo
});
app.get("/todos", async (req, res) => {
  const todos = await todo.find({});

  res.json({
    todos,
  });
});
app.put("/completed", async (req, res) => {
  const createPayload = req.body;
  const parsedPayload = updateTodo.safeParse(createPayload);
  if (!parsedPayload.success) {
    res.status(411).json({ msg: "you have sent wrong inputs" });
  }

  await todo.updateOne(
    {
      _id: req.body.id,
    },
    {
      completed: false,
    }
  );

  res.json({
    msg: "Todo marked as completed",
  });
  //put it in mongo
});

app.listen(3000);
