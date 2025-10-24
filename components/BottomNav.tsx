
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookCopy, Heart, User } from 'lucide-react';

const NavItem: React.FC<{ to: string; icon: React.ReactNode; label: string }> = ({ to, icon, label }) => {
  const activeClass = 'text-primary';
  const inactiveClass = 'text-gray-500 dark:text-gray-400';

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center w-full transition-colors duration-200 ${isActive ? activeClass : inactiveClass}`
      }
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </NavLink>
  );
};

const BottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 h-16 flex items-center justify-around z-10">
      <NavItem to="/" icon={<Home size={22} />} label="Home" />
      <NavItem to="/my-courses" icon={<BookCopy size={22} />} label="My Courses" />
      <NavItem to="/wishlist" icon={<Heart size={22} />} label="Wishlist" />
      <NavItem to="/profile" icon={<User size={22} />} label="Profile" />
    </nav>
  );
};

export default BottomNav;
