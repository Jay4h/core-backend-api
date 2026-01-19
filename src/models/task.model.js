const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required'],
        index: true // Index for faster queries
    },
    title: {
        type: String,
        required: [true, 'Task title is required'],
        trim: true,
        minlength: [1, 'Title must be at least 1 character'],
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [1000, 'Description cannot exceed 1000 characters'],
        default: ''
    },
    status: {
        type: String,
        enum: {
            values: ['pending', 'done'],
            message: 'Status must be either pending or done'
        },
        default: 'pending'
    },
    dueDate: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Compound index for efficient user-task queries
taskSchema.index({ userId: 1, status: 1 });
taskSchema.index({ userId: 1, createdAt: -1 });

// Method to check if task is overdue
taskSchema.methods.isOverdue = function () {
    if (!this.dueDate || this.status === 'done') {
        return false;
    }
    return new Date() > this.dueDate;
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
