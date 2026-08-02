import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductImage from './ProductImage';
import colors from '../styles/colors';

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => (
  <View style={styles.container}>
    <ProductImage uri={item.image} style={styles.image} resizeMode="cover" />
    <View style={styles.details}>
      <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      <View style={styles.actions}>
        <View style={styles.quantityControl}>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => onDecrease(item.id)}>
            <Ionicons name="remove" size={18} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.qty}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => onIncrease(item.id)}
            disabled={item.quantity >= item.stock}
          >
            <Ionicons
              name="add"
              size={18}
              color={item.quantity >= item.stock ? colors.textMuted : colors.primary}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.removeBtn} onPress={onRemove}>
          <Ionicons name="trash-outline" size={22} color={colors.error} />
        </TouchableOpacity>
      </View>
      <Text style={styles.subtotal}>Subtotal: ${(item.price * item.quantity).toFixed(2)}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  image: { width: 88, height: 88, borderRadius: 12 },
  details: { flex: 1, marginLeft: 12 },
  title: { fontSize: 14, fontWeight: '600', color: colors.text },
  price: { fontSize: 15, fontWeight: '700', color: colors.primary, marginTop: 4 },
  actions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  qtyBtn: { padding: 6 },
  qty: { fontSize: 16, fontWeight: '700', marginHorizontal: 14, color: colors.text },
  removeBtn: { padding: 6 },
  subtotal: { fontSize: 12, color: colors.textLight, marginTop: 8, fontWeight: '500' },
});

export default CartItem;
