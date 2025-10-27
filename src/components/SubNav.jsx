import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import Cart from './Cart';

const SubNav = () => {
  const [tableNumber, setTableNumber] = useState(4);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getTotalItems, getTotalAmount } = useCart();

  return (
    <>
      <div >
        <nav className="bg-gray-100 shadow h-12 flex items-center justify-between px-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-white hover:bg-gray-300 px-4 py-2 rounded-lg flex items-center cursor-pointer relative"
          >
            <i className="fa-regular fa-file mr-2"></i> Bill
            {getTotalItems() > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {getTotalItems()}
              </span>
            )}
          </button>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <i className="fa-solid fa-mug-saucer"></i>
              <span>{tableNumber}</span>
            </div>
            {getTotalItems() > 0 && (
              <div className="text-sm text-gray-600">
                Total: ₹{getTotalAmount()}.00
              </div>
            )}
          </div>
        </nav>
      </div>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default SubNav;
