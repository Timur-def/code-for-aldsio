import dataProducts from "../feedback/dateProduct.json";
import HoneyCard from "./honeyCard/HoneyCard";
import "./AllProduct.scss";

export default function AllProduct() {
  return (
    <div className="cards">
    {dataProducts.PRODUCT.map((item, index)=>{
      return <HoneyCard className="honeyCard" key={index} data={item}/>
    })}
    </div>
  );
}
