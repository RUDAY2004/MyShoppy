import api from './api';

export const fetchProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const fetchProductsByCategory = async (category) => {
  const response = await api.get('/products', { params: { category } });
  return response.data;
};
