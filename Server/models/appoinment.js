import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

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
    animal: { // perro o gato
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    petName: {
        type: String,
        required: true
    },
    appoinmentType: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    },
    isDone: {
        type: Boolean,
        default: false
    }
});

AppoinmentSchema.plugin(mongoosePaginate);

export default mongoose.model("Appoinment", AppoinmentSchema);
