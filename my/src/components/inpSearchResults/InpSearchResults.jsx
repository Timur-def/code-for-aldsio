import "./InpSearchResults.scss";
import dateProduct from "../feedback/dateProduct.json";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function InpSearchResults() {
  const inpSearchRef = useRef();
  const [searchResults, setSearchResults] = useState([]);

  const listSearchProduct = () => {
    const searchValue = inpSearchRef.current.value.toLowerCase(); // Получаем значение из поля ввода и приводим к нижнему регистру
    if (searchValue === "") {
      setSearchResults([]);
      return;
    }
    const results = dateProduct.PRODUCT.filter((prdct) =>
      prdct.title.toLowerCase().includes(searchValue)
    );
    const sortedResults = results.sort((a, b) => {
      const aMatchIndex = a.title.toLowerCase().indexOf(searchValue);
      const bMatchIndex = b.title.toLowerCase().indexOf(searchValue);

      return aMatchIndex - bMatchIndex; // Сортируем по индексу первого совпадения
    });
    console.log(sortedResults.slice(0, 5));

    setSearchResults(sortedResults.slice(0, 5)); // Сохраняем результаты поиска в состоянии
  };

  // Вызовите listSearchProduct при изменении значения в поле ввода
  const handleSearchChange = () => {
    listSearchProduct();
  };

  return (
    <div className="searchBlock">
      <div className="search">
        <input
          type="text"
          ref={inpSearchRef}
          onChange={handleSearchChange}
          placeholder="Поиск товара"
          className="search__inp"
        />
      </div>

      <div className="search__results">
        {searchResults.map((product, indexProduct) => (
          <Link
            to={`/DescriptionProduct`}
            className="search__result"
            state={{ product }}
          >
            <p key={indexProduct}>{product.title} </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
