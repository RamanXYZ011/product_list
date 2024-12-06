import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiEndPoint } from "../api/Endpoint";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  console.log(id, "by using useParams");
  const [data, setData] = useState();

  useEffect(() => {
    if (id) {
      getProductList(id);
    }
  }, [id]);

  const getProductList = async (id) => {
    try {
      await axios.get(apiEndPoint.productDetail(id)).then((response) => {
        console.log(response.data);
        setData(response.data);
      });
    } catch (err) {
      console.log("Product list is not fetch", err);
    }
  };
  const imageUrl = `${process.env.REACT_APP_BASE_URL}${data?.data.attributes.product_image?.data?.[0]?.attributes?.url}`;
  return (
    <div className="container d-flex flex-column align-content-center justify-content-center">
        <h1 className="text-center">Product Details</h1>
     <div className="d-flex flex-row gap-5 align-content-center justify-content-center">
         <div>
         <img
            src={imageUrl}
            alt={data?.data.attributes.name}
            className="d-flex object-fit-cover"
            width="200px"
            height="200px"
          />

         </div>
      
         <div>
          <h5>Product-Name:{data?.data.attributes.name}</h5>
          <h5>Price:{data?.data.attributes.price}</h5>
          <h5>Description:{data?.data.attributes.description}</h5>
          </div>
        </div>
  </div>
  );
};

export default ProductDetails;
