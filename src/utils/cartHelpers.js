import { Alert } from 'react-native';

export const showAddToCartSuccess = (productTitle) => {
  Alert.alert('Success', 'Product added to cart successfully.');
};

export const confirmRemoveItem = (productTitle, onConfirm) => {
  Alert.alert(
    'Remove Item?',
    `Are you sure you want to remove "${productTitle}" from your cart?`,
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: onConfirm },
    ]
  );
};
