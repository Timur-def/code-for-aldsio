import "./App.scss";
import AllProduct from "./components/allProduct/AllProduct";
import DescriptionStore from "./components/descriptionStore/DescriptionStore";
import Feedback from "./components/feedback/Feedback";
import InpSearchResults from "./components/inpSearchResults/InpSearchResults";
import { GiTreeBeehive } from "react-icons/gi";
import { Routes, Route, Link } from "react-router-dom";
import Routess from "./components/allProduct/Routess.json";
import { useState } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { MdNotifications, MdFilterListAlt } from "react-icons/md";
import DescriptionProduct from "./components/allProduct/descriptionProduct/DescriptionProduct";
import Cart from "./components/cart/Cart";
import Recipes from "./components/recipes/Recipes";

function App() {
  const [page, setPage] = useState(localStorage.getItem("title") || "");
  const [modalFilter, setModalFilter] = useState(false);
  const isModalFilter = () => {
    if (!modalFilter) {
      setModalFilter(true);
    } else {
      setModalFilter(false);
    }
  };
  return (
    <div className="App">
      <header className="header">
        <GiTreeBeehive className="header__logo" />
        <h1 className="header__StoreTitle">Bee Store</h1>
        <h2 className="header__pageTitle">{page}</h2>
        <div className="logoBtn">
          <MdNotifications className="logoBtn__notification" />
          <MdFilterListAlt
            className="logoBtn__filter"
            onClick={isModalFilter}
          />
          
          <Link to={"/cart"} className="logoBtn__basket">
            <FaShoppingBasket className="basket" />
          </Link>
        </div>
      </header>
      <main className="body">
        <div className="body__productCategory">
          <InpSearchResults />
          <nav>
            <ol className="category">
              {Routess.ROUTES_APP.map((item, index) => {
                return (
                  <Link key={index} to={item.route} className="category__link">
                    <li
                      onClick={() => {
                        localStorage.setItem("title", item.title);
                        setPage(item.title);
                      }}
                      className="category__card"
                    >
                      {item.title}
                    </li>
                  </Link>
                );
              })}
            </ol>
          </nav>
        </div>
        <div className="body__products">
          <Routes>
            <Route path="/" element={<DescriptionStore />} />
            <Route
              path="/allProduct"
              element={<AllProduct modalFilter={modalFilter}/>}
            />
            <Route path="/feedback" element={<Feedback />} />
            <Route
              path="/descriptionProduct"
              element={<DescriptionProduct />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/recipes" element={<Recipes />} />
          </Routes>
        </div>
      </main>
      <div className="basement"></div>
    </div>
  );
}

export default App;

// Цветовая палитра: Тёплые и натуральные цвета, такие как золотистый, жёлтый, коричневый и зелёный, создадут ощущение близости к природе и свежести продукта.
//Главная страница: На главной странице стоит добавить слайдер с акциями и новинками.
//Блог: Раздел с полезными статьями о мёде, его пользе, рецептах и других темах, связанных с продуктом. Это не только привлечёт внимание, но и поможет в SEO.
//Фильтрация и сортировка
