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
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { MdNotifications } from "react-icons/md";
import OrderHoney from "./components/allProduct/honeyCard/orderHoney/OrderHoney";
import DescriptionProduct from "./components/allProduct/descriptionProduct/DescriptionProduct";


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
            <Route path="/allProduct" element={<AllProduct />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/orderHoney" element={<OrderHoney />} />
            <Route
              path="/descriptionProduct"
              element={<DescriptionProduct />}
            />
          </Routes>
        </div>
      </main>
      <div className="basement"></div>
    </div>
  );
}

export default App;
