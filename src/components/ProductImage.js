import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PLACEHOLDER_IMAGE } from '../utils/constants';
import colors from '../styles/colors';

const ProductImage = ({ uri, style, resizeMode = 'cover', iconSize = 36 }) => {
  const [hasError, setHasError] = useState(false);
  const imageUri = uri && !hasError ? uri : PLACEHOLDER_IMAGE;
  const showIcon = hasError || !uri;

  return (
    <View style={[styles.wrap, style]}>
      <Image
        source={{ uri: imageUri }}
        style={StyleSheet.absoluteFillObject}
        resizeMode={resizeMode}
        onError={() => setHasError(true)}
      />
      {showIcon && (
        <View style={styles.iconOverlay}>
          <Ionicons name="image-outline" size={iconSize} color={colors.textMuted} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    overflow: 'hidden',
    backgroundColor: colors.background,
  },
  iconOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(248,249,250,0.85)',
  },
});

export default ProductImage;
