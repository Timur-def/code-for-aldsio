import "./FeedbackCard.scss";
import FeedBack from "../feedbackList.json";

export default function FeedbackCard() {
  return (
    <>
      {FeedBack.FDList.map((item) => {
        return (
          <div className="FBCard">
            <div className="FBCard__upBlock">
              <h3 className="FBCard__nameUser">{item.author}</h3>
              <h4 className="FBCard__product">{item.product}</h4>
            </div>
            <div className="FBCard__textBlock">
              <h3 className="FBCard__feedback">{item.text}</h3>
            </div>
            <div className="FBCard__downBlock">
              <h4 className="FBCard__date">{item.date}</h4>
              <h3 className="FBCard__estimation">{item.estimation}</h3>
            </div>
          </div>
        );
      })}
    </>
  );
}
