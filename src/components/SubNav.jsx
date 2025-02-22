import React, { useState } from 'react';

const SubNav = () => {
  const [tableNumber, setTableNumber] = useState(4);
  const [bill, setBill] = useState([]);

  return (
    <div >
      <nav className="bg-gray-100  shadow h-12 flex items-center  space-x-4 px-4">
        <button className="bg-white hover:bg-gray-300 px-4 py-2 rounded-lg flex items-center cursor-pointer">
          <i className="fa-regular fa-file mr-2"></i> Bill
        </button>
        <div className="flex items-center space-x-1">
        <i className="fa-solid fa-mug-saucer"></i>
          <span>{tableNumber}</span>
        </div>
      </nav>
    </div>
  );
};

export default SubNav;
