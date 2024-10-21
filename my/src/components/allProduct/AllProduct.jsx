import dataProducts from "./honeyCard/orderHoney/dateProduct.json";
import HoneyCard from "./honeyCard/HoneyCard";

export default function AllProduct() {
  return (
    <>
    {dataProducts.PRODUCT.map((item, index)=>{
      return <HoneyCard className="honeyCard" key={index} data={item}/>
    })}
    </>
  );
}
