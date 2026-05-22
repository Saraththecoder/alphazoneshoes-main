import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.thealphazone.in',
  timeout: 10000,
});

// Mock data since the backend isn't available
const mockProducts = [
  {
    id: 1,
    name: "Alpha Signature Crimson Sneakers",
    category: "Shoes",
    price: 2499,
    originalPrice: 3999,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
    description: "Premium crimson sneakers crafted for comfort and style. Featuring a bold design that makes a statement wherever you go.",
    features: ["Breathable mesh upper", "Cushioned EVA sole", "Anti-slip grip", "Reflective accents"],
    sizes: ["6", "7", "8", "9", "10"],
    rating: 4.8,
    isNew: true,
    isFeatured: true
  },
  {
    id: 2,
    name: "Midnight Drift Flip Flops",
    category: "Flip Flops",
    price: 499,
    originalPrice: 899,
    image: "https://images.unsplash.com/photo-1598000305542-a8c6f1406411?auto=format&fit=crop&q=80&w=800",
    description: "Lightweight flip flops for your everyday casual walk. Essential comfort for home and beach.",
    features: ["Water-resistant", "Ergonomic strap", "Soft EVA footbed"],
    sizes: ["7", "8", "9", "10"],
    rating: 4.5,
    isNew: false,
    isFeatured: true
  },
  {
    id: 3,
    name: "Onyx Leather Sandals",
    category: "Sandals",
    price: 1299,
    originalPrice: 1999,
    image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&q=80&w=800",
    description: "Elegant dark leather sandals suitable for ethnic and casual wear. True versatility in design.",
    features: ["Genuine leather", "Adjustable strap", "Durable outsole"],
    sizes: ["6", "7", "8", "9", "11"],
    rating: 4.9,
    isNew: true,
    isFeatured: true
  },
  {
    id: 4,
    name: "Velocity Running T-Shirt",
    category: "T-Shirts",
    price: 799,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
    description: "Moisture-wicking activewear t-shirt in deep black. Keeps you cool during the most intense workouts.",
    features: ["Dry-fit fabric", "Reflective logo", "Stretchable"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.6,
    isNew: false,
    isFeatured: true
  },
  {
    id: 5,
    name: "Lunar Night Pants",
    category: "Night Pants",
    price: 999,
    originalPrice: 1499,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
    description: "Ultra-soft night pants with a relaxed fit for perfect sleep. Comfort prioritized above all.",
    features: ["100% Cotton", "Elastic waistband", "Deep pockets"],
    sizes: ["M", "L", "XL"],
    rating: 4.7,
    isNew: true,
    isFeatured: false
  },
  {
    id: 6,
    name: "Urban Core High-Tops",
    category: "Shoes",
    price: 2899,
    originalPrice: 4299,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800",
    description: "Streetwear-inspired high-top sneakers with contrasting red laces and premium suede details.",
    features: ["Suede details", "Padded collar", "Vulcanized rubber sole"],
    sizes: ["7", "8", "9", "10", "11"],
    rating: 4.4,
    isNew: false,
    isFeatured: false
  }
];

const mockDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getAllProducts = async () => {
  try {
    await mockDelay(600);
    return { data: mockProducts, loading: false, error: null };
  } catch (error) {
    return { data: null, loading: false, error: error.message };
  }
};

export const getProductById = async (id) => {
  try {
    await mockDelay(400);
    const product = mockProducts.find(p => p.id === parseInt(id));
    if (!product) throw new Error("Product not found");
    return { data: product, loading: false, error: null };
  } catch (error) {
    return { data: null, loading: false, error: error.message };
  }
};

export const getProductsByCategory = async (category) => {
  try {
    await mockDelay(500);
    const filtered = category.toLowerCase() === 'all' 
      ? mockProducts 
      : mockProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
    return { data: filtered, loading: false, error: null };
  } catch (error) {
    return { data: null, loading: false, error: error.message };
  }
};
