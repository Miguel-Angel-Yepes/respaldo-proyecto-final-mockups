import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    dateOfBirth: {
        type: Date,
        required: true,
    },
    role: String,
    active: Boolean,
});

export default mongoose.model("User", UserSchema);
