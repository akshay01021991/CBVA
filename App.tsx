
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import CourseDetailPage from './pages/CourseDetailPage';
import MyCoursesPage from './pages/MyCoursesPage';
import WatchPage from './pages/WatchPage';
import ProfilePage from './pages/ProfilePage';
import HelpPage from './pages/HelpPage';
import WishlistPage from './pages/WishlistPage';

const App: React.FC = () => {
  // Disable context menu, text selection, and pinch-to-zoom
  useEffect(() => {
    const handleContextmenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextmenu);
    document.body.classList.add('select-none');
    
    // Prevent video download attempts via context menu
    document.addEventListener('contextmenu', (e) => {
        if (e.target && (e.target as HTMLElement).tagName === 'VIDEO') {
            e.preventDefault();
        }
    });

    return () => {
      document.removeEventListener('contextmenu', handleContextmenu);
    };
  }, []);

  return (
    <HashRouter>
      <Main />
    </HashRouter>
  );
};

const Main: React.FC = () => {
  const location = useLocation();
  const noNavRoutes = ['/watch'];
  const showNav = !noNavRoutes.some(path => location.pathname.startsWith(path));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-gray-200 font-sans antialiased">
      <div className="max-w-md mx-auto bg-white dark:bg-slate-800 shadow-2xl min-h-screen flex flex-col">
        {showNav && <Header />}
        <main className="flex-grow pb-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/course/:id" element={<CourseDetailPage />} />
            <Route path="/my-courses" element={<MyCoursesPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/watch/:courseId/chapter/:chapterId/video/:videoId" element={<WatchPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/help" element={<HelpPage />} />
          </Routes>
        </main>
        {showNav && <BottomNav />}
      </div>
    </div>
  );
}

export default App;
