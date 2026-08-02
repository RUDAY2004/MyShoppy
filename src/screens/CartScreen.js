import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CartItem from '../components/CartItem';
import CustomButton from '../components/CustomButton';
import Loader from '../components/Loader';
import { useCart } from '../context/CartContext';
import { confirmRemoveItem } from '../utils/cartHelpers';
import { TAB_BAR_HEIGHT } from '../utils/constants';
import colors from '../styles/colors';

const CartScreen = ({ navigation }) => {
  const {
    cartItems,
    subtotal,
    gst,
    delivery,
    grandTotal,
    isLoading,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const goToCategories = () => {
    navigation.getParent()?.navigate('Categories');
  };

  const handleRemove = (item) => {
    confirmRemoveItem(item.title, () => removeFromCart(item.id));
  };

  const handleDecrease = (id) => {
    const cartItem = cartItems.find((c) => c.id === id);
    if (!cartItem) return;
    if (cartItem.quantity <= 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, cartItem.quantity - 1);
    }
  };

  if (isLoading) return <Loader message="Loading cart..." />;

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <Text style={styles.heading}>My Cart</Text>
        <View style={styles.emptyWrap}>
          <View style={styles.emptyIconCircle}>
            <Ionicons name="cart-outline" size={56} color={colors.primaryLight} />
          </View>
          <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
          <Text style={styles.emptyMessage}>
            Looks like you haven't added anything yet. Explore our categories and find something you love!
          </Text>
          <CustomButton title="Start Shopping" onPress={goToCategories} style={styles.emptyBtn} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.heading}>My Cart ({cartItems.length})</Text>
      <FlatList
        data={cartItems}
        extraData={cartItems}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onIncrease={(id) => {
              const cartItem = cartItems.find((c) => c.id === id);
              updateQuantity(id, cartItem.quantity + 1);
            }}
            onDecrease={handleDecrease}
            onRemove={() => handleRemove(item)}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery</Text>
          <Text style={styles.summaryValue}>${delivery.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>GST (18%)</Text>
          <Text style={styles.summaryValue}>${gst.toFixed(2)}</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Grand Total</Text>
          <Text style={styles.totalValue}>${grandTotal.toFixed(2)}</Text>
        </View>
        <CustomButton
          title="Proceed To Checkout"
          onPress={() => navigation.navigate('Checkout')}
          style={styles.checkoutBtn}
        />
      </View>
      <View style={{ height: TAB_BAR_HEIGHT }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  heading: { fontSize: 28, fontWeight: '800', color: colors.text, paddingHorizontal: 16, paddingVertical: 12 },
  list: { paddingHorizontal: 16, paddingBottom: 16 },
  emptyWrap: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 },
  emptyIconCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  emptyTitle: { fontSize: 22, fontWeight: '700', color: colors.text, marginBottom: 8 },
  emptyMessage: { fontSize: 14, color: colors.textLight, textAlign: 'center', lineHeight: 22, marginBottom: 24 },
  emptyBtn: { paddingHorizontal: 40 },
  summary: {
    backgroundColor: colors.white,
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 5,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { fontSize: 14, color: colors.textLight },
  summaryValue: { fontSize: 14, color: colors.text, fontWeight: '500' },
  totalRow: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 12, marginTop: 4 },
  totalLabel: { fontSize: 18, fontWeight: '700', color: colors.text },
  totalValue: { fontSize: 18, fontWeight: '700', color: colors.primary },
  checkoutBtn: { marginTop: 16 },
});

export default CartScreen;
