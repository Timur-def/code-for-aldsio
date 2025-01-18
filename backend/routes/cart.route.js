import express from "express"
import {  addToCart, getCartItems, removeFromCart } from '../controllers/cart.controller.js'
const router = express.Router()
router.get("/", getCartItems)

router.post("/", addToCart)


router.delete("/:id", removeFromCart)

export default router