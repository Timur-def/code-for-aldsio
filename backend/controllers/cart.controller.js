import mongoose from 'mongoose'
import Cart from '../models/cart.model.js'

export const getCartItems = async (req, res) => {
    try {
        const cartItems = await Cart.find({})
        res.status(200).json({ success: true, data: cartItems[0].products })
    } catch (error) {
        console.error("Ошибка при получении корзины", error.message)
        res.status(500).json({ success: false, message: "Ошибка сервера" })
    }
}

export const addToCart = async (req, res) => {
    const product = req.body

    if (!product || !product.id || !product.title || !product.description || !product.image || !product.volume || !product.price) {
        return res.status(400).json({ success: false, message: "Продукт не найден или отсутствуют необходимые поля" })
    }

    try {
        let cart = await Cart.findOne({})

        if (!cart) {
            cart = new Cart({
                products: []
            })
        }

        const existingProductIndex = cart.products.findIndex(item => item.id.toString() === product.id.toString())
        if (existingProductIndex === -1) {
            cart.products.push(product)
        }

        // Сохраняем корзину
        await cart.save()

        res.status(200).json({ success: true, data: cart })

    } catch (error) {
        console.error("Ошибка при добавлении товара в корзину:", error.message)
        res.status(500).json({ success: false, message: "Ошибка сервера" })
    }
}

export const removeFromCart = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Неверный ID продукта" })
    }

    try {
        const cart = await Cart.findOne({})
        if (!cart) {
            return res.status(404).json({ success: false, message: "Корзина не найдена" })
        }

        cart.products = cart.products.filter(product => product._id.toString() !== id)
        await cart.save()

        res.status(200).json({ success: true, message: "Товар успешно удален из корзины" })
    } catch (error) {
        console.error("Ошибка при удалении товара из корзины", error.message)
        res.status(500).json({ success: false, message: "Ошибка сервера" })
    }
}
