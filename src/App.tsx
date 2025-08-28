// import "./App.css";
// import Header from "./components/Header";
// import User from "./components/User";
// import { useState } from "react";

// function App() {
//   const [counter, setCounter] = useState(0);

//   return (
//     <>
//       <Header/>
//       <p>My app works</p>  
//       <User/>  
//       <h3>Counter value is {counter}</h3> 
//         <button className="bg-amber-300 text-black p-3 mt-4 rounded-xl mr-5" onClick={()=>setCounter(counter-1)}>Decrease Counter Value</button> 
//         <button className="bg-amber-300 text-black p-3 mt-4 rounded-xl" onClick={()=>setCounter(counter+1)}>Increase Counter Value</button> 
//     </>
      
//   );
// }

// export default App;

// src/App.tsx
import { useEffect, useState } from "react";
import type { Product } from "./types";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";

const API_URL = "https://xyzportal.thexyzstudio.com/api/products";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Fetch products
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching:", err));
  }, []);

  // Add or update
  const handleSave = async (product: Product) => {
    if (editingProduct) {
      // Update
      const res = await fetch(`${API_URL}/${editingProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const updated = await res.json();
      setProducts(products.map((p) => (p.id === updated.id ? updated : p)));
      setEditingProduct(null);
    } else {
      // Create
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const newProd = await res.json();
      setProducts([...products, newProd]);
    }
  };

  // Delete
  const handleDelete = async (id: number) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div>
      <h1>Product Manager</h1>
      <ProductForm
        onSave={handleSave}
        editingProduct={editingProduct}
        cancelEdit={() => setEditingProduct(null)}
      />
      <ProductList
        products={products}
        onEdit={(product) => setEditingProduct(product)}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
