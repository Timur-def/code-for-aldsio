import mongoose from 'mongoose'
import Product from '../models/product.model.js'
export const getProducts = async (req, res) => {
	try {
		const products = await Product.find({})
		res.status(200).json({ succes: true, data: products })
	} catch (error) {
		console.error("Ошибка при получении продуктов", error.message)
		res.status(500).json({ succes: false, message: "Ошибка сервера" })
	}
}

export const createProduct = async (req, res) => {
	const product = req.body

	if (!product.name || !product.price || !product.image) {
		return res.status(400).json({ succes: false, message: "Заполните все поля" })

	}

	const newProduct = new Product(product)
	try {
		await newProduct.save()
		res.status(201).json({ succes: true, data: newProduct })
	} catch (error) {
		console.error("Ошибка при создании продукта", error.message)
		res.status(500).json({ succes: false, message: "Ошибка сервера" })
	}
}

export const updateProduct = async (req, res) => {
	const { id } = req.params

	const product = req.body

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ succes: false, message: "Неверный ID продукта" })
	}


	try {
		const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true })
		res.status(200).json({ succes: true, data: updatedProduct })
	} catch (error) {
		console.error("Ошибка при обновлении продукта")
		res.status(500).json({ succes: false, message: "Ошибка сервера" })
	}
}

export const deleteProduct = async (req, res) => {
	const { id } = req.params
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ succes: false, message: "Неверный ID продукта" })
	}

	try {
		await Product.findByIdAndDelete(id)
		res.status(200).json({ succes: true, message: "Товар удален" })
	} catch (error) {
		console.error("Ошибка при удалении продукта", error.message)
		res.status(500).json({ succes: false, message: "Ошибка сервера" })
	}

}