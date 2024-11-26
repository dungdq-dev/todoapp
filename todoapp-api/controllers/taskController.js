import Task from "../models/Task.js";

// @desc   Get all tasks
// @route  GET /api/tasks
export const getTasks = async (req, res, next) => {
  const pageSize = parseInt(req.query.pageSize);

  const tasks = await Task.find();

  if (!isNaN(pageSize) && pageSize > 0) {
    return res.status(200).json(tasks.slice(0, pageSize));
  }
  res.status(200).json(tasks);
};

// @desc    Get single task
// @route   GET /api/tasks/:id
export const getTaskById = async (req, res, next) => {
  const id = req.params.id;
  let task = null;
  
  try {
    task = await Task.findById(id);
  } catch (error) {
    return res.status(400).json({ msg: error });
  }

  if (!task) {
    const err = new Error("Task not found");
    err.status = 404;
    return next(err);
  }

  res.status(200).json(task);
};

// @desc    Create new task
// @route   POST /api/tasks
export const createTask = async (req, res, next) => {
  const newTask = {
    text: req.body.text,
    day: req.body.day,
    reminder: req.body.reminder
  };

  if (!newTask.text || !newTask.day) {
    const err = new Error("Title and day cannot leave empty");
    err.status = 400;
    return next(err);
  }

  await Task.create(newTask);
  res.status(201).json(newTask);
};

// @desc    Update task
// @route   PUT /api/tasks/:id
export const updateTask = async (req, res, next) => {
  const id = req.params.id;
  let task = null;
  
  try {
    task = await Task.findById(id);
  } catch (error) {
    return res.status(400).json({ msg: error });
  }

  if (!task) {
    const err = new Error("Task not found");
    err.status = 404;
    return next(err);
  }

  task.text = req.body.text;
  task.day = req.body.day;
  task.reminder = req.body.reminder;

  await task.save();
  res.status(200).json({ msg: "Updated task" });
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
export const deleteTask = async (req, res, next) => {
  const id = req.params.id;
  let task = null;

  try {
    task = await Task.findById(id);
  } catch (error) {
    return res.status(400).json({ msg: error });
  }

  if (!task) {
    const err = new Error("Task not found");
    err.status = 404;
    return next(err);
  }

  await Task.deleteOne({ _id: task._id });
  res.status(204).json({ msg: "Deleted task" });
};
