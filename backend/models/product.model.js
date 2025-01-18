import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
	id: { type: Number, required: true },
	price: { type: Number, required: true },
	volume: { type: Number && String, required: true },
	title: { type: String, required: true },
	image: { type: String, required: true },
	description: { type: String, required: true }
})
const productsSchema = new mongoose.Schema({
	products: [productSchema],
})

const Product = mongoose.model("Product", productsSchema)

export default Product