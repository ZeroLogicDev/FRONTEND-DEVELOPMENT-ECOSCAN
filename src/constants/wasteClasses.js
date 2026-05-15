/**
 * Waste classification constants.
 * Mirrors CLASS_NAMES and category logic from the FastAPI backend (main.py).
 */

export const CLASS_NAMES = [
  'battery',
  'biological',
  'brown-glass',
  'cardboard',
  'clothes',
  'glass',
  'green-glass',
  'metal',
  'paper',
  'plastic',
  'shoes',
  'trash',
  'white-glass',
];

/**
 * Classes that are Anorganik (inorganic).
 * Everything except 'biological' is inorganic.
 */
export const INORGANIC_CLASSES = [
  'battery',
  'brown-glass',
  'cardboard',
  'clothes',
  'glass',
  'green-glass',
  'metal',
  'paper',
  'plastic',
  'shoes',
  'trash',
  'white-glass',
];

export const ORGANIC_CLASSES = ['biological'];

/**
 * Display-friendly labels for each class name.
 */
export const CLASS_LABELS = {
  battery: { en: 'Battery', id: 'Baterai' },
  biological: { en: 'Biological', id: 'Biologis' },
  'brown-glass': { en: 'Brown Glass', id: 'Kaca Cokelat' },
  cardboard: { en: 'Cardboard', id: 'Kardus' },
  clothes: { en: 'Clothes', id: 'Pakaian' },
  glass: { en: 'Glass', id: 'Kaca' },
  'green-glass': { en: 'Green Glass', id: 'Kaca Hijau' },
  metal: { en: 'Metal', id: 'Logam' },
  paper: { en: 'Paper', id: 'Kertas' },
  plastic: { en: 'Plastic', id: 'Plastik' },
  shoes: { en: 'Shoes', id: 'Sepatu' },
  trash: { en: 'Trash', id: 'Sampah' },
  'white-glass': { en: 'White Glass', id: 'Kaca Putih' },
};

/**
 * Recycling tips for each waste class.
 */
export const WASTE_TIPS = {
  battery: {
    en: 'Never throw batteries in regular trash. Take them to a designated battery collection point.',
    id: 'Jangan buang baterai ke tempat sampah biasa. Bawa ke tempat pengumpulan baterai.',
  },
  biological: {
    en: 'Compost biological waste to create nutrient-rich soil for gardening.',
    id: 'Komposkan sampah biologis untuk membuat tanah yang kaya nutrisi.',
  },
  'brown-glass': {
    en: 'Rinse and recycle. Brown glass can be recycled indefinitely without quality loss.',
    id: 'Bilas dan daur ulang. Kaca cokelat bisa didaur ulang tanpa batas.',
  },
  cardboard: {
    en: 'Flatten and recycle. Remove any tape or labels before recycling.',
    id: 'Ratakan dan daur ulang. Lepaskan selotip atau label sebelum mendaur ulang.',
  },
  clothes: {
    en: 'Donate wearable clothes. Damaged fabric can be recycled into industrial rags.',
    id: 'Donasikan pakaian yang masih layak. Kain rusak bisa didaur ulang menjadi kain industri.',
  },
  glass: {
    en: 'Separate by color and recycle. Glass is 100% recyclable.',
    id: 'Pisahkan berdasarkan warna dan daur ulang. Kaca 100% bisa didaur ulang.',
  },
  'green-glass': {
    en: 'Green glass is commonly used for wine bottles. Recycle at glass collection points.',
    id: 'Kaca hijau biasa digunakan untuk botol anggur. Daur ulang di titik pengumpulan kaca.',
  },
  metal: {
    en: 'Clean and recycle. Aluminum cans can be recycled and back on shelves in 60 days.',
    id: 'Bersihkan dan daur ulang. Kaleng aluminium bisa didaur ulang dan kembali ke rak dalam 60 hari.',
  },
  paper: {
    en: 'Recycle clean, dry paper. Avoid recycling paper contaminated with food or grease.',
    id: 'Daur ulang kertas yang bersih dan kering. Hindari mendaur ulang kertas yang terkena makanan.',
  },
  plastic: {
    en: 'Check the recycling number. Reduce single-use plastic whenever possible.',
    id: 'Periksa nomor daur ulang. Kurangi plastik sekali pakai sebisa mungkin.',
  },
  shoes: {
    en: 'Donate wearable shoes. Some brands offer shoe recycling programs.',
    id: 'Donasikan sepatu yang masih layak. Beberapa merek menawarkan program daur ulang sepatu.',
  },
  trash: {
    en: 'General waste goes to landfill. Try to minimize this category by recycling more.',
    id: 'Sampah umum masuk ke TPA. Usahakan mengurangi kategori ini dengan lebih banyak mendaur ulang.',
  },
  'white-glass': {
    en: 'Clear glass is the most recyclable. Separate from colored glass for best results.',
    id: 'Kaca bening paling mudah didaur ulang. Pisahkan dari kaca berwarna untuk hasil terbaik.',
  },
};

/**
 * Category constants
 */
export const CATEGORIES = {
  ORGANIC: 'Organik',
  INORGANIC: 'Anorganik',
};

/**
 * Check if a class name is organic
 */
export function isOrganic(className) {
  return ORGANIC_CLASSES.includes(className);
}
