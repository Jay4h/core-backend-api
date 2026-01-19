const Task = require('../models/task.model');

/**
 * @route   POST /tasks
 * @desc    Create a new task
 * @access  Private
 */
const createTask = async (req, res, next) => {
    try {
        const { title, description, status, dueDate } = req.body;

        const task = new Task({
            userId: req.user.userId,
            title,
            description,
            status: status || 'pending',
            dueDate: dueDate || null
        });

        await task.save();

        res.status(201).json({
            success: true,
            message: 'Task created successfully',
            data: { task }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /tasks
 * @desc    Get all tasks for current user (with optional filters)
 * @access  Private
 */
const getTasks = async (req, res, next) => {
    try {
        const { status, sortBy = 'createdAt', order = 'desc', limit = 50, page = 1 } = req.query;

        // Build filter
        const filter = { userId: req.user.userId };
        if (status && ['pending', 'done'].includes(status)) {
            filter.status = status;
        }

        // Build sort
        const sort = {};
        sort[sortBy] = order === 'asc' ? 1 : -1;

        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Execute query
        const tasks = await Task.find(filter)
            .sort(sort)
            .limit(parseInt(limit))
            .skip(skip);

        // Get total count for pagination
        const total = await Task.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: {
                tasks,
                pagination: {
                    total,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    pages: Math.ceil(total / parseInt(limit))
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /tasks/:id
 * @desc    Get a single task by ID
 * @access  Private
 */
const getTaskById = async (req, res, next) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        res.status(200).json({
            success: true,
            data: { task }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   PATCH /tasks/:id
 * @desc    Update a task
 * @access  Private
 */
const updateTask = async (req, res, next) => {
    try {
        const { title, description, status, dueDate } = req.body;

        // Build update object
        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (status !== undefined) updateData.status = status;
        if (dueDate !== undefined) updateData.dueDate = dueDate;

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No valid fields to update'
            });
        }

        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.userId },
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            data: { task }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   DELETE /tasks/:id
 * @desc    Delete a task
 * @access  Private
 */
const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
            data: { task }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
};
