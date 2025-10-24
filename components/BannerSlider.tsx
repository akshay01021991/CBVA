
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Banner } from '../types';

interface BannerSliderProps {
  banners: Banner[];
}

const BannerSlider: React.FC<BannerSliderProps> = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === banners.length - 1 ? 0 : prevIndex + 1));
  }, [banners.length]);

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 3000);
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  return (
    <div className="relative w-full aspect-[16/9] overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner) => (
          <Link to={banner.link} key={banner.id} className="w-full flex-shrink-0">
            <img src={banner.imageUrl} alt={`Banner ${banner.id}`} className="w-full h-full object-cover" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
