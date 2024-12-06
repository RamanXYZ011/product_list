import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { apiEndPoint } from "../api/Endpoint";

const ProductList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = async () => {
    try {
      await axios.get(apiEndPoint.getProductList).then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      });
    } catch (err) {
      console.log("Product list is not fetch", err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `https://xyzportal.thexyzstudio.com/api/products/${id}`
      );
      setData(data.filter((item) => item.id !== id));
      alert("Product deleted successfully!");
    } catch (err) {
      console.log("Failed to delete the product", err);
      alert("Error deleting product. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="text-center fw-bold m-3">ProductList</div>

      <div>
        <Table responsive>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => {
                const imageUrl = `${process.env.REACT_APP_BASE_URL}${item.attributes.product_image?.data?.[0]?.attributes?.url}`;
                console.log(imageUrl, "imgurl")
                return (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageUrl}
                        alt={item.attributes.name}
                        className="rounded-circle"
                        width="20px"
                        height="20px"
                      />
                    </td>
                    <td>{item.attributes.name}</td>
                    <td>{item.attributes.price}</td>
                    <td className="d-flex gap-2">
                      <Button
                        href={`/product-details/${item.id}`}
                        className="btn btn-sm "
                        variant="info"
                      >
                        Show
                      </Button>
                      <Button
                        href="/add-product"
                        className="btn btn-sm "
                        variant="warning"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => deleteProduct(item.id)}
                        className="btn btn-sm"
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ProductList;
