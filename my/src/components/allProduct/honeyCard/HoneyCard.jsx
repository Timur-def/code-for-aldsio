import "./HoneyCard.scss";
import OrderHoney from "./orderHoney/OrderHoney";
import { Routes, Route, Link } from "react-router-dom";
import Routess from "./RoutessOrderHoney.json";

export default function HoneyCard({ data }) {
  return (
    <div className="card">
      <div className="card__photoProduct"></div>
      <div className="card__text">
        <h3 className="card__price">{data.price}₽</h3>
        <p className="card__title">{data.title}</p>
      </div>
      {Routess.ROUTES.map((item, index) => {
        return (
          <Link key={index} to={item.route}>
            <button className="card__btnbuy">Заказать</button>
          </Link>
        );
      })}
      <Routes>
            <Route path="/orderHoney" element={<OrderHoney />} />
          </Routes>
    </div>
  );
}
