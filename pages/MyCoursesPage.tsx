
import React from 'react';
import { Link } from 'react-router-dom';
import { COURSES, CURRENT_USER } from '../data/mockData';
import { Course } from '../types';
import { PlayCircle } from 'lucide-react';

const MyCourseCard: React.FC<{ course: Course }> = ({ course }) => {
    const firstChapterId = course.chapters[0]?.id;
    const firstVideoId = course.chapters[0]?.videos[0]?.id;
    const startLink = `/watch/${course.id}/chapter/${firstChapterId}/video/${firstVideoId}`;

    const totalVideos = course.chapters.reduce((acc, chap) => acc + chap.videos.length, 0);
    const completedVideos = CURRENT_USER.progress[course.id]?.length || 0;
    const progressPercentage = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0;
    
    return (
        <div className="bg-white dark:bg-slate-700 shadow-md overflow-hidden flex flex-col">
            <div className="flex">
                <div className="w-1/3">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover"/>
                </div>
                <div className="w-2/3 p-4 flex flex-col justify-between">
                    <div>
                        <h3 className="font-bold text-md text-gray-800 dark:text-gray-100">{course.title}</h3>
                    </div>
                    <Link to={startLink} className="mt-2 inline-flex items-center justify-center px-4 py-2 bg-primary text-white font-semibold text-sm rounded-md hover:bg-primary-dark transition-colors self-start">
                        <PlayCircle size={18} className="mr-2" />
                        {progressPercentage > 0 ? 'Continue' : 'Start'}
                    </Link>
                </div>
            </div>
            {totalVideos > 0 && (
                 <div className="p-4 pt-0">
                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{progressPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-slate-600">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                 </div>
            )}
        </div>
    )
}


const MyCoursesPage: React.FC = () => {
  const purchasedCourses = COURSES.filter(course => CURRENT_USER.purchasedCourses.includes(course.id));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-50">My Courses</h1>
      {purchasedCourses.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {purchasedCourses.map(course => (
            <MyCourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500 dark:text-gray-400">You haven't purchased any courses yet.</p>
          <Link to="/" className="text-primary font-semibold mt-2 inline-block">Explore Courses</Link>
        </div>
      )}
    </div>
  );
};

export default MyCoursesPage;
