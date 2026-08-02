import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TAB_BAR_HEIGHT } from '../utils/constants';
import colors from '../styles/colors';

const { width } = Dimensions.get('window');

const HomeScreen = () => (
  <SafeAreaView style={styles.container} edges={['top']}>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
      <Text style={styles.logo}>MyShoppy</Text>
      <View style={styles.heroContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800' }}
          style={styles.heroImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Shopping And Department Store</Text>
        <Text style={styles.description}>
          Shopping is a bit of a relaxing hobby for me, which is sometimes troubling for the bank balance.
        </Text>
      </View>
      <View style={{ height: TAB_BAR_HEIGHT + 20 }} />
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingBottom: 20 },
  logo: { fontSize: 32, fontWeight: '700', color: colors.primary, textAlign: 'center', marginVertical: 16, fontStyle: 'italic' },
  heroContainer: {
    marginHorizontal: 16,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
  },
  heroImage: { width: width - 32, height: 280, backgroundColor: colors.primaryLight },
  content: { paddingHorizontal: 20, paddingTop: 24 },
  title: { fontSize: 26, fontWeight: '800', color: colors.primaryDark, lineHeight: 34 },
  description: { fontSize: 15, color: colors.textLight, marginTop: 12, lineHeight: 22 },
});

export default HomeScreen;
