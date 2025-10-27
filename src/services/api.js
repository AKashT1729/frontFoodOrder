const API_BASE_URL = 'http://localhost:8000/api/v1';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Customer APIs
  async createCustomer(customerData) {
    return this.request('/customers', {
      method: 'POST',
      body: JSON.stringify(customerData),
    });
  }

  async getCustomer(customerId) {
    return this.request(`/customers/${customerId}`);
  }

  async updateCustomer(customerId, updates) {
    return this.request(`/customers/${customerId}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  // Product APIs
  async getAllProducts(category = null) {
    const query = category ? `?category=${category}` : '';
    return this.request(`/products${query}`);
  }

  async getProduct(productId) {
    return this.request(`/products/${productId}`);
  }

  async createProduct(productData) {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(productId, updates) {
    return this.request(`/products/${productId}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  async deleteProduct(productId) {
    return this.request(`/products/${productId}`, {
      method: 'DELETE',
    });
  }

  // Order APIs
  async createOrder(orderData) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getOrder(orderId) {
    return this.request(`/orders/${orderId}`);
  }

  async updateOrderStatus(orderId, status) {
    return this.request(`/orders/${orderId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // Table APIs
  async getAllTables() {
    return this.request('/tables');
  }

  async getTable(tableId) {
    return this.request(`/tables/${tableId}`);
  }

  async getTableByQR(qrCode) {
    return this.request(`/tables/qr/${qrCode}`);
  }

  async createTable(tableData) {
    return this.request('/tables', {
      method: 'POST',
      body: JSON.stringify(tableData),
    });
  }

  async updateTableStatus(tableId, updates) {
    return this.request(`/tables/${tableId}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  async deleteTable(tableId) {
    return this.request(`/tables/${tableId}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();