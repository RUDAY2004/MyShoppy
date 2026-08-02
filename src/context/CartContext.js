import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { saveCart, getCart, clearCartStorage } from '../storage/asyncStorage';
import { DELIVERY_FEE, GST_RATE } from '../utils/constants';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      const saved = await getCart();
      setCartItems(saved);
      setIsLoading(false);
    };
    loadCart();
  }, []);

  const addToCart = useCallback(async (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      let updated;
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, product.stock);
        updated = prev.map((item) =>
          item.id === product.id ? { ...item, quantity: newQty } : item
        );
      } else {
        updated = [...prev, { ...product, quantity: Math.min(quantity, product.stock) }];
      }
      saveCart(updated);
      return updated;
    });
  }, []);

  const removeFromCart = useCallback(async (productId) => {
    setCartItems((prev) => {
      const updated = prev.filter((item) => item.id !== productId);
      saveCart(updated);
      return updated;
    });
  }, []);

  const updateQuantity = useCallback(async (productId, quantity) => {
    setCartItems((prev) => {
      if (quantity <= 0) {
        const updated = prev.filter((item) => item.id !== productId);
        saveCart(updated);
        return updated;
      }
      const updated = prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.min(quantity, item.stock) }
          : item
      );
      saveCart(updated);
      return updated;
    });
  }, []);

  const clearCart = useCallback(async () => {
    setCartItems([]);
    await clearCartStorage();
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gst = subtotal * GST_RATE;
  const delivery = cartItems.length > 0 ? DELIVERY_FEE : 0;
  const grandTotal = subtotal + gst + delivery;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        subtotal,
        gst,
        delivery,
        grandTotal,
        isLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
