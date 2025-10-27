import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { apiService } from "../services/api";

const Cart = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalAmount, getTotalItems } = useCart();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone_number: '',
    email: '',
    address: ''
  });
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlaceOrder = async () => {
    if (!customerInfo.name || !customerInfo.phone_number) {
      alert('Please enter your name and phone number');
      return;
    }

    if (cart.items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    try {
      setIsPlacingOrder(true);

      // Create or get customer
      const customerResponse = await apiService.createCustomer(customerInfo);
      const customerId = customerResponse.data._id || customerResponse.data.id;

      // Prepare order data
      const orderData = {
        customer_id: customerId,
        items: cart.items.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity
        }))
      };

      // Create order
      const orderResponse = await apiService.createOrder(orderData);

      setOrderId(orderResponse.data);
      setOrderPlaced(true);
      clearCart();

    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {orderPlaced ? (
          <div className="text-center">
            <div className="text-green-600 text-4xl mb-4">✓</div>
            <h3 className="text-lg font-semibold mb-2">Order Placed Successfully!</h3>
            <p className="text-gray-600 mb-4">Order ID: {orderId}</p>
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {cart.items.length === 0 ? (
              <p className="text-center text-gray-500">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-3 mb-6">
                  {cart.items.map((item) => (
                    <div key={item.product_id} className="flex justify-between items-center border-b pb-2">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">₹{item.price} each</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                          className="w-8 h-8 rounded border flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                          className="w-8 h-8 rounded border flex items-center justify-center"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product_id)}
                          className="ml-2 text-red-600"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>₹{getTotalAmount()}.00</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <h3 className="font-semibold">Customer Information</h3>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name *"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                  <input
                    type="tel"
                    name="phone_number"
                    placeholder="Phone Number *"
                    value={customerInfo.phone_number}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email (optional)"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address (optional)"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={isPlacingOrder}
                  className="w-full bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700 disabled:opacity-50"
                >
                  {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;