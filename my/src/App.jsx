import "./App.scss";
import AllProduct from "./components/allProduct/AllProduct";
import DescriptionStore from "./components/descriptionStore/DescriptionStore";
import Feedback from "./components/feedback/Feedback";
import { IoSearch } from "react-icons/io5";
import { GiTreeBeehive } from "react-icons/gi";
import { Routes, Route, Link } from "react-router-dom";
import Routess from "./Routess.json";
import { useState } from "react";



function App() {
  const [page, setPage] = useState(localStorage.getItem('title') ||"")
  return (
    <div className="App">
      <div className="header">
        <GiTreeBeehive className="header__logo" />
        <h1 className="header__StoreTitle">Bee Store</h1>
        <h2 className="header__pageTitle">{page}</h2>
      </div>
      <div className="body">
        <div className="body__productCategory">
          <div className="search">
            <input type="text" className="search__inp" />
            <IoSearch className="search__logo" />
          </div>
          <div className="category">
            {Routess.ROUTES.map((item, index) => {
              return (
                <Link key={index} to={item.route}>
                  <div onClick={()=>{localStorage.setItem('title', item.title);setPage(item.title)}} className="category__card">{item.title}</div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="body__products">
      <Routes>
        <Route path="/" element={<AllProduct />} />
        <Route path="/descriptionStore" element={<DescriptionStore />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>          
        </div>
      </div>
      <div className="basement"></div>
    </div>
  );
}

export default App;
{/*  */}