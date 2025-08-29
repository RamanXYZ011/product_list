import { useEffect, useState } from "react";
import type { Product } from "../types";

interface Props {
  addProduct: (product: Omit<Product["attributes"], "product_image">) => void;
  updateProduct: (id: number, product: Omit<Product["attributes"], "product_image">) => void;
  editingProduct: Product | null;
}

const ProductForm: React.FC<Props> = ({ addProduct, updateProduct, editingProduct }) => {
  const [formData, setFormData] = useState<Omit<Product["attributes"], "product_image">>({
    name: "",
    price: 0,
    description: "",
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.attributes.name,
        price: editingProduct.attributes.price,
        description: editingProduct.attributes.description,
      });
    }
  }, [editingProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
    } else {
      addProduct(formData);
    }
    setFormData({ name: "", price: 0, description: "" });
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <div className="row g-2">
        <div className="col-md-3">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            name="price"
            className="form-control"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-5">
          <input
            type="text"
            name="description"
            className="form-control"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100">
            {editingProduct ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
