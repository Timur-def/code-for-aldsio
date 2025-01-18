import { Link, useLocation } from "react-router-dom"
import AddCartButton from "../addCartButton/AddCartButton"
import "./HoneyCard.scss"
export default function HoneyCard({ data }) {
  const location = useLocation()

  return (
    <>
      <div className="card">
        <Link
          className="card__photoProduct"
          to={"/descriptionProduct"}
          state={{ data }} // Передаем описание в state
        >
          <img
            src={data.image}
            className="card__photoProduct"
            alt={data.title}
          />
        </Link>
        <div className="card__text">
          <h3 className="card__price">{data.price}₽</h3>
          <p className="card__title">{data.title}</p>
          <div className="card__btn">
            <AddCartButton data={data} />
          </div>
        </div>
      </div>
    </>
  )
}