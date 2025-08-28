// src/components/ProductForm.tsx
import { useEffect, useState } from "react";
import type { Product } from "../types";

interface ProductFormProps {
  onSave: (product: Product) => void;
  editingProduct: Product | null;
  cancelEdit: () => void;
}

function ProductForm({ onSave, editingProduct, cancelEdit }: ProductFormProps) {
  const [form, setForm] = useState<Product>({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (editingProduct) {
      setForm(editingProduct);
    }
  }, [editingProduct]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    setForm({ name: "", price: "", description: "", image: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="price" value={form.price} onChange={handleChange} placeholder="Price" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
      <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" required />
      <button type="submit">{editingProduct ? "Update" : "Add"} Product</button>
      {editingProduct && <button type="button" onClick={cancelEdit}>Cancel</button>}
    </form>
  );
}

export default ProductForm;
