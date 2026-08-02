import AsyncStorage from '@react-native-async-storage/async-storage';
import { CART_STORAGE_KEY } from '../utils/constants';

export const saveCart = async (cartItems) => {
  try {
    await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  } catch (error) {
    console.error('Error saving cart:', error);
    throw error;
  }
};

export const getCart = async () => {
  try {
    const data = await AsyncStorage.getItem(CART_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading cart:', error);
    return [];
  }
};

export const clearCartStorage = async () => {
  try {
    await AsyncStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};
