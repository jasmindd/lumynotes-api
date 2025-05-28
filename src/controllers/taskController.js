const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  const { title, description, dueDate, completed } = req.body;

  if (!title || !req.userId) {
    return res.status(400).json({ message: 'Faltan datos obligatorios: title o userId' });
  }

  try {
    const newTask = new Task({
      title,
      description,
      dueDate,
      completed: completed || false,
      userId: req.userId, // 👈 se extrae del token
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error al crear tarea:', error);
    res.status(500).json({ message: 'Error al crear la tarea', error });
  }
  console.log('✅ Usuario autenticado:', req.userId);
};



// Controller de tareas
exports.getTasks = async (req, res) => {
  try {
    const userId = req.userId; // <- esto lo pone el middleware
    const tasks = await Task.find({ userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tareas.', error });
  }
};


exports.completeTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { completed: true },
      { new: true }
    );
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error al completar la tarea.', error });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la tarea.', error });
  }
};
