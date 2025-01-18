import { create } from 'zustand'

export const useCartStore = create((set) => ({
    cart: [],
    setProducts: (cart) => set({ cart }),
    isProductInCart: (productId,cart) => {
        return cart.some((item) => item._id === productId);
    },
    addProduct: async (newProduct) => {
        if (!newProduct) {

            return { succes: false, message: "Заполните все поля." }
        }
        const res = await fetch("http://localhost:5000/api/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)

        })
        const data = await res.json()

        set((state) => ({ cart: [...state.cart, data.data.products] }))
        return { succes: true, message: "Товар успешно добавлен" }
    },
    fetchCart: async () => {
        const res = await fetch("http://localhost:5000/api/cart")
        const data = await res.json()
        set({ cart: data.data })
    },
    deleteProduct: async (id) => {
        const res = await fetch(`http://localhost:5000/api/cart/${id}`, {
            method: "DELETE"
        }
        )
        const data = await res.json()
        if (data.succes) {
            console.log(1);

        }


        set(state => ({
            cart: state.cart.filter(product => product._id !== id)
        }))
        return { succes: true, message: "Товар успешно удален" }
    },

}))
