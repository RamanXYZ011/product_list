import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";

const ProductList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = async () => {
    try {
      await axios
        .get("https://xyzportal.thexyzstudio.com/api/products")
        .then((response) => {
          console.log(response.data.data)
          setData(response.data.data);

        });
    } catch (err) {
      console.log("Product list is not fetch", err);
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
              <th>Product Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.attributes.name}</td>
                  <td>{item.attributes.price}</td>
                  <td className="d-flex gap-2">
                    <Button
                      href="/product-detail"
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
                      onClick={() => alert("Delete Me")}
                      className="btn btn-sm"
                      variant="danger"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ProductList;
