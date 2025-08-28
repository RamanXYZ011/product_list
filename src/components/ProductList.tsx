import React, { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
};

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://xyzportal.thexyzstudio.com/api/products?populate=product_image")
      .then((res) => res.json())
      .then((data) => {
        const mappedProducts: Product[] = data.data.map((item: any) => {
          const attributes = item.attributes;

          // pick thumbnail if available, else fallback to main url
          const image =
            attributes.product_image?.data?.[0]?.attributes?.formats?.thumbnail?.url
              ? `https://xyzportal.thexyzstudio.com${attributes.product_image.data[0].attributes.formats.thumbnail.url}`
              : attributes.product_image?.data?.[0]?.attributes?.url
              ? `https://xyzportal.thexyzstudio.com${attributes.product_image.data[0].attributes.url}`
              : "https://via.placeholder.com/100";

          return {
            id: item.id,
            name: attributes.name,
            price: attributes.price,
            description: attributes.description,
            imageUrl: image,
          };
        });

        setProducts(mappedProducts);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="overflow-x-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Product List</h2>
      <table className="min-w-full border border-gray-200 shadow rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2 border">Image</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Price (₹)</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 border font-medium">{product.name}</td>
                <td className="px-4 py-2 border text-gray-600">
                  {product.description}
                </td>
                <td className="px-4 py-2 border text-green-600 font-bold">
                  ₹{product.price}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-4 text-gray-500 border">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
