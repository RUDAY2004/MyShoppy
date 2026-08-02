import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Dimensions } from 'react-native';
import ProductImage from './ProductImage';
import colors from '../styles/colors';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

const CategoryCard = ({ category, onPress }) => (
  <TouchableOpacity
    style={[styles.card, { backgroundColor: category.color || colors.primaryLight }]}
    onPress={onPress}
    activeOpacity={0.85}
  >
    <Text style={styles.name}>{category.name}</Text>
    <View style={styles.imageWrap}>
      <ProductImage uri={category.image} style={styles.image} resizeMode="cover" iconSize={28} />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 0.9,
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  name: { fontSize: 15, fontWeight: '700', color: colors.white, marginBottom: 8 },
  imageWrap: { flex: 1, borderRadius: 10, overflow: 'hidden' },
  image: { flex: 1, borderRadius: 10 },
});

export default CategoryCard;
