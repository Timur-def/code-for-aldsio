import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    price: { type: Number, required: true },
    volume: { type: Number && String, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true }
});
const cartSchema = new mongoose.Schema({
    products: [cartItemSchema],
}, {
    timestamps: true
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;