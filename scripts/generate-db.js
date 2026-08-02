// Run once: node scripts/generate-db.js
// Regenerates db.json with 144 products across 18 categories

const fs = require('fs');
const path = require('path');

const CATALOG = {
  Kitchen: [
    { title: 'Stainless Steel Cookware Set', description: '10-piece premium cookware set with non-stick coating.', price: 89.99, rating: 4.5, stock: 25, image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&q=80' },
    { title: 'Non-Stick Frying Pan 28cm', description: 'Even heat distribution with heat-resistant handle.', price: 34.99, rating: 4.3, stock: 40, image: 'https://images.unsplash.com/photo-1585664620512-40dd5b27d57a?w=400&q=80' },
    { title: 'Electric Kettle 1.7L', description: 'Fast-boil kettle with auto shut-off protection.', price: 29.99, rating: 4.6, stock: 18, image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d2c08e?w=400&q=80' },
    { title: 'Knife Block Set 6-Piece', description: 'Stainless steel knives with wooden block storage.', price: 49.99, rating: 4.4, stock: 15, image: 'https://images.unsplash.com/photo-1593618998850-f32a94af8f1d?w=400&q=80' },
    { title: 'Glass Food Storage Set', description: '8 BPA-free glass containers with airtight lids.', price: 39.99, rating: 4.7, stock: 30, image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&q=80' },
    { title: 'Blender Mixer Pro', description: '1200W blender for smoothies, soups, and sauces.', price: 59.99, rating: 4.5, stock: 22, image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56e?w=400&q=80' },
    { title: 'Cast Iron Dutch Oven', description: '5-quart enameled Dutch oven for slow cooking.', price: 74.99, rating: 4.8, stock: 12, image: 'https://images.unsplash.com/photo-1584990347449-7f47b2e8a1c1?w=400&q=80' },
    { title: 'Silicone Baking Mat Set', description: 'Non-stick reusable baking mats, set of 3.', price: 14.99, rating: 4.2, stock: 55, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80' },
  ],
  Cleaning: [
    { title: 'Multi-Surface Cleaner Spray', description: 'Plant-based cleaner safe for all surfaces.', price: 8.99, rating: 4.2, stock: 60, image: 'https://images.unsplash.com/photo-1563453392217-326e2bb371ea?w=400&q=80' },
    { title: 'Microfiber Mop Set', description: '360° rotating mop with reusable microfiber pads.', price: 24.99, rating: 4.5, stock: 22, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80' },
    { title: 'Laundry Detergent Pods 60ct', description: 'Concentrated pods for all fabric types.', price: 14.99, rating: 4.1, stock: 45, image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0a67?w=400&q=80' },
    { title: 'Compact Vacuum Cleaner', description: 'Lightweight bagless vacuum with HEPA filter.', price: 79.99, rating: 4.6, stock: 12, image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&q=80' },
    { title: 'Dishwashing Liquid 1L', description: 'Grease-cutting lemon formula, gentle on hands.', price: 5.99, rating: 4.0, stock: 80, image: 'https://images.unsplash.com/photo-1583947215250-46b65928057c?w=400&q=80' },
    { title: 'Scrub Brush Set', description: '5-piece brush set for kitchen and bathroom.', price: 11.99, rating: 4.3, stock: 35, image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400&q=80' },
    { title: 'Floor Cleaner Robot', description: 'Smart robot mop for hard floors.', price: 199.99, rating: 4.4, stock: 8, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
    { title: 'Glass Cleaner 750ml', description: 'Streak-free formula for windows and mirrors.', price: 6.49, rating: 4.1, stock: 50, image: 'https://images.unsplash.com/photo-1583947215250-46b65928057c?w=400&q=80' },
  ],
  'Home Decor': [
    { title: 'Decorative Wall Clock', description: 'Minimalist wooden wall clock for any room.', price: 27.99, rating: 4.3, stock: 20, image: 'https://images.unsplash.com/photo-1563861826100-9cb5777673ab?w=400&q=80' },
    { title: 'Ceramic Vase Set of 3', description: 'Hand-glazed vases in neutral tones.', price: 32.99, rating: 4.5, stock: 16, image: 'https://images.unsplash.com/photo-1578507065871-b4e3d4f4d9c8?w=400&q=80' },
    { title: 'LED Table Lamp', description: 'Adjustable warm-white lamp with touch dimmer.', price: 44.99, rating: 4.4, stock: 14, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80' },
    { title: 'Throw Pillow Covers 4-Pack', description: 'Soft velvet covers in earthy colors.', price: 19.99, rating: 4.2, stock: 35, image: 'https://images.unsplash.com/photo-1584100936595-c065b55f2a44?w=400&q=80' },
    { title: 'Artificial Monstera Plant', description: 'Realistic faux plant in ceramic pot.', price: 24.99, rating: 4.6, stock: 28, image: 'https://images.unsplash.com/photo-1485955900006-10f4d024d419?w=400&q=80' },
    { title: 'Scented Candle Set', description: 'Soy wax candles in lavender and vanilla.', price: 18.99, rating: 4.5, stock: 42, image: 'https://images.unsplash.com/photo-1602607890837-5a458fb14889?w=400&q=80' },
    { title: 'Macrame Wall Hanging', description: 'Handwoven boho wall decor piece.', price: 29.99, rating: 4.3, stock: 18, image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&q=80' },
    { title: 'Mirror Round 24 inch', description: 'Gold-framed round mirror for entryway.', price: 54.99, rating: 4.4, stock: 10, image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&q=80' },
  ],
  Storage: [
    { title: 'Stackable Storage Bins 6-Pack', description: 'Clear plastic bins with lids.', price: 36.99, rating: 4.5, stock: 24, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
    { title: 'Under-Bed Storage Box', description: 'Large fabric box with zip and handles.', price: 22.99, rating: 4.3, stock: 19, image: 'https://images.unsplash.com/photo-1595428774223-ef5262415084?w=400&q=80' },
    { title: 'Shoe Rack 5-Tier', description: 'Metal rack holding up to 20 pairs.', price: 41.99, rating: 4.4, stock: 11, image: 'https://images.unsplash.com/photo-1595428774223-ef5262415084?w=400&q=80' },
    { title: 'Velvet Hangers 10-Pack', description: 'Non-slip hangers for wardrobe organization.', price: 15.99, rating: 4.1, stock: 50, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
    { title: 'Drawer Organizer Set', description: 'Modular dividers for desk and kitchen drawers.', price: 17.99, rating: 4.4, stock: 38, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80' },
    { title: 'Vacuum Storage Bags', description: 'Space-saving bags for clothes and bedding.', price: 19.99, rating: 4.2, stock: 33, image: 'https://images.unsplash.com/photo-1595428774223-ef5262415084?w=400&q=80' },
    { title: 'Over-Door Organizer', description: '12-pocket hanging organizer for shoes.', price: 21.99, rating: 4.3, stock: 27, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
    { title: 'Pantry Can Rack', description: 'Tiered can organizer for kitchen cabinets.', price: 26.99, rating: 4.5, stock: 20, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80' },
  ],
  'Daily Essentials': [
    { title: 'Bamboo Bath Towel Set', description: 'Set of 4 ultra-soft bamboo towels.', price: 34.99, rating: 4.6, stock: 32, image: 'https://images.unsplash.com/photo-1616627548426-3695a1e3a7a1?w=400&q=80' },
    { title: 'Organic Hand Soap 500ml', description: 'Moisturizing soap with aloe vera.', price: 7.99, rating: 4.3, stock: 70, image: 'https://images.unsplash.com/photo-1600857062241-7e2a18a3ab1a?w=400&q=80' },
    { title: 'Toothbrush Holder Set', description: 'Ceramic toothbrush and soap dispenser.', price: 12.99, rating: 4.0, stock: 38, image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&q=80' },
    { title: 'Reusable Shopping Bags 5-Pack', description: 'Foldable eco-friendly grocery bags.', price: 11.99, rating: 4.5, stock: 55, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80' },
    { title: 'Water Filter Pitcher 2.5L', description: 'BPA-free pitcher with carbon filter.', price: 26.99, rating: 4.4, stock: 24, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80' },
    { title: 'Cotton Swabs 500 Count', description: 'Double-tipped cotton swabs pack.', price: 4.99, rating: 4.1, stock: 90, image: 'https://images.unsplash.com/photo-1600857062241-7e2a18a3ab1a?w=400&q=80' },
    { title: 'Facial Tissue Box 6-Pack', description: 'Soft 2-ply tissues for everyday use.', price: 9.99, rating: 4.2, stock: 65, image: 'https://images.unsplash.com/photo-1600857062241-7e2a18a3ab1a?w=400&q=80' },
    { title: 'Shower Curtain Set', description: 'Waterproof curtain with 12 hooks included.', price: 16.99, rating: 4.3, stock: 40, image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&q=80' },
  ],
  Electronics: [
    { title: 'Wireless Bluetooth Headphones', description: 'Over-ear headphones with 30hr battery.', price: 79.99, rating: 4.5, stock: 30, image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX679_.jpg' },
    { title: 'Smart LED TV 43 inch', description: '4K UHD smart TV with streaming apps.', price: 349.99, rating: 4.6, stock: 8, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&q=80' },
    { title: 'Portable Bluetooth Speaker', description: 'Waterproof speaker with 12hr playtime.', price: 49.99, rating: 4.4, stock: 25, image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX679_.jpg' },
    { title: 'Wireless Mouse', description: 'Ergonomic mouse with silent clicks.', price: 24.99, rating: 4.3, stock: 45, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80' },
    { title: 'USB-C Hub 7-in-1', description: 'Multi-port adapter for laptops.', price: 34.99, rating: 4.2, stock: 35, image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&q=80' },
    { title: 'Smart Watch Fitness Tracker', description: 'Heart rate, GPS, and sleep tracking.', price: 129.99, rating: 4.5, stock: 18, image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX679_.jpg' },
    { title: 'Mechanical Keyboard RGB', description: 'Tactile switches with customizable lighting.', price: 89.99, rating: 4.7, stock: 15, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80' },
    { title: 'Webcam HD 1080p', description: 'Auto-focus webcam with built-in mic.', price: 59.99, rating: 4.3, stock: 22, image: 'https://images.unsplash.com/photo-1587825140708-d991ce4d40e7?w=400&q=80' },
  ],
  'Mobile Accessories': [
    { title: 'Fast Charger 25W USB-C', description: 'Quick charge adapter for smartphones.', price: 19.99, rating: 4.4, stock: 50, image: 'https://images.unsplash.com/photo-1591290619762-d2d0975a473d?w=400&q=80' },
    { title: 'Phone Case Clear TPU', description: 'Shockproof transparent case.', price: 12.99, rating: 4.2, stock: 60, image: 'https://images.unsplash.com/photo-1601784551445-20c9e07cdbdb?w=400&q=80' },
    { title: 'Wireless Earbuds Pro', description: 'Active noise cancellation, 24hr battery.', price: 69.99, rating: 4.6, stock: 28, image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX679_.jpg' },
    { title: 'Car Phone Mount', description: 'Dashboard magnetic phone holder.', price: 14.99, rating: 4.3, stock: 40, image: 'https://images.unsplash.com/photo-1601784551445-20c9e07cdbdb?w=400&q=80' },
    { title: 'Power Bank 20000mAh', description: 'Dual USB fast charging power bank.', price: 29.99, rating: 4.5, stock: 35, image: 'https://images.unsplash.com/photo-1591290619762-d2d0975a473d?w=400&q=80' },
    { title: 'Tempered Glass Screen Protector', description: '9H hardness, bubble-free install.', price: 9.99, rating: 4.1, stock: 75, image: 'https://images.unsplash.com/photo-1601784551445-20c9e07cdbdb?w=400&q=80' },
    { title: 'Phone Ring Holder', description: '360° rotation kickstand ring grip.', price: 7.99, rating: 4.0, stock: 80, image: 'https://images.unsplash.com/photo-1601784551445-20c9e07cdbdb?w=400&q=80' },
    { title: 'Braided USB-C Cable 2m', description: 'Durable nylon braided charging cable.', price: 11.99, rating: 4.4, stock: 55, image: 'https://images.unsplash.com/photo-1591290619762-d2d0975a473d?w=400&q=80' },
  ],
  Fashion: [
    { title: 'Classic Denim Jacket', description: 'Medium wash denim jacket, unisex fit.', price: 59.99, rating: 4.5, stock: 20, image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93b0?w=400&q=80' },
    { title: 'Leather Belt Brown', description: 'Genuine leather belt with brass buckle.', price: 24.99, rating: 4.3, stock: 35, image: 'https://images.unsplash.com/photo-1624222247344-550fb60583fd?w=400&q=80' },
    { title: 'Aviator Sunglasses', description: 'UV400 polarized metal frame sunglasses.', price: 34.99, rating: 4.4, stock: 28, image: 'https://images.unsplash.com/photo-1572635196233-39b4b3872a0a?w=400&q=80' },
    { title: 'Canvas Tote Bag', description: 'Large eco-friendly shoulder tote bag.', price: 19.99, rating: 4.2, stock: 42, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&q=80' },
    { title: 'Wool Scarf Winter', description: 'Soft merino wool scarf in plaid pattern.', price: 29.99, rating: 4.5, stock: 25, image: 'https://images.unsplash.com/photo-1520903920243-00a87289d937?w=400&q=80' },
    { title: 'Baseball Cap Cotton', description: 'Adjustable cotton cap with embroidered logo.', price: 14.99, rating: 4.1, stock: 50, image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&q=80' },
    { title: 'Crossbody Leather Bag', description: 'Compact genuine leather crossbody purse.', price: 44.99, rating: 4.6, stock: 18, image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&q=80' },
    { title: 'Silk Tie Collection', description: 'Set of 3 premium silk neckties.', price: 39.99, rating: 4.3, stock: 22, image: 'https://images.unsplash.com/photo-1624222247344-550fb60583fd?w=400&q=80' },
  ],
  "Men's Clothing": [
    { title: 'Cotton Polo Shirt', description: 'Classic fit polo in navy blue.', price: 29.99, rating: 4.4, stock: 30, image: 'https://images.unsplash.com/photo-1622445275463-afa12ab7d343?w=400&q=80' },
    { title: 'Slim Fit Chinos', description: 'Stretch cotton chinos in khaki.', price: 44.99, rating: 4.3, stock: 25, image: 'https://images.unsplash.com/photo-1473966968600-fa801b279a1a?w=400&q=80' },
    { title: 'Formal Dress Shirt', description: 'Wrinkle-free white dress shirt.', price: 39.99, rating: 4.5, stock: 28, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80' },
    { title: 'Hooded Sweatshirt', description: 'Fleece-lined pullover hoodie.', price: 49.99, rating: 4.6, stock: 22, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80' },
    { title: 'Cargo Shorts', description: 'Multi-pocket cotton cargo shorts.', price: 34.99, rating: 4.2, stock: 32, image: 'https://images.unsplash.com/photo-1473966968600-fa801b279a1a?w=400&q=80' },
    { title: 'Wool Blazer Navy', description: 'Single-breasted wool blend blazer.', price: 89.99, rating: 4.5, stock: 12, image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80' },
    { title: 'Graphic T-Shirt Pack', description: 'Pack of 3 cotton crew neck tees.', price: 24.99, rating: 4.1, stock: 40, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80' },
    { title: 'Thermal Underwear Set', description: 'Moisture-wicking base layer set.', price: 27.99, rating: 4.3, stock: 35, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80' },
  ],
  "Women's Clothing": [
    { title: 'Floral Maxi Dress', description: 'Flowy summer dress with floral print.', price: 54.99, rating: 4.6, stock: 20, image: 'https://images.unsplash.com/photo-1595777457583-95e05989d29?w=400&q=80' },
    { title: 'High-Waist Jeans', description: 'Stretch denim skinny jeans.', price: 49.99, rating: 4.5, stock: 25, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&q=80' },
    { title: 'Blouse Silk Blend', description: 'Elegant office wear blouse.', price: 39.99, rating: 4.4, stock: 28, image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&q=80' },
    { title: 'Cardigan Knit Sweater', description: 'Open-front soft knit cardigan.', price: 44.99, rating: 4.5, stock: 22, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80' },
    { title: 'Leggings Yoga 2-Pack', description: 'High-waist stretch yoga leggings.', price: 29.99, rating: 4.3, stock: 35, image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&q=80' },
    { title: 'Evening Cocktail Dress', description: 'Elegant black cocktail dress.', price: 79.99, rating: 4.7, stock: 10, image: 'https://images.unsplash.com/photo-1595777457583-95e05989d29?w=400&q=80' },
    { title: 'Linen Summer Top', description: 'Breathable linen button-up top.', price: 34.99, rating: 4.2, stock: 30, image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&q=80' },
    { title: 'Pleated Midi Skirt', description: 'A-line pleated skirt in pastel pink.', price: 36.99, rating: 4.4, stock: 24, image: 'https://images.unsplash.com/photo-1595777457583-95e05989d29?w=400&q=80' },
  ],
  Footwear: [
    { title: 'Running Shoes Men', description: 'Lightweight mesh running sneakers.', price: 69.99, rating: 4.5, stock: 25, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
    { title: 'Leather Formal Shoes', description: 'Oxford dress shoes in black leather.', price: 89.99, rating: 4.6, stock: 15, image: 'https://images.unsplash.com/photo-1614252239476-1f0eaa4e5627?w=400&q=80' },
    { title: 'Women Heels Stiletto', description: 'Classic black stiletto heels.', price: 59.99, rating: 4.4, stock: 18, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd1?w=400&q=80' },
    { title: 'Canvas Sneakers Unisex', description: 'Classic white low-top canvas shoes.', price: 39.99, rating: 4.3, stock: 35, image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8d857?w=400&q=80' },
    { title: 'Hiking Boots Waterproof', description: 'Ankle-high waterproof hiking boots.', price: 99.99, rating: 4.7, stock: 12, image: 'https://images.unsplash.com/photo-1608256246200-53bd35f2f423?w=400&q=80' },
    { title: 'Flip Flops Beach', description: 'Comfortable rubber beach sandals.', price: 14.99, rating: 4.1, stock: 50, image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&q=80' },
    { title: 'Slip-On Loafers', description: 'Casual suede slip-on loafers.', price: 54.99, rating: 4.4, stock: 20, image: 'https://images.unsplash.com/photo-1614252239476-1f0eaa4e5627?w=400&q=80' },
    { title: 'Sports Sandals', description: 'Adjustable strap outdoor sandals.', price: 34.99, rating: 4.2, stock: 28, image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&q=80' },
  ],
  Beauty: [
    { title: 'Moisturizing Face Cream', description: 'Hydrating day cream with SPF 30.', price: 24.99, rating: 4.5, stock: 30, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80' },
    { title: 'Matte Lipstick Set', description: 'Set of 6 long-lasting matte lipsticks.', price: 19.99, rating: 4.4, stock: 35, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80' },
    { title: 'Hair Dryer Professional', description: 'Ionic hair dryer with diffuser.', price: 49.99, rating: 4.3, stock: 18, image: 'https://images.unsplash.com/photo-1522338242992-e5849c8a8a8a?w=400&q=80' },
    { title: 'Perfume Eau de Parfum', description: 'Floral fragrance 50ml bottle.', price: 59.99, rating: 4.6, stock: 22, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&q=80' },
    { title: 'Makeup Brush Set 12pc', description: 'Professional synthetic brush set.', price: 29.99, rating: 4.5, stock: 28, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80' },
    { title: 'Vitamin C Serum', description: 'Brightening facial serum 30ml.', price: 22.99, rating: 4.4, stock: 40, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80' },
    { title: 'Nail Polish Collection', description: 'Set of 10 trendy nail polish colors.', price: 16.99, rating: 4.2, stock: 45, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80' },
    { title: 'Beard Grooming Kit', description: 'Oil, balm, and comb for beard care.', price: 27.99, rating: 4.3, stock: 25, image: 'https://images.unsplash.com/photo-1621607502210-7f9b9a73716b?w=400&q=80' },
  ],
  Grocery: [
    { title: 'Organic Olive Oil 500ml', description: 'Extra virgin cold-pressed olive oil.', price: 12.99, rating: 4.6, stock: 40, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80' },
    { title: 'Basmati Rice 5kg', description: 'Premium aged long-grain basmati rice.', price: 14.99, rating: 4.5, stock: 35, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80' },
    { title: 'Mixed Nuts 1kg', description: 'Roasted unsalted mixed nuts pack.', price: 18.99, rating: 4.4, stock: 30, image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d2c?w=400&q=80' },
    { title: 'Green Tea 100 Bags', description: 'Organic green tea bags box.', price: 9.99, rating: 4.3, stock: 50, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80' },
    { title: 'Honey Raw Organic 500g', description: 'Pure unfiltered raw honey jar.', price: 11.99, rating: 4.7, stock: 28, image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80' },
    { title: 'Pasta Penne 500g x 4', description: 'Italian durum wheat penne pasta pack.', price: 7.99, rating: 4.2, stock: 55, image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&q=80' },
    { title: 'Dark Chocolate Bar 6-Pack', description: '70% cocoa artisan chocolate bars.', price: 13.99, rating: 4.5, stock: 42, image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&q=80' },
    { title: 'Instant Coffee 200g', description: 'Premium freeze-dried instant coffee.', price: 10.99, rating: 4.3, stock: 48, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55c?w=400&q=80' },
  ],
  Sports: [
    { title: 'Yoga Mat 6mm', description: 'Non-slip TPE yoga mat with carry strap.', price: 24.99, rating: 4.5, stock: 30, image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&q=80' },
    { title: 'Dumbbell Set 20kg', description: 'Adjustable cast iron dumbbell pair.', price: 79.99, rating: 4.6, stock: 12, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80' },
    { title: 'Cricket Bat English Willow', description: 'Professional grade cricket bat.', price: 89.99, rating: 4.4, stock: 10, image: 'https://images.unsplash.com/photo-1531415071318-dee982b2f440?w=400&q=80' },
    { title: 'Football Size 5', description: 'FIFA quality match football.', price: 29.99, rating: 4.3, stock: 25, image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&q=80' },
    { title: 'Resistance Bands Set', description: '5-level latex resistance band set.', price: 19.99, rating: 4.4, stock: 35, image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&q=80' },
    { title: 'Tennis Racket Pro', description: 'Graphite tennis racket with cover.', price: 69.99, rating: 4.5, stock: 15, image: 'https://images.unsplash.com/photo-1617083277624-024db43a1eb3?w=400&q=80' },
    { title: 'Swimming Goggles', description: 'Anti-fog UV protection swim goggles.', price: 14.99, rating: 4.2, stock: 40, image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&q=80' },
    { title: 'Cycling Helmet', description: 'Lightweight ventilated bike helmet.', price: 44.99, rating: 4.5, stock: 20, image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=400&q=80' },
  ],
  Toys: [
    { title: 'Building Blocks 500pc', description: 'Creative construction block set.', price: 34.99, rating: 4.6, stock: 25, image: 'https://images.unsplash.com/photo-1558060370-5394a310a588?w=400&q=80' },
    { title: 'Remote Control Car', description: 'High-speed RC car with rechargeable battery.', price: 49.99, rating: 4.5, stock: 18, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
    { title: 'Plush Teddy Bear', description: 'Soft 40cm cuddly teddy bear.', price: 19.99, rating: 4.7, stock: 30, image: 'https://images.unsplash.com/photo-1530325552511-855b577e7122?w=400&q=80' },
    { title: 'Board Game Family Pack', description: 'Classic family board game collection.', price: 29.99, rating: 4.4, stock: 22, image: 'https://images.unsplash.com/photo-1611192240325-0c9038937b63?w=400&q=80' },
    { title: 'Art & Craft Kit', description: 'Complete painting and craft supplies kit.', price: 24.99, rating: 4.3, stock: 28, image: 'https://images.unsplash.com/photo-1513364777864-2113a3625233?w=400&q=80' },
    { title: 'Puzzle 1000 Pieces', description: 'Landscape jigsaw puzzle for adults.', price: 16.99, rating: 4.5, stock: 35, image: 'https://images.unsplash.com/photo-1611192240325-0c9038937b63?w=400&q=80' },
    { title: 'Action Figure Set', description: 'Collectible superhero action figures 3-pack.', price: 27.99, rating: 4.2, stock: 20, image: 'https://images.unsplash.com/photo-1558060370-5394a310a588?w=400&q=80' },
    { title: 'Musical Keyboard Toy', description: '37-key electronic keyboard for kids.', price: 39.99, rating: 4.4, stock: 15, image: 'https://images.unsplash.com/photo-1513364777864-2113a3625233?w=400&q=80' },
  ],
  Books: [
    { title: 'The Great Novel', description: 'Bestselling fiction paperback edition.', price: 12.99, rating: 4.6, stock: 40, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80' },
    { title: 'Cookbook Mediterranean', description: '200 recipes from Mediterranean cuisine.', price: 24.99, rating: 4.5, stock: 25, image: 'https://images.unsplash.com/photo-1495446815901-a72907e852ab?w=400&q=80' },
    { title: 'Self Help Motivation', description: 'Guide to personal growth and success.', price: 14.99, rating: 4.4, stock: 35, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80' },
    { title: 'Children Storybook Set', description: 'Illustrated bedtime stories 5-book set.', price: 19.99, rating: 4.7, stock: 30, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80' },
    { title: 'Science Encyclopedia', description: 'Visual encyclopedia for young readers.', price: 29.99, rating: 4.5, stock: 20, image: 'https://images.unsplash.com/photo-1495446815901-a72907e852ab?w=400&q=80' },
    { title: 'Mystery Thriller Hardcover', description: 'Edge-of-seat mystery novel hardcover.', price: 18.99, rating: 4.3, stock: 28, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80' },
    { title: 'History of the World', description: 'Comprehensive world history reference.', price: 34.99, rating: 4.6, stock: 15, image: 'https://images.unsplash.com/photo-1495446815901-a72907e852ab?w=400&q=80' },
    { title: 'Poetry Collection', description: 'Modern poetry anthology paperback.', price: 11.99, rating: 4.2, stock: 38, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80' },
  ],
  Furniture: [
    { title: 'Ergonomic Office Chair', description: 'Adjustable lumbar support desk chair.', price: 199.99, rating: 4.5, stock: 10, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80' },
    { title: 'Bookshelf 5-Tier Wood', description: 'Modern wooden open bookshelf unit.', price: 89.99, rating: 4.4, stock: 12, image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400&q=80' },
    { title: 'Coffee Table Modern', description: 'Minimalist oak coffee table.', price: 129.99, rating: 4.6, stock: 8, image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=400&q=80' },
    { title: 'Dining Table Set 4-Seater', description: 'Solid wood dining table with 4 chairs.', price: 449.99, rating: 4.7, stock: 5, image: 'https://images.unsplash.com/photo-1617806118773-1e0e5782e72c?w=400&q=80' },
    { title: 'Bedside Table Nightstand', description: 'Compact nightstand with drawer.', price: 59.99, rating: 4.3, stock: 18, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80' },
    { title: 'Sofa 3-Seater Fabric', description: 'Comfortable grey fabric sofa.', price: 599.99, rating: 4.5, stock: 4, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80' },
    { title: 'Study Desk with Drawers', description: 'Spacious writing desk with storage.', price: 149.99, rating: 4.4, stock: 10, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&q=80' },
    { title: 'Wardrobe 2-Door', description: 'Spacious 2-door bedroom wardrobe.', price: 279.99, rating: 4.5, stock: 6, image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400&q=80' },
  ],
  Travel: [
    { title: 'Hard Shell Suitcase 24 inch', description: 'Lightweight spinner luggage TSA lock.', price: 89.99, rating: 4.5, stock: 20, image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=400&q=80' },
    { title: 'Travel Backpack 40L', description: 'Water-resistant hiking travel backpack.', price: 59.99, rating: 4.6, stock: 25, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80' },
    { title: 'Packing Cubes Set', description: '6-piece compression packing cube set.', price: 24.99, rating: 4.4, stock: 35, image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=400&q=80' },
    { title: 'Neck Pillow Memory Foam', description: 'U-shaped travel neck support pillow.', price: 19.99, rating: 4.3, stock: 40, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80' },
    { title: 'Travel Adapter Universal', description: 'All-in-one plug adapter 150+ countries.', price: 22.99, rating: 4.5, stock: 30, image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=400&q=80' },
    { title: 'Toiletry Bag Hanging', description: 'Waterproof hanging toiletry organizer.', price: 16.99, rating: 4.2, stock: 45, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80' },
    { title: 'Sun Hat Wide Brim', description: 'Packable UPF 50+ sun protection hat.', price: 14.99, rating: 4.1, stock: 38, image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=400&q=80' },
    { title: 'Carry-On Cabin Bag', description: '20 inch lightweight cabin trolley bag.', price: 69.99, rating: 4.5, stock: 18, image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=400&q=80' },
  ],
};

let id = 1;
const products = [];

Object.entries(CATALOG).forEach(([category, items]) => {
  items.forEach((item) => {
    products.push({ id: id++, category, ...item });
  });
});

const db = { products, orders: [] };
const outPath = path.join(__dirname, '..', 'db.json');
fs.writeFileSync(outPath, JSON.stringify(db, null, 2));
console.log(`Generated ${products.length} products across ${Object.keys(CATALOG).length} categories → ${outPath}`);
