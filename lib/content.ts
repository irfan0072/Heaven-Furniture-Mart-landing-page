export const siteContent = {
  brand: 'Heaven Furniture Mart',
  tagline: 'Designed. Crafted. Customized.',
  location: 'Agrabad Access Road, Chattogram, Bangladesh',
  phone: '+880 1960-481983',
  email: 'heavenfurnituremart@gmail.com',
  whatsapp:
    'https://wa.me/8801960481983?text=Hello%20Heaven%20Furniture%20Mart%2C%20I%20would%20like%20to%20request%20a%20custom%20furniture%20quote.',
  directions:
    'https://www.google.com/maps/search/?api=1&query=Agrabad+Access+Road+Chattogram+Bangladesh',
  social: {
    facebook: 'https://facebook.com/HeavenFurnitureMart',
    instagram: 'https://instagram.com/heaven_furniture_ltd',
    youtube: 'https://youtube.com/@HeavenFurnitureMart',
  },
  collections: [
    {
      title: 'Living Room',
      copy: 'Signature sofa sets shaped for gathering, comfort, and everyday life.',
      image: '/media/heaven-living.webp',
    },
    {
      title: 'Bedroom',
      copy: 'Statement beds and coordinated pieces designed around calm.',
      image: '/media/heaven-bedroom.webp',
    },
    {
      title: 'Dining',
      copy: 'Dining sets made for family meals, hosting, and celebration.',
      image: '/media/heaven-dining.webp',
    },
    {
      title: 'Showcase & Storage',
      copy: 'Display and storage pieces that bring order without losing character.',
      image: '/media/heaven-showcase.webp',
    },
  ],
  process: [
    {
      number: '01',
      title: 'Consultation',
      copy: 'We listen to your needs, space, and vision.',
    },
    {
      number: '02',
      title: 'Design',
      copy: 'We refine the dimensions, materials, and details.',
    },
    {
      number: '03',
      title: 'Craftsmanship',
      copy: 'Skilled craftspeople bring the approved design to life.',
    },
    {
      number: '04',
      title: 'Delivery & Installation',
      copy: 'Your furniture is delivered and carefully installed.',
    },
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
  introduction: {
    src: '/media/showroom.webp',
    alt: 'Editorial furniture showroom interior',
  },
  craft: {
    src: '/media/craft.webp',
    alt: 'Editorial close view of a refined interior and furniture details',
  },
  founder: {
    src: '/media/detail.webp',
    alt: 'Editorial furniture detail in warm natural materials',
  },
  showroom: {
    src: '/media/heaven-showroom-visit-v2.webp',
    alt: 'Heaven Furniture Mart showroom exterior in Agrabad, Chattogram',
  },
  closing: {
    src: '/media/dining.webp',
    alt: 'Editorial dining room with warm architectural lighting',
  },
} as const;
