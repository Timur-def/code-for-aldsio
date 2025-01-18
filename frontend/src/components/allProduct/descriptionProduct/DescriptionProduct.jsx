import { useLocation } from "react-router-dom"
import "./DescriptionProduct.scss"
export default function DescriptionProduct() {
  const location = useLocation()
  const { data } = location.state || {} // Получаем описание из state
  if (!data || !data.id) {
    console.log(location.state)
    return <p>Descr invalid</p>
  }

  return (
    <div className="cardDescription">
      <h2>Описание продукта</h2>
      <img src={data.image} className="cardDescription__image" />
      <div className="cardDescription__bottomBlock">
        <h2 className="cardDescription__price">Цена: {data.price}₽</h2>
        {data.description ? (
          <h3 className="cardDescription__Descr">{data.description}</h3>
        ) : (
          <p>Описание не доступно</p>
        )}
      </div>
    </div>
  )
}
