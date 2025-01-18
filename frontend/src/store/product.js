import { create } from 'zustand'

export const useProductStore = create((set) => ({
	products: [],
	setProducts: (products) => set({ products }),
	createProduct: async (newProduct) => {
		if (!newProduct.name || !newProduct.price || !newProduct.image) {
			return { succes: false, message: "Нету продукта" }
		}
		const res = await fetch("/api/products", {
			method: "POST",

			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newProduct)

		})
		const data = await res.json()

		set((state) => ({ products: [...state.products, data.data] }))
		return { succes: true, message: "Товар успешно создан" }
	},
	fetchProducts: async () => {
		const res = await fetch("/api/products")
		const data = await res.json()
		set({ products: data.data })
	},
	deleteProducts: async (pid) => {
		const res = await fetch(`/api/products/${pid}`, {
			method: "DELETE"
		}
		)
		const data = await res.json()
		if (!data.succes) {
			return { succes: false, message: data.message }
		}

		set(state => ({ products: state.products.filter(product => product._id !== pid) }))
		return { succes: true, message: "Товар успешно удален" }
	},
	updateProduct: async (pid, updatedProduct) => {
		const res = await fetch(`/api/products/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(updatedProduct)
		})
		const data = await res.json()

		if (!data.succes) {
			return { succes: false, message: data.message }
		}

		set(state => ({
			products: state.products.map(product => product._id === pid ? data.data : product)
		}))
		return { succes: true, message: "Товар изменён" }


	}
}))
