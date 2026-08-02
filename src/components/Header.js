import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../styles/colors';

const Header = ({ title, showBack = false, onBack }) => (
  <View style={styles.container}>
    {showBack ? (
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </TouchableOpacity>
    ) : (
      <View style={styles.placeholder} />
    )}
    <Text style={styles.title} numberOfLines={1}>{title}</Text>
    <View style={styles.placeholder} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
  },
  backBtn: { padding: 4 },
  title: { flex: 1, fontSize: 18, fontWeight: '700', color: colors.text, textAlign: 'center', marginHorizontal: 8 },
  placeholder: { width: 32 },
});

export default Header;
