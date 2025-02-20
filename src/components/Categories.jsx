import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const categories = [
  { id: 1, name: 'Beverages', icon: 'fa-solid fa-mug-saucer' },
  { id: 2, name: 'Snacks', icon: 'fa-solid fa-cookie-bite' },
  { id: 3, name: 'Desserts', icon: 'fa-solid fa-ice-cream' },
  { id: 4, name: 'Main Course', icon: 'fa-solid fa-utensils' },
  { id: 5, name: 'Fries', icon: 'fa-solid fa-french-fries' },
  { id: 6, name: 'Pizza', icon: 'fa-solid fa-pizza-slice' },
  { id: 7, name: 'Pasta', icon: 'fa-solid fa-burger-soda' },
  { id: 8, name: 'Macroni', icon: 'fa-solid fa-bowl-spoon' },
  { id: 9, name: 'Garlic Bread', icon: 'fa-solid fa-bread-slice' },
  { id: 10, name: 'Open Toast', icon: 'fa-solid fa-bread-slice' },
  { id: 11, name: 'Sandwiches', icon: 'fa-solid fa-sandwich' },
  { id: 12, name: 'Pan Fried Paneer', icon: 'fa-solid fa-bowl-spoon' },
  { id: 13, name: 'Nachos', icon: 'fa-solid fa-taco' },
  { id: 14, name: 'Maggie', icon: 'fa-solid fa-bowl-spoon' },
  { id: 15, name: 'Pav Bhaji', icon: 'fa-solid fa-bowl-spoon' },
  { id: 16, name: 'Momos', icon: 'fa-solid fa-dumpling' },
  { id: 17, name: 'Noodles and Manchurian', icon: 'fa-solid fa-bowl-spoon' },
  { id: 18, name: 'Rice Bucket', icon: 'fa-solid fa-bowl-rice' },
  { id: 19, name: 'Hunger Buckets', icon: 'fa-solid fa-bowl-rice' },
  { id: 20, name: 'Diet Food', icon: 'fa-solid fa-apple-alt' },
  { id: 21, name: 'Soups', icon: 'fa-solid fa-bowl-spoon' },
  { id: 22, name: 'Cold Coffee', icon: 'fa-solid fa-mug-saucer' },
  { id: 23, name: 'Frespresso (cold)', icon: 'fa-solid fa-mug-saucer' },
  { id: 24, name: 'Cold Serve', icon: 'fa-solid fa-ice-cream' },
  { id: 25, name: 'Mojito & Lemonade', icon: 'fa-solid fa-glass-whiskey' },
  { id: 26, name: 'Ice Tea', icon: 'fa-solid fa-glass-whiskey' },
  { id: 27, name: 'Shakes', icon: 'fa-solid fa-glass-whiskey' },
  { id: 28, name: 'Hot Coffee', icon: 'fa-solid fa-mug-hot' },
  { id: 29, name: 'Hot Chocolate', icon: 'fa-solid fa-mug-hot' },
  { id: 30, name: 'Mineral Water', icon: 'fa-solid fa-bottle-water' },
];

const Categories = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col items-center p-4 cursor-pointer hover:shadow-lg">
            <i className={`${category.icon} text-4xl text-gray-700 mb-4`}></i>
            <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;