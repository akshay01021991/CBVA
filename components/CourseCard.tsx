
import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../types';
import { Star } from 'lucide-react';

const StarRating: React.FC<{ rating: number, reviewCount: number }> = ({ rating, reviewCount }) => {
    if (reviewCount === 0) return null;
    return (
        <div className="flex items-center">
            <span className="text-amber-500 font-bold mr-1">{rating.toFixed(1)}</span>
            <Star size={16} className="text-amber-500 fill-current" />
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">({reviewCount})</span>
        </div>
    );
};

const CourseCard: React.FC<{ course: Course; horizontal?: boolean }> = ({ course, horizontal = false }) => {
  const discount = Math.round(((course.mrp - course.price) / course.mrp) * 100);

  const containerClasses = horizontal
    ? 'flex-shrink-0 w-64 mr-4'
    : 'w-full';
  
  const avgRating = course.reviews.length > 0
    ? course.reviews.reduce((acc, review) => acc + review.rating, 0) / course.reviews.length
    : 0;

  return (
    <div className={containerClasses}>
      <Link to={`/course/${course.id}`} className="block bg-white dark:bg-slate-700 shadow-md overflow-hidden group">
        <div className="aspect-[16/9] overflow-hidden">
          <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>
        <div className="p-3">
          <h3 className="font-bold text-md truncate text-gray-800 dark:text-gray-100">{course.title}</h3>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-baseline">
                <p className="text-lg font-bold text-primary">₹{course.price.toLocaleString()}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-through ml-2">₹{course.mrp.toLocaleString()}</p>
            </div>
            {avgRating > 0 && <StarRating rating={avgRating} reviewCount={course.reviews.length} />}
          </div>
           {discount > 0 && (
              <p className="text-xs font-semibold text-green-600 dark:text-green-400 mt-1">{discount}% OFF</p>
            )}
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
