import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../services/api";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        // Get all products and extract unique categories
        const response = await apiService.getAllProducts();
        const products = response.data;

        // Extract unique categories and count products in each
        const categoryMap = {};
        products.forEach(product => {
          if (!categoryMap[product.category]) {
            categoryMap[product.category] = {
              name: product.category,
              count: 0,
              icon: "fa-solid fa-utensils"
            };
          }
          categoryMap[product.category].count += 1;
        });

        const categoryList = Object.values(categoryMap);
        setCategories(categoryList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/categories/${categoryName.toLowerCase().replace(/ /g, "-")}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading categories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col items-center p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleCategoryClick(category.name)}
          >
            <i className={`${category.icon} text-4xl text-gray-700 mb-4`}></i>
            <h3 className="text-lg font-semibold text-gray-900 text-center">
              {category.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {category.count} items
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
