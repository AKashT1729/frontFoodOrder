import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../services/api";

const QRScanner = () => {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState(null);
  const [manualInput, setManualInput] = useState('');
  const navigate = useNavigate();

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    if (!manualInput.trim()) return;

    try {
      setScanning(true);
      setError(null);

      // Try to get table by QR code
      const response = await apiService.getTableByQR(manualInput.trim());

      if (response.data) {
        // Store selected table in localStorage
        localStorage.setItem('selectedTable', JSON.stringify(response.data));
        // Navigate to customer info page
        navigate('/customer-info');
      }
    } catch (err) {
      setError('Invalid QR code or table not found');
    } finally {
      setScanning(false);
    }
  };

  const handleTableSelect = (tableNumber) => {
    // For demo purposes, create a QR code based on table number
    const qrCode = `table-${tableNumber}`;
    setManualInput(qrCode);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Scan QR Code</h1>
          <p className="text-gray-600">Scan the QR code on your table or enter it manually</p>
        </div>

        {/* QR Scanner Placeholder */}
        <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 text-center">
          <div className="text-gray-500 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zM9 6a1 1 0 000 2h1.586l-2.293 2.293a1 1 0 101.414 1.414L11.414 10H10a1 1 0 100 2h4a1 1 0 001-1V6a1 1 0 00-1-1h-4z" clipRule="evenodd" />
            </svg>
            <p className="text-sm">Camera access would be required for real QR scanning</p>
          </div>
        </div>

        {/* Manual Input */}
        <form onSubmit={handleManualSubmit} className="mb-6">
          <label htmlFor="qr-input" className="block text-sm font-medium text-gray-700 mb-2">
            Or enter QR code manually:
          </label>
          <input
            type="text"
            id="qr-input"
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
            placeholder="e.g., table-1"
          />
          <button
            type="submit"
            disabled={scanning || !manualInput.trim()}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {scanning ? 'Scanning...' : 'Submit QR Code'}
          </button>
        </form>

        {/* Demo Table Selection */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-3 text-center">Demo: Click a table to simulate QR scan</p>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6].map((tableNum) => (
              <button
                key={tableNum}
                onClick={() => handleTableSelect(tableNum)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-3 rounded text-sm font-medium transition-colors"
              >
                Table {tableNum}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <button
          onClick={() => navigate('/')}
          className="w-full text-gray-600 hover:text-gray-800 text-sm"
        >
          ← Back to Table Selection
        </button>
      </div>
    </div>
  );
};

export default QRScanner;