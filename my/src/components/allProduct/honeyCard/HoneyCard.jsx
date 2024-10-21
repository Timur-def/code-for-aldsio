import "./HoneyCard.scss";
import OrderHoney from "./orderHoney/OrderHoney";
import { Routes, Route, Link } from "react-router-dom";
import Routess from "../Routess.json";
import DescriptionProduct from "../descriptionProduct/DescriptionProduct";
import { BsFillFileTextFill } from "react-icons/bs";

export default function HoneyCard({ data }) {
  return (
    <>
      <div className="card">
        <div className="card__photoProduct"></div>
        <div className="card__text">
          <h3 className="card__price">{data.price}₽</h3>
          <p className="card__title">{data.title}</p>
          <div className="card__btn">
            {Routess.ROUTES_HONEYCARD.map((item, index) => {
              return (
                <Link key={index} to={item.route}>
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
