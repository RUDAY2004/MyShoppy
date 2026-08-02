import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import colors from '../styles/colors';
import CustomButton from '../components/CustomButton';
import { TAB_BAR_HEIGHT } from '../utils/constants';

const OrderSuccessScreen = ({ navigation, route }) => {
  const { order } = route.params || {};

  const totalItems =
    order?.items?.reduce(
      (sum, item) => sum + item.quantity,
      0
    ) || 0;

  return (
    <SafeAreaView
      style={styles.container}
      edges={['top']}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.iconContainer}>
          <Ionicons
            name="checkmark-circle"
            size={110}
            color={colors.success}
          />
        </View>

        <Text style={styles.title}>
          Order Placed Successfully!
        </Text>

        <Text style={styles.subtitle}>
          Thank you for shopping with MyShoppy.
          Your order has been placed successfully.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Order Details
          </Text>

          <View style={styles.row}>
            <Text style={styles.label}>
              Customer
            </Text>

            <Text style={styles.value}>
              {order?.customer?.fullName}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              Phone
            </Text>

            <Text style={styles.value}>
              {order?.customer?.phone}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              Total Items
            </Text>

            <Text style={styles.value}>
              {totalItems}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              Order Status
            </Text>

            <Text
              style={[
                styles.value,
                {
                  color: colors.success,
                  fontWeight: '700',
                },
              ]}
            >
              {order?.status}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              Grand Total
            </Text>

            <Text style={styles.total}>
              $
              {order?.grandTotal?.toFixed(2)}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              Ordered On
            </Text>

            <Text style={styles.value}>
              {new Date(
                order?.orderDate
              ).toLocaleString()}
            </Text>
          </View>
        </View>

        <CustomButton
          title="Continue Shopping"
          onPress={() => {
            navigation.navigate('CartMain');
            navigation.getParent()?.navigate('Home');
          }}
          style={styles.button}
        />
        <View style={{ height: TAB_BAR_HEIGHT }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },

  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
  },

  subtitle: {
    marginTop: 12,
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 20,
    marginBottom: 30,

    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
        shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 18,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  label: {
    fontSize: 15,
    color: colors.textLight,
    flex: 1,
  },

  value: {
    flex: 1,
    textAlign: 'right',
    fontSize: 15,
    color: colors.text,
    fontWeight: '500',
  },

  total: {
    flex: 1,
    textAlign: 'right',
    fontSize: 22,
    color: colors.primary,
    fontWeight: '800',
  },

  button: {
    marginTop: 10,
  },
});

export default OrderSuccessScreen;