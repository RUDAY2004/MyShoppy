import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../styles/colors';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import { fetchProducts } from '../services/productService';
import { useCart } from '../context/CartContext';
import { CATEGORIES, PRICE_FILTERS, AVAILABILITY_FILTERS } from '../utils/constants';
import { TAB_BAR_HEIGHT } from '../utils/constants';

const ProductListScreen = ({ navigation, route }) => {
  const { category, title } = route.params || {};
  const { addToCart, cartItems } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category || 'All');
  const [selectedPrice, setSelectedPrice] = useState(PRICE_FILTERS[0]);
  const [selectedAvailability, setSelectedAvailability] = useState(AVAILABILITY_FILTERS[0]);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError(
        err.userMessage ||
          'Failed to load products. Make sure JSON Server is running (start-server.bat).'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      const matchesPrice =
        product.price >= selectedPrice.min && product.price <= selectedPrice.max;
      const matchesAvailability =
        selectedAvailability.value === 'all' ||
        (selectedAvailability.value === 'in_stock' && product.stock > 0) ||
        (selectedAvailability.value === 'out_of_stock' && product.stock === 0);
      return matchesSearch && matchesCategory && matchesPrice && matchesAvailability;
    });
  }, [products, searchQuery, selectedCategory, selectedPrice, selectedAvailability]);

  const isInCart = (productId) => cartItems.some((item) => item.id === productId);

  if (loading) return <Loader message="Fetching products from server..." />;

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title={title || 'Products'} showBack onBack={() => navigation.goBack()} />
        <EmptyState
          icon="cloud-offline-outline"
          title="Server Unreachable"
          message={error}
          buttonTitle="Retry"
          onButtonPress={loadProducts}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title={title || 'Products'} showBack onBack={() => navigation.goBack()} />
      <View style={styles.content}>
  <FlatList
    data={filteredProducts}
    extraData={cartItems}
    keyExtractor={(item) => String(item.id)}
    numColumns={2}
    columnWrapperStyle={styles.productRow}
    showsVerticalScrollIndicator={false}
    keyboardShouldPersistTaps="handled"
    contentContainerStyle={{ paddingBottom: TAB_BAR_HEIGHT + 20 }}
    ListHeaderComponent={
      <>
        <Text style={styles.breadcrumb} numberOfLines={1}>
          Categories / {selectedCategory === 'All' ? 'All Products' : selectedCategory}
        </Text>

        <Text style={styles.heading}>
          {title || 'Products For You!'}
        </Text>
        <Text style={styles.countLabel}>
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
        </Text>

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filters}
          contentContainerStyle={{
            paddingRight: 16,
            alignItems: 'center',
          }}
        >
          {['All', ...CATEGORIES.map((c) => c.name)].map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.chip,
                selectedCategory === cat && styles.chipActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedCategory === cat && styles.chipTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Price Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filters}
          contentContainerStyle={{
            paddingRight: 16,
            alignItems: 'center',
          }}
        >
          {PRICE_FILTERS.map((filter) => (
            <TouchableOpacity
              key={filter.label}
              style={[
                styles.chip,
                selectedPrice.label === filter.label &&
                  styles.chipActive,
              ]}
              onPress={() => setSelectedPrice(filter)}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedPrice.label === filter.label &&
                    styles.chipTextActive,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Availability Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filters}
          contentContainerStyle={{
            paddingRight: 16,
            alignItems: 'center',
          }}
        >
          {AVAILABILITY_FILTERS.map((filter) => (
            <TouchableOpacity
              key={filter.value}
              style={[
                styles.chip,
                selectedAvailability.value === filter.value &&
                  styles.chipActive,
              ]}
              onPress={() =>
                setSelectedAvailability(filter)
              }
            >
              <Text
                style={[
                  styles.chipText,
                  selectedAvailability.value === filter.value &&
                    styles.chipTextActive,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {filteredProducts.length === 0 && (
          <EmptyState
            icon="search-outline"
            title="No Products Found"
            message="Try adjusting your search or filters."
          />
        )}
      </>
    }
    renderItem={({ item }) => (
      <ProductCard
  product={item}
  onPress={() =>
    navigation.navigate('ProductDetails', {
      productId: item.id,
    })
  }
  onAddToCart={addToCart}
  cartItem={cartItems.find((c) => c.id === item.id)}
/>
    )}
  />
</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, paddingHorizontal: 16 },
  breadcrumb: { fontSize: 12, color: colors.textLight, marginBottom: 4 },
  heading: { fontSize: 24, fontWeight: '800', color: colors.text, marginBottom: 12 },
  filters: {
  marginBottom: 10,
},

chip: {
  minHeight: 40,
  paddingHorizontal: 18,
  paddingVertical: 10,
  borderRadius: 22,
  backgroundColor: colors.white,
  marginRight: 10,
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: colors.border,
},

chipText: {
  fontSize: 14,
  fontWeight: '600',
  color: colors.text,
},

chipActive: {
  backgroundColor: colors.primary,
  borderColor: colors.primary,
},

chipTextActive: {
  color: colors.white,
},
  productRow: { justifyContent: 'space-between' },
});

export default ProductListScreen;
