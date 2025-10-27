import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiService } from "../services/api";
import { useCart } from "../context/CartContext";

const Menu = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart, cart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Convert URL parameter back to proper case (e.g., "pasta" -> "Pasta")
        const formattedCategory = categoryName
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        const response = await apiService.getAllProducts(formattedCategory);
        setProducts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const getItemQuantity = (productId) => {
    const item = cart.items.find(item => item.product_id === productId);
    return item ? item.quantity : 0;
  };

  if (loading) {
    return (
      <div className="p-4 max-w-lg mx-auto">
        <div className="text-center">Loading menu...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 max-w-lg mx-auto">
        <div className="text-center text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-lg font-semibold mb-3 capitalize">
        {categoryName.replace(/-/g, ' ')}
      </h2>
      <div className="space-y-4">
        {products.map((product) => {
          const quantity = getItemQuantity(product._id || product.id);
          return (
            <div
              key={product._id || product.id}
              className="border p-4 rounded-lg flex justify-between items-center"
            >
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4 bg-green-500 rounded-full"></span>
                <span className="text-md font-medium">{product.name}</span>
              </div>
              <div className="text-right">
                <p className="font-semibold">₹ {product.price}.00</p>
                {quantity > 0 ? (
                  <div className="mt-1 flex items-center space-x-2">
                    <button
                      onClick={() => handleAddToCart({ ...product, quantity: -1 })}
                      className="px-2 py-1 border rounded text-red-600"
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="px-2 py-1 border rounded text-red-600"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-1 px-4 py-1 border rounded text-red-600"
                  >
                    Add +
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
