import "./App.scss";
import AllProduct from "./components/allProduct/AllProduct";
import DescriptionStore from "./components/descriptionStore/DescriptionStore";
import Feedback from "./components/feedback/Feedback";
import { IoSearch } from "react-icons/io5";
import { GiTreeBeehive } from "react-icons/gi";
import { Routes, Route, Link } from "react-router-dom";
import Routess from "./RoutessApp.json";
import { useState } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { MdNotifications } from "react-icons/md";

function App() {
  const [page, setPage] = useState(localStorage.getItem("title") || "");
  return (
    <div className="App">
      <header className="header">
        <GiTreeBeehive className="header__logo" />
        <h1 className="header__StoreTitle">Bee Store</h1>
        <h2 className="header__pageTitle">{page}</h2>
        <div className="logoBtn">
            <MdNotifications className="logoBtn__notification" />
            <PiPaperPlaneRightFill className="logoBtn__plane" />
            <FaShoppingBasket className="logoBtn__basket" />
          </div>
      </header>
      <main className="body">
        <div className="body__productCategory">
          <div className="search">
            <input type="text" className="search__inp" />
            <IoSearch className="search__logo" />
          </div>
          <nav>
            <ol className="category">
              {Routess.ROUTES.map((item, index) => {
                return (
                  <Link key={index} to={item.route}>
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
            <Route path="/allProduct" element={<AllProduct />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </div>
      </main>
      <div className="basement"></div>
    </div>
  );
}

export default App;
