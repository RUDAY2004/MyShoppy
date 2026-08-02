import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../styles/colors';
import CustomButton from './CustomButton';

const EmptyState = ({ icon = 'cube-outline', title, message, buttonTitle, onButtonPress }) => (
  <View style={styles.container}>
    <Ionicons name={icon} size={64} color={colors.textMuted} />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.message}>{message}</Text>
    {buttonTitle && onButtonPress && (
      <CustomButton title={buttonTitle} onPress={onButtonPress} style={styles.button} />
    )}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  title: { fontSize: 20, fontWeight: '700', color: colors.text, marginTop: 16, textAlign: 'center' },
  message: { fontSize: 14, color: colors.textLight, marginTop: 8, textAlign: 'center', lineHeight: 20 },
  button: { marginTop: 24, paddingHorizontal: 32 },
});

export default EmptyState;
