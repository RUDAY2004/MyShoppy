// ── IMPORTANT: Replace with your PC's IPv4 address (run: ipconfig) ──
// JSON Server must run in a SEPARATE Command Prompt:
//   cd C:\Users\ruday\Projects\MyShoppy
//   npm run server
export const API_BASE_URL = 'http://10.223.15.130:3000';

export const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&q=80';

export const TAB_BAR_HEIGHT = 65;

export const CATEGORIES = [
  { id: 'kitchen', name: 'Kitchen', color: '#A8DADC', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=300&q=80' },
  { id: 'cleaning', name: 'Cleaning', color: '#F4A261', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5eZSYJoC1dttuzjoh0Dcru4s-ZOxTGcnUXg-8M8ssoOlQf4ykaxPXrOo&s=10' },
  { id: 'home-decor', name: 'Home Decor', color: '#E76F51', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&q=80' },
  { id: 'storage', name: 'Storage', color: '#2A9D8F', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80' },
  { id: 'daily-essentials', name: 'Daily Essentials', color: '#457B9D', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&q=80' },
  { id: 'electronics', name: 'Electronics', color: '#6C63FF', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&q=80' },
  { id: 'mobile-accessories', name: 'Mobile Accessories', color: '#FF6B6B', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAKIN23Qf5dnTdvKPJdiR3kshCzOeBAHdyVPO834Xu4kh_L0oOoAK-tHZw&s=10' },
  { id: 'fashion', name: 'Fashion', color: '#C084FC', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYYga5Pest4FBxhkVhBDmpU9GlmKGLYJqLxRC0wiz37KyKp_EUT51c1ZI&s=10' },
  { id: 'mens-clothing', name: "Men's Clothing", color: '#3B82F6', image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRu1ZufORH9npvO0RDz4qJRxj_gYEzH_k80bUWg4R4XOJMDKCv1P1HGpCI7zUJ72UxSwi1d7zOYhGpff2y_IWBvs16j00VTbThJj-TlSHE' },
  { id: 'womens-clothing', name: "Women's Clothing", color: '#EC4899', image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTpqpOK3r6if1VmpcY3pwmE4CXpXutAsJ480OK-6XN5mOOXKo3w14xUkeRVYU7GKH4C7GPqcbpe-umrT2mjlnB3DzFZ6VCf3D1Hu0SAWnRgdTWPCkJ7Nm4GLCc' },
  { id: 'footwear', name: 'Footwear', color: '#F59E0B', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80' },
  { id: 'beauty', name: 'Beauty', color: '#F472B6', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&q=80' },
  { id: 'grocery', name: 'Grocery', color: '#84CC16', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&q=80' },
  { id: 'sports', name: 'Sports', color: '#10B981', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300&q=80' },
  { id: 'toys', name: 'Toys', color: '#FB923C', image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR0t9pOSqIkgB1dve25akWUZLlg-qy1treLkkukpdpF8gaeS2aZr5U5pv1tKR1IGvGk8HdNpGR0yAVowIBXRs7djfZNrfLu_zsE9AUXHI5M' },
  { id: 'books', name: 'Books', color: '#78716C', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&q=80' },
  { id: 'furniture', name: 'Furniture', color: '#92400E', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&q=80' },
  { id: 'travel', name: 'Travel', color: '#0EA5E9', image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=300&q=80' },
];

export const DELIVERY_FEE = 49;
export const GST_RATE = 0.18;
export const CART_STORAGE_KEY = '@myshoppy_cart';
export const SPLASH_DURATION = 2500;

export const PRICE_FILTERS = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $50', min: 0, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: '$100+', min: 100, max: Infinity },
];

export const AVAILABILITY_FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'In Stock', value: 'in_stock' },
  { label: 'Out of Stock', value: 'out_of_stock' },
];
