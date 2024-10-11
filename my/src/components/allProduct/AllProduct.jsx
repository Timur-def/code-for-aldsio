import dataProducts from "./dateProduct.json";
import HoneyCard from "./honeyCard/HoneyCard";

export default function AllProduct() {
  return (
    <>
      <HoneyCard data={dataProducts[0]} />
      <HoneyCard data={dataProducts[1]} />
      <HoneyCard data={dataProducts[2]} />
    </>
  );
}
