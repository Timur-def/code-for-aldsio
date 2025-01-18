import "./App.scss";
import AllProduct from "./components/allProduct/AllProduct";
import Main from "./components/main/Main";
import Feedback from "./components/feedback/Feedback";
import InpSearchResults from "./components/inpSearchResults/InpSearchResults";
import { GiTreeBeehive } from "react-icons/gi";
import { Routes, Route, Link } from "react-router-dom";
import Routess from "./components/allProduct/Routess.json";
import { useState } from "react";
import { FaShoppingBasket, FaQuestion } from "react-icons/fa";
import { MdFilterListAlt } from "react-icons/md";
import DescriptionProduct from "./components/allProduct/descriptionProduct/DescriptionProduct";
import Cart from "./components/cart/Cart";
import FAQ from "./components/faq/Faq";

function App() {
  const [page, setPage]=useState(localStorage.getItem("title") || "");
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
      <main className="body">
        <div className="body__productCategory">
          <div className="header">
            <GiTreeBeehive className="header__logo" />
            <h1 className="header__StoreTitle">Bee Store</h1>
          </div>
          <nav className="nav">
              <InpSearchResults />
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
                      <img className="category__logo" src={item.image} />
                      <p className="category__title">{item.title}</p>
                    </li>
                  </Link>
                );
              })}
            </ol>
          </nav>
              <div className="basement">
                <div className="logoBtn">
                  <Link to={"/quest"} className="logoBtn__question">
                    <FaQuestion className="question" />
                  </Link>
                  <Link to={"/allProduct"} className="logoBtn__filter">
                    <MdFilterListAlt
                      onClick={isModalFilter}
                      className="filter"
                    />
                  </Link>
                  <Link to={"/cart"} className="logoBtn__basket">
                    <FaShoppingBasket className="basket" />
                  </Link>
                </div>
              </div>
        </div>
        <div className="body__products">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/allProduct"
              element={
                <AllProduct
                  modalFilter={modalFilter}
                  setModalFilter={setModalFilter}
                />
              }
            />
            <Route path="/feedback" element={<Feedback />} />
            <Route
              path="/descriptionProduct"
              element={<DescriptionProduct />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/quest" element={<FAQ />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;

// Цветовая палитра: Тёплые и натуральные цвета, такие как золотистый, жёлтый, коричневый и зелёный, создадут ощущение близости к природе и свежести продукта.
//Главная страница: На главной странице стоит добавить слайдер с акциями и новинками.
//Блог: Раздел с полезными статьями о мёде, его пользе, рецептах и других темах, связанных с продуктом. Это не только привлечёт внимание, но и поможет в SEO.
//Фильтрация и сортировка
