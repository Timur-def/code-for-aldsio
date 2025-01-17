import { useEffect, useRef, useState } from "react"
import "./AllProduct.scss"
import dataProducts from "./dateProduct.json"
import HoneyCard from "./honeyCard/HoneyCard"

export default function AllProduct({ setModalFilter, modalFilter }) {
  const prices = dataProducts.PRODUCT.map(product => product.price)
  const minInpPrice = prices.length > 0 ? Math.min(...prices) : 0 // Минимальная цена
  const maxInpPrice = prices.length > 0 ? Math.max(...prices) : Infinity // Максимальная цена
  const [searchResults, setSearchResults] = useState([])
  const [optionValue, setOptionValue] = useState(0.5 || "")
  const minPriceRef = useRef(minInpPrice)
  const maxPriceRef = useRef(maxInpPrice)
  const [isCheckBoxPrice, setIsCheckBoxPrice] = useState(false)
  const [isCheckBoxVolume, setIsCheckBoxVolume] = useState(false)

  const handleOptionChange = (event) => {
    setOptionValue(event.target.value)
  }

  const handleIsCheckBoxPrice = (e) => {
    setIsCheckBoxPrice(e.target.checked)
  }

  // Используем useEffect для установки всех товаров при первом рендере
  useEffect(() => {
    setSearchResults(dataProducts.PRODUCT)
  }, [])

  const handleMinPriceChange = (event) => {
    minPriceRef.current = event.target.value
  }

  const handleMaxPriceChange = (event) => {
    maxPriceRef.current = event.target.value
  }

  const handleFilteredProduct = () => {


    let filteredProducts = dataProducts.PRODUCT

    if (isCheckBoxPrice) {
      const minPrice = minPriceRef.current ? parseFloat(minPriceRef.current) : 0
      const maxPrice = maxPriceRef.current ? parseFloat(maxPriceRef.current) : Infinity

      // Фильтруем товары по цене
      filteredProducts = filteredProducts.filter((product) => {
        return product.price >= minPrice && product.price <= maxPrice
      })
    }

    if (isCheckBoxVolume) {
      // Фильтруем уже отфильтрованные товары по объему
      filteredProducts = filteredProducts.filter((product) => {
        return product.volume == optionValue
      })
    }

    setSearchResults(filteredProducts)
    setModalFilter(false)
  }

  const handleIsCheckBoxVolume = (e) => {
    setIsCheckBoxVolume(e.target.checked)
    console.log(e.target.checked)
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
                    ...new Set(dataProducts.PRODUCT.map((item) => item.volume)),
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
      <div className="cards">
        {dataProducts.PRODUCT.map((data, index) => {
          return <HoneyCard className="honeyCard" data={data} key={index} />
        })}

      </div>
    </>
  )
}