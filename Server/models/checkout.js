import mongoose from 'mongoose';

const ClientDataSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: {
        type: String,
    },
    identification: {
        type: String,
    },
    phoneNumber: {
        type: String,
    }
});

const ClientDirectionSchema = new mongoose.Schema({
    department: String,
    municipality: String,
    street: String,
    aditionalDescription: String,
    neighborhood: String
});

const CheckoutSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    clientData: [ClientDataSchema],
    clientDirection: [ClientDirectionSchema],
    delivery: Boolean,
});

export default mongoose.model('Checkout', CheckoutSchema);
