import React from 'react';
import { Link } from 'react-router-dom';
import { COURSES, CURRENT_USER } from '../data/mockData';
import CourseCard from '../components/CourseCard';
import { Heart } from 'lucide-react';

const WishlistPage: React.FC = () => {
  const wishlistedCourses = COURSES.filter(course => CURRENT_USER.wishlist.includes(course.id));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-50">My Wishlist</h1>
      {wishlistedCourses.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {wishlistedCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 flex flex-col items-center">
          <Heart size={48} className="text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-lg text-gray-500 dark:text-gray-400">Your wishlist is empty.</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Add courses you want to watch later.</p>
          <Link to="/" className="text-white bg-primary font-semibold mt-6 inline-block px-6 py-2 rounded-md hover:bg-primary-dark transition-colors">
            Explore Courses
          </Link>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
