import "./FeedbackCard.scss";

export default function FeedbackCard() {
    return(
        <>
            <div className="FBCard">
                <h3 className="nameUser"></h3>
                <p className="feedback"></p>
                <div className="rating"></div>
            </div>
        </>
    )
}