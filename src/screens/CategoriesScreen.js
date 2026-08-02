import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryCard from '../components/CategoryCard';
import { CATEGORIES, TAB_BAR_HEIGHT } from '../utils/constants';
import colors from '../styles/colors';

const CategoriesScreen = ({ navigation }) => {
  const handleCategoryPress = (category) => {
    navigation.navigate('ProductList', {
      category: category.name,
      title: `${category.name} For You!`,
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.logo}>MyShoppy</Text>
      <Text style={styles.heading}>Categories</Text>
      <Text style={styles.subheading}>{CATEGORIES.length} categories to explore</Text>
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CategoryCard category={item} onPress={() => handleCategoryPress(item)} />
        )}
        ListFooterComponent={<View style={{ height: TAB_BAR_HEIGHT + 20 }} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 16 },
  logo: { fontSize: 22, fontWeight: '700', color: colors.primary, fontStyle: 'italic', marginTop: 8 },
  heading: { fontSize: 28, fontWeight: '800', color: colors.text, marginTop: 16, marginBottom: 4 },
  subheading: { fontSize: 14, color: colors.textLight, marginBottom: 12 },
  row: { justifyContent: 'space-between' },
  list: { paddingBottom: 20 },
});

export default CategoriesScreen;
