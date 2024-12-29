import FeedbackCard from "./feedbackCard/FeedbackCard";
import "./Feedback.scss";
import { useEffect, useState } from "react";
import dateProduct from "./dateProduct.json";
import FeedBack from "./feedbackList.json";

export default function Feedback() {
  const [estimation, setEstimation] = useState(5);
  const [author, setAuthor] = useState("");
  const [feedback, setFeedback] = useState("");
  const [optionValue, setOptionValue] = useState("");
  const [modalAddNewFeedback, setModalAddNewFeedback] = useState(false);
  const [averageEstimation, setAverageEstimation] = useState(0);

  useEffect(() => {
    if (FeedBack.FDList.length === 0) {
      setAverageEstimation(0); // Если отзывов нет, устанавливаем 0
      return;
    }

    const totalEstimation = FeedBack.FDList.reduce((sum, feedback) => {
      return sum + +feedback.estimation;
    }, 0);

    const average = totalEstimation / FeedBack.FDList.length; // Находим среднее значение
    setAverageEstimation(average); // Устанавливаем среднее значение
  }, [FeedBack.FDList]); // Зависимость от массива отзывов

  const openClose_modalAddNewFeedback = () => {
    if (!modalAddNewFeedback) {
      setModalAddNewFeedback(true);
    } else {
      setModalAddNewFeedback(false);
    }
  };

  const changeEstimation = (event) => {
    setEstimation(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleOptionChange = (event) => {
    setOptionValue(event.target.value);
    console.log(event.target.value);
  };

  const AddNewFeedback = () => {
    if (author == null || author == "") {
      alert("Введите автора отзыва");
    } else if (optionValue == "" || optionValue == null) {
      alert("Укажите товар");
    } else if (feedback == "") {
      alert("Напишите отзыв");
    } else {
      const NewFeedback = {
        author: author,
        product: optionValue,
        date: new Date().toLocaleDateString(),
        text: feedback,
        estimation: estimation,
      };
      FeedBack.FDList = [...FeedBack.FDList, NewFeedback];

      alert("Ваш отзыв добавлен на сайт");
      setAuthor("");
      setFeedback("");
      setOptionValue("");
      setEstimation(5);
      setModalAddNewFeedback(false);
    }
  };
  return (
    <div className="feedbacks">
      <div className="leftBlock">
        <div className="addFeedback" onClick={openClose_modalAddNewFeedback}>
          +
        </div>
        {modalAddNewFeedback && (
          <div className="AddFD">
            <h1>Создание отзыва</h1>
            <div className="AddFD__card">
              <div className="textFd">
                Автор:
                <input
                  className="AddFD__input"
                  type="text"
                  value={author}
                  onChange={handleAuthorChange}
                />
              </div>
              <div className="textFd">
                Выбирете товар:
                <select className="AddFD__input" onChange={handleOptionChange}>
                  {dateProduct.PRODUCT.map((item, index) => {
                    return (
                      <option className="option" value={item.title} key={index}>
                        {item.title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="textFd">
                Отзыв:
                <input
                  className="AddFD__input"
                  type="text"
                  value={feedback}
                  onChange={handleFeedbackChange}
                />
              </div>
              <div className="textFd">
                Оценка:
                <input
                  type="range"
                  value={estimation}
                  onChange={changeEstimation}
                  min={1}
                  max={5}
                />
                <p>{estimation}</p>
              </div>
            </div>

            <button className="btn-add" onClick={AddNewFeedback}>
              Добавить
            </button>
          </div>
        )}
      </div>
      <div className="rightBlock">
        <p className="rightBlock__tableEstimation">Средняя оценка магазина: {averageEstimation.toFixed(1)}</p>
        <div className="rightBlock__feedbackList">
         <FeedbackCard/>
        </div>
      </div>
    </div>
  );
}
