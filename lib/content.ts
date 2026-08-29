export const siteContent = {
  brand: 'Heaven Furniture Mart',
  tagline: 'Designed. Crafted. Customized.',
  location: 'Agrabad Access Road, Chattogram, Bangladesh',
  phone: '+880 1960-481983',
  email: 'heavenfurnituremart@gmail.com',
  whatsapp:
    'https://wa.me/8801960481983?text=Hello%20Heaven%20Furniture%20Mart%2C%20I%20would%20like%20to%20request%20a%20custom%20furniture%20quote.',
  directions: 'https://www.google.com/maps/search/?api=1&query=Agrabad+Access+Road+Chattogram+Bangladesh',
  social: {
    facebook: 'https://facebook.com/HeavenFurnitureMart',
    instagram: 'https://instagram.com/heaven_furniture_ltd',
    youtube: 'https://youtube.com/@HeavenFurnitureMart',
  },
  collections: [
    { title: 'Living Room', copy: 'Sofas, coffee tables, TV units, and consoles.', image: '/media/living-room.jpg' },
    { title: 'Bedroom', copy: 'Beds, wardrobes, dressing tables, and bedside tables.', image: '/media/bedroom.jpg' },
    { title: 'Dining', copy: 'Dining tables, chairs, and cabinets.', image: '/media/dining.jpg' },
    { title: 'Office & Study', copy: 'Executive tables, bookshelves, and workstations.', image: '/media/detail.jpg' },
  ],
  process: [
    { number: '01', title: 'Consultation', copy: 'We listen to your needs, space, and vision.' },
    { number: '02', title: 'Design', copy: 'We refine the dimensions, materials, and details.' },
    { number: '03', title: 'Craftsmanship', copy: 'Skilled craftspeople bring the approved design to life.' },
    { number: '04', title: 'Delivery & Installation', copy: 'Your furniture is delivered and carefully installed.' },
  ],
  trust: [
    'Free design consultation',
    'Fully bespoke—built for your space',
    'Premium wood and materials',
    'Skilled in-house craftsmanship',
    'Large physical showroom in Agrabad',
    'Delivery and installation included',
    'Easy payment options',
    'Trusted by hundreds of happy homeowners',
  ],
  timeline: [
    ['2020', 'Founded by Abul Kalam Bhuiyan'],
    ['2021', 'Opened the Agrabad showroom'],
    ['2024–2025', 'Exhibited at the International Furniture Fair, Chattogram'],
    ['2025', 'Became a member of the Chamber of Commerce'],
    ['2026', 'Received nationwide BFIOA recognition'],
  ],
} as const;

// These licensed editorial placeholders are deliberately centralized.
// Replace paths with authentic Heaven Furniture Mart assets when supplied.
export const media = {
  introduction: { src: '/media/showroom.jpg', alt: 'Editorial furniture showroom interior' },
  craft: { src: '/media/craft.jpg', alt: 'Editorial close view of a refined interior and furniture details' },
  founder: { src: '/media/detail.jpg', alt: 'Editorial furniture detail in warm natural materials' },
  showroom: { src: '/media/living-room.jpg', alt: 'Editorial luxury living room interior' },
  closing: { src: '/media/dining.jpg', alt: 'Editorial dining room with warm architectural lighting' },
} as const;

