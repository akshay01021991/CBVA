
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Star, Bot, LoaderCircle } from 'lucide-react';
import { COURSES, CURRENT_USER } from '../data/mockData';
import { getCourseSummary } from '../services/geminiService';
import { Course } from '../types';

const StarRatingDisplay: React.FC<{ rating: number }> = ({ rating }) => {
    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className={`mr-1 ${i < rating ? 'text-amber-500 fill-current' : 'text-gray-300'}`} />
            ))}
        </div>
    );
};

const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const course = COURSES.find(c => c.id === id);

  // In a real app, this would be managed with global state/context
  const [isInWishlist, setIsInWishlist] = useState(CURRENT_USER.wishlist.includes(id!));
  const [summary, setSummary] = useState('');
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);

  if (!course) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold">Course not found</h2>
        <Link to="/" className="text-primary mt-4 inline-block">Go to Home</Link>
      </div>
    );
  }

  const isPurchased = CURRENT_USER.purchasedCourses.includes(course.id);
  const discount = Math.round(((course.mrp - course.price) / course.mrp) * 100);
  const firstChapterId = course.chapters[0]?.id;
  const firstVideoId = course.chapters[0]?.videos[0]?.id;
  const startLink = `/watch/${course.id}/chapter/${firstChapterId}/video/${firstVideoId}`;
  
  const avgRating = course.reviews.length > 0
    ? course.reviews.reduce((acc, review) => acc + review.rating, 0) / course.reviews.length
    : 0;

  const handleToggleWishlist = () => {
    // This is a mock implementation. A real app would update the backend.
    if (isInWishlist) {
        CURRENT_USER.wishlist = CURRENT_USER.wishlist.filter(courseId => courseId !== id);
    } else {
        CURRENT_USER.wishlist.push(id!);
    }
    setIsInWishlist(!isInWishlist);
  };

  const handleGenerateSummary = async () => {
    setIsSummaryLoading(true);
    const result = await getCourseSummary(course as Course);
    setSummary(result);
    setIsSummaryLoading(false);
  };


  return (
    <div className="relative">
      <div className="relative aspect-[16/9]">
        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
        <Link to="/" className="absolute top-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded-full z-10">
          <ArrowLeft size={24} />
        </Link>
        <button onClick={handleToggleWishlist} className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full z-10">
            <Heart size={24} className={isInWishlist ? 'text-red-500 fill-current' : 'text-white'} />
        </button>
      </div>
      <div className="p-4 pb-24">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">{course.title}</h1>
        {course.reviews.length > 0 && (
             <div className="flex items-center my-2">
                <span className="font-bold text-amber-500 mr-2">{avgRating.toFixed(1)}</span>
                <StarRatingDisplay rating={Math.round(avgRating)} />
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">({course.reviews.length} ratings)</span>
            </div>
        )}
        <div className="flex items-baseline my-3">
          <p className="text-2xl font-bold text-primary">₹{course.price.toLocaleString()}</p>
          <p className="text-md text-gray-500 dark:text-gray-400 line-through ml-3">₹{course.mrp.toLocaleString()}</p>
          {discount > 0 && (
            <span className="ml-4 bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
              {discount}% OFF
            </span>
          )}
        </div>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{course.description}</p>
        
        <div className="my-6 p-4 bg-sky-50 dark:bg-slate-700/50 rounded-lg">
            <h2 className="text-lg font-bold mb-2 flex items-center gap-2"><Bot size={20} className="text-primary"/> AI-Powered Summary</h2>
            {summary ? (
                <div className="prose prose-sm dark:prose-invert" dangerouslySetInnerHTML={{ __html: summary.replace(/\*/g, '•') }} />
            ) : (
                <button onClick={handleGenerateSummary} disabled={isSummaryLoading} className="w-full bg-primary/10 text-primary font-bold py-2 text-center block rounded-md disabled:opacity-50">
                    {isSummaryLoading ? <LoaderCircle className="animate-spin mx-auto" /> : 'Generate Quick Summary'}
                </button>
            )}
        </div>

        <div className="mt-6">
            <h2 className="text-lg font-bold mb-2">Course Content</h2>
            {course.chapters.length > 0 ? (
                 <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                    {course.chapters.map(chapter => (
                        <li key={chapter.id} className="font-semibold mt-2">{chapter.title}
                           <ul className="list-['-_'] list-inside ml-4 font-normal">
                           {chapter.videos.map(video => <li key={video.id}>{video.title}</li>)}
                           </ul>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 dark:text-gray-400">Course content will be available soon.</p>
            )}
        </div>

        <div className="mt-8">
            <h2 className="text-lg font-bold mb-4">{`Reviews (${course.reviews.length})`}</h2>
            {course.reviews.length > 0 ? (
                <div className="space-y-4">
                    {course.reviews.map(review => (
                        <div key={review.id} className="border-b border-gray-200 dark:border-slate-700 pb-4">
                            <div className="flex items-center mb-2">
                                <img src={review.avatar} alt={review.user} className="w-10 h-10 rounded-full mr-3" />
                                <div>
                                    <p className="font-bold">{review.user}</p>
                                    <StarRatingDisplay rating={review.rating} />
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 dark:text-gray-400">No reviews for this course yet.</p>
            )}
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-3 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700">
        {isPurchased ? (
          <Link to={startLink} className="w-full bg-primary-dark text-white font-bold py-3 text-center block rounded-md">
            START LEARNING
          </Link>
        ) : (
          <button className="w-full bg-primary text-white font-bold py-3 text-center block rounded-md">
            BUY NOW
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseDetailPage;
