const express = require("express");
const app = express();
app.use(express.json());

let tasks = [
  { id: 1, title: "Completar tarea 1", completed: false },
  { id: 2, title: "Completar tarea 2", completed: false },
];

// Obtener todas las tareas
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Obtener una tarea específica
app.get("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    res.status(404).json({ error: "Tarea no encontrada" });
  } else {
    res.json(task);
  }
});
// Crear una nueva tarea
app.post("/tasks", (req, res) => {
  const newTask = req.body;
  newTask.id = tasks.length + 1;
  newTask.completed = false;
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Actualizar una tarea
app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedData = req.body;
  let task = tasks.find((task) => task.id === taskId);

  if (!task) {
    res.status(404).json({ error: "Tarea no encontrada" });
  } else {
    task = { ...task, ...updatedData };
    res.json(task);
  }
  
});
// Eliminar una tarea
app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = tasks.findIndex((task) => task.id === taskId);

  if (index === -1) {
    res.status(404).json({ error: "Tarea no encontrada" });
  } else {
    const deletedTask = tasks.splice(index, 1);
    res.json({ deletedTask });
  }
});
// Listar tareas completas e incompletas
app.get("/tasks/completed", (req, res) => {
  const completedTasks = tasks.filter((task) => task.completed);
  res.json(completedTasks);
});

app.get("/tasks/incomplete", (req, res) => {
  const incompleteTasks = tasks.filter((task) => !task.completed);
  res.json(incompleteTasks);
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});
