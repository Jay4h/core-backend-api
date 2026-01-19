const Task = require('../models/task.model');
const User = require('../models/user.model');

/**
 * @route   GET /stats
 * @desc    Get user statistics (tasks summary)
 * @access  Private
 */
const getStats = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        // Get task counts by status
        const taskStats = await Task.aggregate([
            { $match: { userId } },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Convert to object
        const stats = {
            pending: 0,
            done: 0
        };

        taskStats.forEach(stat => {
            stats[stat._id] = stat.count;
        });

        // Total tasks
        stats.total = stats.pending + stats.done;

        // Get overdue tasks count
        const overdueTasks = await Task.countDocuments({
            userId,
            status: 'pending',
            dueDate: { $lt: new Date() }
        });

        // Get tasks created today
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tasksCreatedToday = await Task.countDocuments({
            userId,
            createdAt: { $gte: today }
        });

        // Get tasks completed today
        const tasksCompletedToday = await Task.countDocuments({
            userId,
            status: 'done',
            updatedAt: { $gte: today }
        });

        // Completion rate
        const completionRate = stats.total > 0
            ? ((stats.done / stats.total) * 100).toFixed(2)
            : 0;

        res.status(200).json({
            success: true,
            data: {
                stats: {
                    totalTasks: stats.total,
                    pendingTasks: stats.pending,
                    completedTasks: stats.done,
                    overdueTasks,
                    tasksCreatedToday,
                    tasksCompletedToday,
                    completionRate: parseFloat(completionRate)
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @route   GET /health
 * @desc    Health check endpoint
 * @access  Public
 */
const healthCheck = async (req, res, next) => {
    try {
        const mongoose = require('mongoose');

        // Check database connection state (works in serverless)
        const isConnected = mongoose.connection.readyState === 1;

        // Try a simple query to verify database is actually working
        let dbWorking = false;
        try {
            await User.findOne().limit(1);
            dbWorking = true;
        } catch (dbError) {
            console.error('Database query failed:', dbError.message);
        }

        res.status(200).json({
            success: true,
            message: 'Server is healthy',
            data: {
                status: 'OK',
                timestamp: new Date().toISOString(),
                uptime: process.uptime(),
                database: isConnected && dbWorking ? 'connected' : 'disconnected',
                environment: process.env.NODE_ENV || 'development'
            }
        });
    } catch (error) {
        res.status(503).json({
            success: false,
            message: 'Service unavailable',
            data: {
                status: 'ERROR',
                timestamp: new Date().toISOString(),
                error: error.message
            }
        });
    }
};

module.exports = {
    getStats,
    healthCheck
};
