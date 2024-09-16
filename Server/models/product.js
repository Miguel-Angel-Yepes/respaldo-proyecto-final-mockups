import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        maxLength: 150,
        required: true,
    },
    discount: {
        type: Boolean,
        required: true,
    },
    cantDiscount: {
        type: Number,
    },
    info: {
        type: String,
        maxLength: 250,
        required: true,
    },
    images: [{
        type: String,
        required: true,
    }],
    active: {
        type: Boolean,
        required: true,
    }
});

ProductSchema.plugin(mongoosePaginate);

export default mongoose.model('Product', ProductSchema);
