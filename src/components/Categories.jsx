import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const icon = "fa-solid fa-utensils";
const categories = [
  { id: 1, name: "Beverages", icon: icon },
  { id: 2, name: "Snacks", icon: icon },
  { id: 3, name: "Desserts", icon: icon },
  { id: 4, name: "Main Course", icon: icon },
  { id: 5, name: "Fries", icon: icon },
  { id: 6, name: "Pizza", icon: icon },
  { id: 7, name: "Pasta", icon: icon },
  { id: 8, name: "Macroni", icon: icon },
  { id: 9, name: "Garlic Bread", icon: icon },
  { id: 10, name: "Open Toast", icon: icon },
  { id: 11, name: "Sandwiches", icon: icon },
  { id: 12, name: "Pan Fried Paneer", icon: icon },
  { id: 13, name: "Nachos", icon: icon },
  { id: 14, name: "Maggie", icon: icon },
  { id: 15, name: "Pav Bhaji", icon: icon },
  { id: 16, name: "Momos", icon: icon },
  { id: 17, name: "Noodles and Manchurian", icon: icon },
  { id: 18, name: "Rice Bucket", icon: icon },
  { id: 19, name: "Hunger Buckets", icon: icon },
  { id: 20, name: "Diet Food", icon: icon },
  { id: 21, name: "Soups", icon: icon },
  { id: 22, name: "Cold Coffee", icon: icon },
  { id: 23, name: "Frespresso (cold)", icon: icon },
  { id: 24, name: "Cold Serve", icon: icon },
  { id: 25, name: "Mojito & Lemonade", icon: icon },
  { id: 26, name: "Ice Tea", icon: icon },
  { id: 27, name: "Shakes", icon: icon },
  { id: 28, name: "Hot Coffee", icon: icon },
  { id: 29, name: "Hot Chocolate", icon: icon },
  { id: 30, name: "Mineral Water", icon: icon },
];

const Categories = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col items-center p-4 cursor-pointer hover:shadow-lg"
          >
            <i className={`${category.icon} text-4xl text-gray-700 mb-4`}></i>
            <h3 className="text-lg font-semibold text-gray-900">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
