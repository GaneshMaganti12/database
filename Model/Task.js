const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: 'User'
    }
})

const Task = mongoose.model('Task', TaskSchema)

module.exports = Task;