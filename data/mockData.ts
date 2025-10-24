
import { Course, User, Banner } from '../types';

export const BANNERS: Banner[] = [
  { id: '1', imageUrl: 'https://picsum.photos/seed/banner1/800/450', link: '/course/1' },
  { id: '2', imageUrl: 'https://picsum.photos/seed/banner2/800/450', link: '/course/2' },
  { id: '3', imageUrl: 'https://picsum.photos/seed/banner3/800/450', link: '/course/3' },
];

export const COURSES: Course[] = [
  {
    id: '1',
    title: 'Visionary Leadership Masterclass',
    mrp: 4999,
    price: 1999,
    description: 'Unlock your leadership potential with strategies from the visionaries. This course covers everything from team motivation to strategic decision-making in a competitive business landscape.',
    thumbnail: 'https://picsum.photos/seed/course1/800/450',
    chapters: [
      { id: 'c1-ch1', title: 'Module 1: The Visionary Mindset', videos: [
        { id: 'v1', title: '1.1 Introduction to Visionary Leadership', duration: '12:34', url: '' },
        { id: 'v2', title: '1.2 Defining Your Core Vision', duration: '15:50', url: '' },
      ]},
      { id: 'c1-ch2', title: 'Module 2: Building a High-Performance Team', videos: [
        { id: 'v3', title: '2.1 Principles of Effective Recruitment', duration: '22:10', url: '' },
        { id: 'v4', title: '2.2 Fostering a Culture of Innovation', duration: '18:05', url: '' },
      ]},
    ],
    reviews: [
      { id: 'r1', user: 'Aditya R.', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', rating: 5, comment: 'This course completely changed my perspective on leadership. Highly recommended!' },
      { id: 'r2', user: 'Priya S.', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e', rating: 4, comment: 'Great content and very practical examples. The module on team building was fantastic.' },
    ],
  },
  {
    id: '2',
    title: 'Digital Marketing for Business Growth',
    mrp: 3999,
    price: 999,
    description: 'Navigate the digital world with confidence. Learn SEO, SEM, social media marketing, and content strategies to elevate your brand and drive measurable growth.',
    thumbnail: 'https://picsum.photos/seed/course2/800/450',
    chapters: [
       { id: 'c2-ch1', title: 'Module 1: Foundations of Digital Marketing', videos: [
        { id: 'v5', title: '1.1 Understanding the Digital Ecosystem', duration: '10:15', url: '' },
        { id: 'v6', title: '1.2 Creating Your Digital Strategy', duration: '14:30', url: '' },
      ]},
    ],
    reviews: [
        { id: 'r3', user: 'Vikram K.', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f', rating: 5, comment: 'Excellent course for anyone starting with digital marketing. Covers all the essentials.' },
    ],
  },
  {
    id: '3',
    title: 'Startup Fundraising: From Seed to Series A',
    mrp: 6999,
    price: 2499,
    description: 'A comprehensive guide to raising capital for your startup. Learn to create a compelling pitch deck, navigate term sheets, and negotiate with investors.',
    thumbnail: 'https://picsum.photos/seed/course3/800/450',
    chapters: [],
    reviews: [],
  },
  {
    id: '4',
    title: 'Financial Acumen for Entrepreneurs',
    mrp: 2999,
    price: 1499,
    description: 'Master the financial principles essential for any business owner. From reading financial statements to managing cash flow, this course provides the tools for sustainable success.',
    thumbnail: 'https://picsum.photos/seed/course4/800/450',
    chapters: [],
    reviews: [],
  },
];

export const CURRENT_USER: User = {
  id: 'user123',
  name: 'Shivaji Maharaj',
  email: 'visionary@cbva.com',
  phone: '9876543210',
  purchasedCourses: ['1'],
  wishlist: ['2', '4'],
  progress: {
    '1': ['v1', 'v3'], // User has completed video 'v1' and 'v3' in course '1'
  }
};
