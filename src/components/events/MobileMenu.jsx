import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const MobileMenu = ({ isOpen, onClose }) => {
  const menuItems = ['Home', 'About Us', 'Gallery', 'Blogs', 'Events', 'Join Us'];

  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-dark bg-opacity-98 z-50 flex flex-col p-6 sm:p-8 overflow-hidden">
      <div className="flex justify-end">
        <button 
          onClick={onClose}
          className="text-white p-1 hover:text-primary-300 transition-colors"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
      </div>
      
      <div className="flex flex-col items-center justify-center h-full space-y-6 sm:space-y-8">
        {menuItems.map((item) => (
          <a
            key={item}
            href="#"
            className="text-white text-lg sm:text-xl font-medium tracking-wide hover:text-primary-300 transition-colors py-2"
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;