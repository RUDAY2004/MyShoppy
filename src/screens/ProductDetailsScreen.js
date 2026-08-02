import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import ProductImage from '../components/ProductImage';
import { fetchProductById } from '../services/productService';
import { useCart } from '../context/CartContext';
import { showAddToCartSuccess } from '../utils/cartHelpers';
import { TAB_BAR_HEIGHT } from '../utils/constants';
import colors from '../styles/colors';

const ProductDetailsScreen = ({ navigation, route }) => {
  const { productId } = route.params;
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(productId);
        setProduct(data);
      } catch (err) {
        setError(err.userMessage || 'Product not found');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product || product.stock === 0) {
      Alert.alert('Unavailable', 'This product is currently out of stock.');
      return;
    }
    addToCart(product, quantity);
    showAddToCartSuccess(product.title);
  };

  if (loading) return <Loader />;
  if (error || !product) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Product" showBack onBack={() => navigation.goBack()} />
        <EmptyState icon="alert-circle-outline" title="Error" message={error} />
      </SafeAreaView>
    );
  }

  const inStock = product.stock > 0;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Product Details" showBack onBack={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <ProductImage uri={product.image} style={styles.image} resizeMode="contain" iconSize={48} />
        <View style={styles.content}>
          <Text style={styles.title}>{product.title}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            <View style={styles.rating}>
              <Ionicons name="star" size={16} color={colors.accent} />
              <Text style={styles.ratingText}>{product.rating}</Text>
            </View>
          </View>
          <Text style={[styles.stock, !inStock && styles.outOfStock]}>
            {inStock ? `${product.stock} items in stock` : 'Out of Stock'}
          </Text>
          {inStock && product.stock <= 12 && (
            <Text style={styles.lowStock}>Only {product.stock} items left! Don't miss it.</Text>
          )}
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.sectionTitle}>Quantity</Text>
          <View style={styles.quantityRow}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              <Ionicons name="remove" size={22} color={colors.primary} />
            </TouchableOpacity>
            <Text style={styles.qty}>{quantity}</Text>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQuantity((q) => Math.min(product.stock, q + 1))}
              disabled={quantity >= product.stock}
            >
              <Ionicons name="add" size={22} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <CustomButton title="Add to Cart" onPress={handleAddToCart} disabled={!inStock} style={styles.addBtn} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingBottom: TAB_BAR_HEIGHT + 20 },
  image: { width: '100%', height: 300, backgroundColor: colors.white },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: '800', color: colors.text },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  price: { fontSize: 28, fontWeight: '700', color: colors.primary, marginRight: 16 },
  rating: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { marginLeft: 4, fontSize: 16, color: colors.textLight },
  stock: { fontSize: 14, color: colors.success, marginTop: 8 },
  outOfStock: { color: colors.error },
  lowStock: { fontSize: 13, color: colors.error, marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.text, marginTop: 20, marginBottom: 8 },
  description: { fontSize: 15, color: colors.textLight, lineHeight: 22 },
  quantityRow: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  qty: { fontSize: 20, fontWeight: '700', marginHorizontal: 24, color: colors.text },
  addBtn: { marginTop: 24 },
});

export default ProductDetailsScreen;
