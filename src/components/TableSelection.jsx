import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../services/api";

const TableSelection = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTables = async () => {
      try {
        setLoading(true);
        const response = await apiService.getAllTables();
        setTables(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTables();
  }, []);

  const handleTableSelect = (table) => {
    // Store selected table in localStorage
    localStorage.setItem('selectedTable', JSON.stringify(table));
    // Navigate to customer info page
    navigate('/customer-info');
  };

  const handleQRScan = () => {
    navigate('/qr-scan');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tables...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Coffea & The Beanstalk Cafe</h1>
          <p className="text-gray-600">Please select your table to start ordering</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {tables.map((table) => (
            <div
              key={table._id || table.id}
              onClick={() => handleTableSelect(table)}
              className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all hover:shadow-lg ${
                table.status === 'occupied' ? 'opacity-60' : 'hover:scale-105'
              }`}
            >
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  table.status === 'available' ? 'bg-green-100 text-green-600' :
                  table.status === 'occupied' ? 'bg-red-100 text-red-600' :
                  'bg-yellow-100 text-yellow-600'
                }`}>
                  <span className="text-2xl font-bold">{table.table_number}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Table {table.table_number}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Capacity: {table.capacity} seats
                </p>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  table.status === 'available' ? 'bg-green-100 text-green-800' :
                  table.status === 'occupied' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
                </div>
                {table.current_customer_id && (
                  <p className="text-xs text-gray-500 mt-2">
                    Occupied by: {table.current_customer_id.name}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 space-y-4">
          <p className="text-gray-500 text-sm">
            Click on an available table to start your order
          </p>
          <button
            onClick={handleQRScan}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-medium"
          >
            📱 Scan QR Code Instead
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableSelection;