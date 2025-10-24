
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import BannerSlider from '../components/BannerSlider';
import CourseCard from '../components/CourseCard';
import { BANNERS, COURSES } from '../data/mockData';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = COURSES.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col">
      <div className="p-4 bg-white dark:bg-slate-800">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for courses..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-slate-700 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>
      
      <BannerSlider banners={BANNERS} />

      <section className="py-6">
        <h2 className="px-4 text-xl font-bold mb-4 text-gray-900 dark:text-gray-50">Latest Courses</h2>
        <div className="flex overflow-x-auto pl-4 pb-4">
          {COURSES.slice(0, 4).map(course => (
            <CourseCard key={course.id} course={course} horizontal />
          ))}
          <div className="flex-shrink-0 w-4"></div>
        </div>
      </section>

      <section className="px-4 py-6 bg-gray-100 dark:bg-slate-900">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-50">All Courses</h2>
        <div className="grid grid-cols-1 gap-4">
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">No courses found matching your search.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
