import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_BASE = "https://xyzportal.thexyzstudio.com";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  imageId: number | null;
}

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/products?populate=*`);
      const mapped: Product[] = res.data.data.map((item: any) => {
        const attr = item.attributes;
        const imageData = attr.product_image?.data?.[0];
        return {
          id: item.id,
          name: attr.name,
          price: attr.price,
          description: attr.description,
          image: imageData ? `${API_BASE}${imageData.attributes.url}` : "",
          imageId: imageData?.id || null,
        };
      });
      setProducts(mapped);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Add/Edit Product
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !description) {
      alert("Please fill all fields!");
      return;
    }

    try {
      if (editingProduct) {
        // --- UPDATE PRODUCT ---
        const updateData: any = {
          data: {
            name,
            price: Number(price),
            description,
          },
        };

        // If new image selected → upload it separately and link it
        if (image) {
          const imgForm = new FormData();
          imgForm.append("files", image);

          const uploadRes = await axios.post(
            `${API_BASE}/api/upload`,
            imgForm,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );

          const uploadedImgId = uploadRes.data[0].id;
          updateData.data.product_image = [uploadedImgId];
        }

        await axios.put(
          `${API_BASE}/api/products/${editingProduct.id}`,
          updateData
        );
        setEditingProduct(null);
      } else {
        // --- ADD NEW PRODUCT ---
        const formData = new FormData();
        formData.append(
          "data",
          JSON.stringify({
            name,
            price: Number(price),
            description,
          })
        );

        if (image) {
          formData.append("files.product_image", image);
        }

        await axios.post(`${API_BASE}/api/products`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      // Reset form
      setName("");
      setPrice("");
      setDescription("");
      setImage(null);

      // Refresh products
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  // Handle Edit
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price.toString());
    setDescription(product.description);
    setImage(null);
  };

  // Handle Delete
  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${API_BASE}/api/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">
        {editingProduct ? "Edit Product" : "Add Product"}
      </h2>

      {/* Product Form */}
      <form onSubmit={handleSubmit} className="mb-5">
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Product Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
          {editingProduct && editingProduct.image && (
            <div className="mt-2">
              <img
                src={editingProduct.image}
                alt={editingProduct.name}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />
              <small className="d-block text-muted">
                (Upload new image to replace)
              </small>
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          {editingProduct ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Products Table */}
      <h2 className="mb-3">Products List</h2>
      <table className="table table-bordered align-middle">
        <thead className="table-light">
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Description</th>
            <th scope="col" style={{ width: "150px" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center">
                No products found
              </td>
            </tr>
          ) : (
            products.map((p) => (
              <tr key={p.id}>
                <td>
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>{p.name}</td>
                <td>₹{p.price}</td>
                <td>{p.description}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default App;
