import React from "react";
import HompageArdCard from "../components/arc-card/hompage-ard-card";

const PRODUCT_DATA = [
  { name: "Product 1", title: "Description of Product 1" },
  { name: "Product 2", title: "Description of Product 2" },
  { name: "Product 3", title: "Description of Product 3" },
];

const ProductPage = () => {
  return (
    <div className="mt-[5.4rem]">
      <HompageArdCard data={PRODUCT_DATA} />
    </div>
  );
};

export default ProductPage;
