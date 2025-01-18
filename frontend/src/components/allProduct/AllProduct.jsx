import { useEffect, useRef, useState } from "react"
import { useProductStore } from "../../store/product"
import "./AllProduct.scss"
import HoneyCard from "./honeyCard/HoneyCard"
export default function AllProduct({ setModalFilter, modalFilter }) {

  const { products, fetchProducts, setProducts } = useProductStore()
  const prices = products.map(product => product.price)
  const minInpPrice = prices.length > 0 ? Math.min(...prices) : 0 // Минимальная цена
  const maxInpPrice = prices.length > 0 ? Math.max(...prices) : Infinity // Максимальная цена
  const [searchResults, setSearchResults] = useState([...products])
  const [optionValue, setOptionValue] = useState(0.5 || "")
  const minPriceRef = useRef(minInpPrice)
  const maxPriceRef = useRef(maxInpPrice)
  const [isCheckBoxPrice, setIsCheckBoxPrice] = useState(false)
  const [isCheckBoxVolume, setIsCheckBoxVolume] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleOptionChange = (event) => {
    setOptionValue(event.target.value)
  }

  const handleIsCheckBoxPrice = (e) => {
    setIsCheckBoxPrice(e.target.checked)
  }


  const handleMinPriceChange = (event) => {
    minPriceRef.current = event.target.value
  }

  const handleMaxPriceChange = (event) => {
    maxPriceRef.current = event.target.value
  }

  useEffect(() => {
    if (products.length > 0) {
      setSearchResults(products) // Инициализируем результаты сразу всеми продуктами
      const prices = products.map(product => product.price)
      minPriceRef.current = Math.min(...prices)
      maxPriceRef.current = Math.max(...prices)
    }
  }, [products])

  const handleFilteredProduct = () => {
    let filteredProducts = [...products] // Используем исходные продукты для фильтрации

    // Фильтруем товары по цене, если выбран чекбокс цены
    if (isCheckBoxPrice) {
      const minPrice = parseFloat(minPriceRef.current) || 0
      const maxPrice = parseFloat(maxPriceRef.current) || Infinity

      filteredProducts = filteredProducts.filter((product) =>
        product.price >= minPrice && product.price <= maxPrice
      )
    }

    // Фильтруем по объему, если выбран чекбокс объема
    if (isCheckBoxVolume) {
      filteredProducts = filteredProducts.filter((product) =>
        product.volume == optionValue
      )
    }

    // Обновляем результаты поиска
    setSearchResults(filteredProducts)

    setIsCheckBoxVolume(false)
    setIsCheckBoxPrice(false)
    // Закрываем модальное окно
    setModalFilter(false)
  }


  const handleIsCheckBoxVolume = (e) => {
    setIsCheckBoxVolume(e.target.checked)
  }
  return (
    <>
      {modalFilter && (
        <div className="modalWindowFilter">
          <h1>Фильтры</h1>
          <div className="modalWindowFilter__block">
            <div className="filterCategory">
              <input
                className="checkbox"
                type="checkbox"
                value={isCheckBoxPrice}
                onChange={handleIsCheckBoxPrice}
              />
              <p className="texts">Фильтрация по цене</p>

              <p className="texts">
                От
                <input
                  className="input"
                  type="number"
                  placeholder={minInpPrice}
                  onChange={handleMinPriceChange}
                />
                ₽ до
                <input
                  className="input"
                  type="number"
                  placeholder={maxInpPrice}
                  onChange={handleMaxPriceChange}
                />
                ₽
              </p>
            </div>
            <div className="filterCategory">
              <input
                className="checkbox"
                type="checkbox"
                value={isCheckBoxVolume}
                onChange={handleIsCheckBoxVolume}
              />
              <p className="texts">Фильтрация по объёму тары</p>
              <p className="texts">
                Выбирете объём тары
                <select onChange={handleOptionChange}>
                  {[
                    ...new Set(products.map((item) => item.volume)),
                  ].map((volume, index) => (
                    <option value={volume} key={index}>
                      {volume}
                    </option>
                  ))}
                </select>
              </p>
            </div>
          </div>
          <button onClick={handleFilteredProduct} className="btn-adds">
            Применить
          </button>
        </div>
      )}
      {!products ? <p>Загрузка...</p> : <div className="cards">
        {searchResults.map((data, index) => {
          return <HoneyCard className="honeyCard" data={data} key={index} />
        })}

      </div>}

    </>
  )
}