import mongoose from 'mongoose'

export async function connectDB() {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URL)
		console.log(`MongoDB CONNECT:${conn.connection.host}`)

	} catch (error) {
		console.error(`Error: ${error.message}`)
		process.exit(1) // 1 - ошибка
	}
}