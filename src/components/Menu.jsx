import React from "react";

const Menu = () => {
  const menuItems = [
    { name: "Red Serve Pasta", price: 259 },
    { name: "Creamy White Serve Pasta", price: 269 },
    { name: "Pink Serve Pasta", price: 269 },
  ];

  return (
    <div className="p-4 max-w-lg mx-auto">  
      <h2 className="text-lg font-semibold mb-3">Pasta</h2>
      <div className="space-y-4">
        {menuItems.map((item, index) => (
          <div key={index} className="border p-4 rounded-lg flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="w-4 h-4 bg-green-500 rounded-full"></span>
              <span className="text-md font-medium">{item.name}</span>
            </div>
            <div className="text-right">
              <p className="font-semibold">₹ {item.price}.00</p>
              <button className="mt-1 px-4 py-1 border rounded text-red-600">Add +</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
