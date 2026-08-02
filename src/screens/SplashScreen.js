import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPLASH_DURATION } from '../utils/constants';
import colors from '../styles/colors';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => navigation.replace('MainTabs'), SPLASH_DURATION);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Ionicons name="bag-handle" size={72} color={colors.white} />
      <Text style={styles.logo}>MyShoppy</Text>
      <Text style={styles.tagline}>Household Products, Delivered</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
  logo: { fontSize: 42, fontWeight: '700', color: colors.white, marginTop: 16, fontStyle: 'italic' },
  tagline: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 8 },
});

export default SplashScreen;
