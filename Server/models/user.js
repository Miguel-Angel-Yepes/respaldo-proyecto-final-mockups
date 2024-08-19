const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    dateOfBirth: {
        type: Date,
        required: true
    },
    role: String,
    active: Boolean,
});

module.exports = mongoose.model("User", UserSchema);