import React from "react";
import type { Product } from "../types";

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const ProductTable: React.FC<Props> = ({ products, onEdit, onDelete }) => {
  return (
    <table className="table table-striped table-hover text-center">
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Description</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.length > 0 ? (
          products.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.attributes.name}</td>
              <td>₹{item.attributes.price}</td>
              <td>{item.attributes.description}</td>
              <td>
                {item.attributes.product_image?.data?.[0]?.attributes?.formats?.thumbnail?.url ? (
                  <img
                    src={`https://xyzportal.thexyzstudio.com${item.attributes.product_image.data[0].attributes.formats.thumbnail.url}`}
                    alt={item.attributes.name}
                    className="img-thumbnail"
                    style={{ width: "60px", height: "60px" }}
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => onEdit(item)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDelete(item.id)}
                >
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6}>No products found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ProductTable;
