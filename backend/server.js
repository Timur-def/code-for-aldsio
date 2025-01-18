import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import path from "path"
import { connectDB } from './config/db.js'
import cartRoutes from "./routes/cart.route.js"
import productRoutes from "./routes/product.route.js"
dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())

app.use(cors({
	origin: 'http://localhost:5173'
}))
const __dirname = path.resolve()
app.use(express.json())

app.use("/api/products", productRoutes)

app.use("/api/cart", cartRoutes)

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")))
	app.get("*", (req, res) => {
		req.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
	})
}

app.listen(PORT, () => {
	connectDB()
	console.log(`Сервер запущен на ${PORT} порту!`)

})