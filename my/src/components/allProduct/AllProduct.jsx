import { useRef, useState, useEffect } from "react";
import dataProducts from "../feedback/dateProduct.json";
import HoneyCard from "./honeyCard/HoneyCard";
import "./AllProduct.scss";

export default function AllProduct({ modalFilter }) {
  const [searchResults, setSearchResults] = useState([]);
  const [optionValue, setOptionValue] = useState(0.5 || "");
  const minPriceRef = useRef(0);
  const maxPriceRef = useRef(0);
  const [isCheckBoxPrice, setIsCheckBoxPrice] = useState(false)
  const [isCheckBoxVolume, setIsCheckBoxVolume] = useState(false)


  const handleOptionChange = (event) => {
    setOptionValue(event.target.value);
    console.log(event.target.value);
  };

  const handleIsCheckBoxPrice = (e)=>{
    setIsCheckBoxPrice(e.target.checked);
    console.log(e.target.checked);
  }

  // Используем useEffect для установки всех товаров при первом рендере
  useEffect(() => {
    setSearchResults(dataProducts.PRODUCT);
  }, []);

  const handleMinPriceChange = (event) => {
    minPriceRef.current = event.target.value;
  };

  const handleMaxPriceChange = (event) => {
    maxPriceRef.current = event.target.value;
  };

  const handleFilteredProduct = () => {
    if (isCheckBoxPrice === true) {
      const minPrice = minPriceRef.current ? parseFloat(minPriceRef.current) : 0;
    const maxPrice = maxPriceRef.current
      ? parseFloat(maxPriceRef.current)
      : Infinity;

    // Фильтруем товары по цене
    const filteredProducts = dataProducts.PRODUCT.filter((product) => {
      return product.price >= minPrice && product.price <= maxPrice;
    });
    setSearchResults(filteredProducts);
    console.log(filteredProducts);
    }
    if (isCheckBoxVolume===true) {
      const filteredProducts = dataProducts.PRODUCT.filter((product) => {
        return product.volume == optionValue
      });
      setSearchResults(filteredProducts);
      console.log(filteredProducts);
    }
    
  };

  
  const handleIsCheckBoxVolume = (e)=>{
    setIsCheckBoxVolume(e.target.checked);
    console.log(e.target.checked);
  }
  return (
    <>
      {modalFilter && (
        <div className="modalWindowFilter">
          <div className="filterCategory">
            <input type="checkbox" value={isCheckBoxPrice} onChange={handleIsCheckBoxPrice}/>
            <p>Фильтрация по цене</p>

            <p>
              От <input type="number" onChange={handleMinPriceChange} />Р до{" "}
              <input type="number" onChange={handleMaxPriceChange} />Р
            </p>
          </div>
          <div className="filterCategory">
          <input type="checkbox" value={isCheckBoxVolume} onChange={handleIsCheckBoxVolume}/>
            <p>Фильтрация по объёму тары</p>
            <p>
              Выбирете объём тары{" "}
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
            <button onClick={handleFilteredProduct}>Применить</button>
          </div>
        </div>
      )}
      <div className="cards">
        {searchResults.map((item, index) => {
          return <HoneyCard className="honeyCard" key={index} data={item} />;
        })}
      </div>
    </>
  );
}
