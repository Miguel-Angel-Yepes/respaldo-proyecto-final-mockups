const mongoose = require('mongoose');

const AppoinmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    acceptedByAdmin: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("Appoinment", AppoinmentSchema);
