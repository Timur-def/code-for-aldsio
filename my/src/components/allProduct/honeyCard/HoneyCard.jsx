import "./HoneyCard.scss";
import OrderHoney from "./orderHoney/OrderHoney";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Routess from "../Routess.json";
import DescriptionProduct from "../descriptionProduct/DescriptionProduct";
import { BsFillFileTextFill } from "react-icons/bs";
import { GiHoneyJar } from "react-icons/gi";

export default function HoneyCard({ data }) {
  const location = useLocation();

  return (
    <>
      <div className="card">
        <div className="card__photoProduct"><GiHoneyJar className="honeyJar"/></div>
        <div className="card__text">
          <h3 className="card__price">{data.price}₽</h3>
          <p className="card__title">{data.title}</p>
          <div className="card__btn">
            {Routess.ROUTES_HONEYCARD.map((item, index) => {
              return (
                <Link 
                  key={index} 
                  to={item.route} 
                  state={{ description: data.description }} // Передаем описание в state
                >
                  {item.title === "description" && (
                    <BsFillFileTextFill className="btn__descr" />
                  )}
                  {item.title === "order" && (
                    <button className="btn__buy">Заказать</button>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/orderHoney" element={<OrderHoney />} />
        <Route path="/descriptionProduct" element={<DescriptionProduct />} />
      </Routes>
    </>
  );
}