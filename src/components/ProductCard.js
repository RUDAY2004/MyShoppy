import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../styles/colors';
import { useCart } from '../context/CartContext';
import CustomButton from './CustomButton';
import ProductImage from './ProductImage';
import { showAddToCartSuccess } from '../utils/cartHelpers';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

const ProductCard = ({ product, onPress, onAddToCart, cartItem }) => {
  const [wishlisted, setWishlisted] = useState(false);
  const { updateQuantity, removeFromCart } = useCart();
  const inStock = product.stock > 0;
  const quantity = cartItem?.quantity || 0;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= Math.floor(rating) ? 'star' : i - rating < 1 ? 'star-half' : 'star-outline'}
          size={12}
          color={colors.accent}
        />
      );
    }
    return stars;
  };

  const handleAdd = () => {
    onAddToCart(product);
    showAddToCartSuccess(product.title);
  };

  const handleDecrease = () => {
    if (quantity <= 1) {
      removeFromCart(product.id);
    } else {
      updateQuantity(product.id, quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < product.stock) {
      updateQuantity(product.id, quantity + 1);
    }
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.cardPress} onPress={onPress} activeOpacity={0.9}>
        <TouchableOpacity
          style={styles.heartBtn}
          onPress={() => setWishlisted(!wishlisted)}
        >
          <Ionicons
            name={wishlisted ? 'heart' : 'heart-outline'}
            size={20}
            color={wishlisted ? colors.error : colors.textMuted}
          />
        </TouchableOpacity>

        <ProductImage uri={product.image} style={styles.imageWrap} resizeMode="cover" />

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          </View>
          <Text style={styles.description} numberOfLines={1}>{product.description}</Text>
          <View style={styles.ratingRow}>
            {renderStars(product.rating)}
            <Text style={styles.ratingText}>({Math.floor(product.rating * 30)})</Text>
          </View>
          <Text style={[styles.stock, !inStock && styles.outOfStock]}>
            {inStock ? `${product.stock} in stock` : 'Out of Stock'}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.actionWrap}>
        {quantity === 0 ? (
          <CustomButton
            title="Add to Cart"
            onPress={handleAdd}
            disabled={!inStock}
            style={styles.addBtn}
            textStyle={styles.addBtnText}
          />
        ) : (
          <View style={styles.qtyContainer}>
            <TouchableOpacity style={styles.qtyButton} onPress={handleDecrease}>
              <Ionicons name="remove" size={20} color={colors.primary} />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.qtyButton}
              onPress={handleIncrease}
              disabled={quantity >= product.stock}
            >
              <Ionicons
                name="add"
                size={20}
                color={quantity >= product.stock ? colors.textMuted : colors.primary}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  cardPress: { flex: 1 },
  heartBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 6,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  imageWrap: { width: '100%', height: 130 },
  content: { padding: 12, paddingBottom: 8 },
  actionWrap: { paddingHorizontal: 12, paddingBottom: 12 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { flex: 1, fontSize: 13, fontWeight: '700', color: colors.text, marginRight: 4 },
  price: { fontSize: 14, fontWeight: '700', color: colors.primary },
  description: { fontSize: 11, color: colors.textLight, marginTop: 4 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  ratingText: { fontSize: 11, color: colors.textLight, marginLeft: 4 },
  stock: { fontSize: 11, color: colors.success, marginTop: 4 },
  outOfStock: { color: colors.error },
  addBtn: { paddingVertical: 8, borderRadius: 20 },
  addBtnText: { fontSize: 12 },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.background,
  },
  qtyButton: { padding: 4 },
  qtyText: { fontSize: 16, fontWeight: '700', color: colors.primary, minWidth: 24, textAlign: 'center' },
});

export default ProductCard;
