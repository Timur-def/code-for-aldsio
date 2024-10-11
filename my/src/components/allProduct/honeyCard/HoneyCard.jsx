import './HoneyCard.scss'


export default function HoneyCard({data}) {
  return (
    <div className="card">
      <div className="card__photoProduct"></div>
      <div className="card__text">
        <h3 className="card__price">{data.price}₽</h3>
        <p className="card__title">{data.title}</p>
      </div>
        <button className="card__btnbuy">Купить</button>
    </div>
  );
}
