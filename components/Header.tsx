import React from 'react';
import { Menu, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-primary text-white p-4 flex items-center justify-between sticky top-0 z-10 shadow-md">
      {/* Added flex-shrink-0 to prevent icon from being squeezed */}
      <button className="p-2 flex-shrink-0">
        <Menu size={24} />
      </button>
      {/* Added flex-1, min-w-0 and text-center to properly handle long text and truncation */}
      <h1 className="flex-1 min-w-0 text-lg font-bold truncate text-center px-2">Chhatrapati Business Vision Academy</h1>
      {/* Added flex-shrink-0 to prevent icon from being squeezed */}
      <button className="p-2 flex-shrink-0">
        <User size={24} />
      </button>
    </header>
  );
};

export default Header;
