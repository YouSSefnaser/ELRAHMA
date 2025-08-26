import { TeamMember, Client, Testimonial, Award } from '@/types';
import { getImageUrl } from '@/lib/image-utils';

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Ahmed Al-Rahama',
    role: 'Founder & Creative Director',
    image: getImageUrl('team', 0, 400, 400),
    bio: 'With over 12 years of experience in luxury brand photography, Ahmed founded El Rahama Photography to bridge the gap between traditional craftsmanship and contemporary visual storytelling. His work has been featured in Vogue, Harper\'s Bazaar, and numerous international publications.',
    social: {
      instagram: 'https://instagram.com/ahmed.alrahama',
      linkedin: 'https://linkedin.com/in/ahmed-alrahama',
      behance: 'https://behance.net/ahmed-alrahama',
    },
  },
  {
    id: '2',
    name: 'Sarah Mitchell',
    role: 'Senior Fashion Photographer',
    image: '/images/gallery/team-1.jpg',
    bio: 'Sarah brings a unique perspective to fashion photography with her background in fine arts and editorial work. She has collaborated with top fashion houses and her editorial work has graced the pages of international fashion magazines.',
    social: {
      instagram: 'https://instagram.com/sarah.mitchell.photo',
      linkedin: 'https://linkedin.com/in/sarah-mitchell-photographer',
    },
  },
  {
    id: '3',
    name: 'Omar Hassan',
    role: 'Product Photography Specialist',
    image: '/images/gallery/team-1.jpg',
    bio: 'Omar specializes in luxury product photography with a keen eye for detail and technical precision. His expertise in macro photography and lighting has made him the go-to photographer for high-end jewelry and watch brands.',
    social: {
      instagram: 'https://instagram.com/omar.hassan.photo',
      linkedin: 'https://linkedin.com/in/omar-hassan-photographer',
    },
  },
  {
    id: '4',
    name: 'Layla Al-Zahra',
    role: 'Creative Art Director',
    image: '/images/gallery/team-1.jpg',
    bio: 'Layla oversees the creative vision for all projects, ensuring brand consistency and artistic excellence. Her background in graphic design and brand strategy helps create cohesive visual narratives for our clients.',
    social: {
      instagram: 'https://instagram.com/layla.alzahra',
      linkedin: 'https://linkedin.com/in/layla-alzahra',
      behance: 'https://behance.net/layla-alzahra',
    },
  },
  {
    id: '5',
    name: 'Marcus Thompson',
    role: 'Post-Production Director',
    image: '/images/gallery/team-1.jpg',
    bio: 'Marcus leads our post-production team with expertise in advanced retouching and color grading. His technical skills and artistic vision ensure every image meets our exacting standards of quality.',
    social: {
      instagram: 'https://instagram.com/marcus.thompson.retoucher',
      linkedin: 'https://linkedin.com/in/marcus-thompson-retoucher',
    },
  },
  {
    id: '6',
    name: 'Fatima Al-Mansouri',
    role: 'Client Relations Manager',
    image: '/images/gallery/team-1.jpg',
    bio: 'Fatima ensures seamless communication and project management for all our clients. Her attention to detail and commitment to excellence has earned her recognition as one of Dubai\'s top creative project managers.',
    social: {
      linkedin: 'https://linkedin.com/in/fatima-almansouri',
    },
  },
];

export const clients: Client[] = [
  {
    id: '1',
    name: 'Partner 1',
    logo: '/images/partners/ourpartner1.png',
    website: '#',
  },
  {
    id: '2',
    name: 'Partner 2',
    logo: '/images/partners/ourpartner2.png',
    website: '#',
  },
  {
    id: '3',
    name: 'Partner 3',
    logo: '/images/partners/ourpartner3.png',
    website: '#',
  },
  {
    id: '4',
    name: 'Partner 4',
    logo: '/images/partners/ourpartner4.png',
    website: '#',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Al-Mansouri',
    role: 'Brand Director',
    company: 'Emirates Hospitality',
    content: 'El Rahama Photography transformed our brand vision into stunning visual reality. Their cinematic approach and attention to detail exceeded all our expectations. The campaign they created for our luxury resort resulted in a 150% increase in bookings.',
    image: '/images/gallery/team-1.jpg',
    rating: 5,
  },
  {
    id: '2',
    name: 'James Richardson',
    role: 'Creative Director',
    company: 'Vogue Arabia',
    content: 'Working with Ahmed and his team was an absolute pleasure. Their understanding of fashion photography and editorial excellence is unmatched in the region. The editorial spread they created became one of our most celebrated issues.',
    image: '/images/gallery/team-1.jpg',
    rating: 5,
  },
  {
    id: '3',
    name: 'Layla Al-Zahra',
    role: 'Marketing Manager',
    company: 'Luxury Watch Boutique',
    content: 'The product photography El Rahama created for our timepiece collection was simply breathtaking. Every detail was captured with precision and artistry. Our online sales increased by 200% after implementing their imagery.',
    image: '/images/gallery/team-1.jpg',
    rating: 5,
  },
];

export const awards: Award[] = [
  {
    id: '1',
    title: 'International Photography Awards - Commercial Excellence',
    organization: 'International Photography Awards',
    year: 2024,
    category: 'Commercial Photography',
    image: '/images/gallery/products-1.jpg',

  },
  {
    id: '2',
    title: 'Dubai Creative Industry Awards - Best Photography Studio',
    organization: 'Dubai Creative Industry',
    year: 2023,
    category: 'Photography',
    image: '/images/gallery/fashion-1.jpg',

  },
  {
    id: '3',
    title: 'Middle East Fashion Photography Award',
    organization: 'Fashion Photography Association',
    year: 2023,
    category: 'Fashion Photography',
    image: '/images/gallery/fashion-2.jpg',

  },
  {
    id: '4',
    title: 'Luxury Brand Photography Excellence',
    organization: 'Luxury Marketing Council',
    year: 2022,
    category: 'Brand Photography',
    image: '/images/gallery/products-2.jpg',

  },
];
