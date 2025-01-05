import "./Main.scss";

import dateProduct from "../allProduct/dateProduct.json";
import HoneyCard from "../allProduct/honeyCard/HoneyCard";
export default function DescriptionStore() {
  return (
    <div className="main">
      <div className="recommendations">
        <h1>Рекомендации</h1>
        <div className="recommendations__blocks">
          <div className="recommendations__block-recommendation">
            <h3>Для новых покупателей</h3>
            <div>
              {dateProduct.PRODUCT.slice(14, 15).map((item) => {
                return <HoneyCard />;
              })}
            </div>
          </div>
          <div className="recommendations__block-recommendation">
            <h3>Подарки на праздики</h3>
            <div>
              {dateProduct.PRODUCT.slice(15).map((item) => {
                return <HoneyCard />;
              })}
            </div>
          </div>
          <div className="recommendations__block-recommendation">
            <h3>Для любителей пожевать</h3>
            <div>
              {dateProduct.PRODUCT.slice(6, 7).map((item) => {
                return <HoneyCard />;
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="down-container">
        <div className="descrStr">
          <h2 className="descrStr__headTexts">О магазине</h2>
          <p className="descrStr__textDescr">
            Магазин натурального мёда. Наш мёд продается в стеклянной таре, без
            добавок, с сохранением всех полезных свойств. Если вы
            заинтересовались и хотите побыстрее опробовать наш мёд, то
            переходите в раздел "Наши товары", выберите любой представленный
            продукт и просто нажмите кнопку "Заказать". После этого в пару
            мгновений оформите заказ и получите через несколько дней наш мёд
            доставкой прямо на дом.
          </p>
        </div>
        <div className="contactInf">
          <h2>Контактная информация</h2>
          <div className="contactInf__block">
          <p className="contactInf__upForEmail">
            Обратная связь и деловые предложения:
          </p>
          <p className="contactInf__e-mail">BeeStore@yandex.ru</p>
          <p className="contactInf__numPhone">8-800-555-35-35</p>
          </div>
        </div>
      </div>
    </div>
  );
}
