import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../styles/colors';
import globalStyles from '../styles/globalStyles';
import CustomButton from '../components/CustomButton';
import { useCart } from '../context/CartContext';
import { placeOrder } from '../services/orderService';
import { validateCheckoutOrderForm, isFormValid } from '../utils/validation';
import { TAB_BAR_HEIGHT } from '../utils/constants';

const CheckoutScreen = ({ navigation }) => {
  const { cartItems, subtotal, gst, delivery, grandTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [errors, setErrors] = useState({});

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const handlePlaceOrder = async () => {
    const validationErrors = validateCheckoutOrderForm(form);
    setErrors(validationErrors);

    if (!isFormValid(validationErrors)) return;

    if (cartItems.length === 0) {
      Alert.alert('Cart Empty', 'Please add products to your cart.');
      return;
    }

    try {
      setLoading(true);

      const orderPayload = {
        customer: form,
        items: cartItems,
        subtotal,
        gst,
        delivery,
        grandTotal,
        totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
        orderDate: new Date().toISOString(),
        status: 'Placed',
      };

      const savedOrder = await placeOrder(orderPayload);
      await clearCart();

      navigation.replace('OrderSuccess', {
        order: { ...orderPayload, id: savedOrder.id },
      });
    } catch (error) {
      Alert.alert(
        'Order Failed',
        error.userMessage || 'Unable to place your order. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const renderField = (label, field, options = {}) => (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[globalStyles.input, errors[field] && globalStyles.inputError]}
        value={form[field]}
        onChangeText={(text) => updateField(field, text)}
        placeholderTextColor={colors.textMuted}
        {...options}
      />
      {errors[field] ? <Text style={globalStyles.errorText}>{errors[field]}</Text> : null}
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.heading}>Checkout</Text>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Shipping Information</Text>
            {renderField('Full Name', 'fullName', { placeholder: 'Enter full name' })}
            {renderField('Phone Number', 'phone', {
              placeholder: '10 digit mobile number',
              keyboardType: 'phone-pad',
              maxLength: 10,
            })}
            {renderField('Email Address', 'email', {
              placeholder: 'name@example.com',
              keyboardType: 'email-address',
              autoCapitalize: 'none',
            })}
            {renderField('Address', 'address', {
              placeholder: 'Street, area, landmark',
              multiline: true,
              numberOfLines: 3,
              style: [globalStyles.input, styles.multiline, errors.address && globalStyles.inputError],
            })}
            {renderField('City', 'city', { placeholder: 'City' })}
            {renderField('State', 'state', { placeholder: 'State' })}
            {renderField('Pincode', 'pincode', {
              placeholder: '6 digit pincode',
              keyboardType: 'number-pad',
              maxLength: 6,
            })}
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Order Summary</Text>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.productRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.productTitle}>{item.title}</Text>
                  <Text style={styles.productQty}>Qty : {item.quantity}</Text>
                </View>
                <Text style={styles.productPrice}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            ))}
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>GST (18%)</Text>
              <Text style={styles.summaryValue}>${gst.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery</Text>
              <Text style={styles.summaryValue}>${delivery.toFixed(2)}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Grand Total</Text>
              <Text style={styles.totalValue}>${grandTotal.toFixed(2)}</Text>
            </View>
          </View>

          <CustomButton
            title="Place Order"
            loading={loading}
            onPress={handlePlaceOrder}
            style={styles.placeOrderBtn}
          />
          <View style={{ height: TAB_BAR_HEIGHT + 20 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { padding: 16 },
  heading: { fontSize: 30, fontWeight: '800', color: colors.text, marginBottom: 18 },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.primary, marginBottom: 14 },
  field: { marginBottom: 4 },
  label: { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 6 },
  multiline: { height: 90, textAlignVertical: 'top' },
  productRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  productTitle: { fontSize: 15, fontWeight: '600', color: colors.text },
  productQty: { marginTop: 4, color: colors.textLight, fontSize: 13 },
  productPrice: { fontSize: 15, fontWeight: '700', color: colors.primary },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 12 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryLabel: { fontSize: 15, color: colors.textLight },
  summaryValue: { fontSize: 15, fontWeight: '600', color: colors.text },
  totalRow: { borderTopWidth: 1, borderTopColor: colors.border, marginTop: 8, paddingTop: 14 },
  totalLabel: { fontSize: 19, fontWeight: '700', color: colors.text },
  totalValue: { fontSize: 20, fontWeight: '800', color: colors.primary },
  placeOrderBtn: { marginTop: 6 },
});

export default CheckoutScreen;
