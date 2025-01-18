import mongoose from 'mongoose'
import Product from '../models/product.model.js'

export const getProducts = async (req, res) => {
	try {
		const products = await Product.find({})
		res.status(200).json({ success: true, data: products })
	} catch (error) {
		console.error("Ошибка при получении продуктов:", error.message)
		res.status(500).json({ success: false, message: "Ошибка сервера" })
	}
}

export const createProduct = async (req, res) => {
	const product = req.body

	// Проверяем наличие обязательных полей
	if (!product.title || !product.price || !product.image) {
		return res.status(400).json({ success: false, message: "Заполните все поля" })
	}

	try {
		// Создаем новый продукт
		const newProduct = new Product(product)
		await newProduct.save() // Сохраняем продукт

		res.status(201).json({ success: true, data: newProduct })
	} catch (error) {
		console.error("Ошибка при добавлении товара:", error.message)
		res.status(500).json({ success: false, message: "Ошибка сервера" })
	}
}

export const updateProduct = async (req, res) => {
	const { id } = req.params
	const product = req.body

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Неверный ID продукта" })
	}

	try {
		const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true })
		if (!updatedProduct) {
			return res.status(404).json({ success: false, message: "Продукт не найден" })
		}
		res.status(200).json({ success: true, data: updatedProduct })
	} catch (error) {
		console.error("Ошибка при обновлении продукта:", error.message)
		res.status(500).json({ success: false, message: "Ошибка сервера" })
	}
}

export const deleteProduct = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Неверный ID продукта" })
	}

	try {
		const deletedProduct = await Product.findByIdAndDelete(id)
		if (!deletedProduct) {
			return res.status(404).json({ success: false, message: "Продукт не найден" })
		}
		res.status(200).json({ success: true, message: "Товар удален" })
	} catch (error) {
		console.error("Ошибка при удалении продукта:", error.message)
		res.status(500).json({ success: false, message: "Ошибка сервера" })
	}
}
