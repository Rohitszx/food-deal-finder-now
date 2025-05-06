
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

type Category = {
  id: number;
  name: string;
  icon: React.ReactNode;
};

interface CategorySliderProps {
  categories: Category[];
}

const CategorySlider = ({ categories }: CategorySliderProps) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    navigate(`/results?category=${encodeURIComponent(category.toLowerCase())}`);
  };

  return (
    <div className="category-scroll flex gap-3 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.name)}
          className={cn(
            "flex flex-col items-center justify-center min-w-[80px] p-3 rounded-xl",
            "bg-white border border-border shadow-sm transition-all hover:shadow",
            "active:scale-95"
          )}
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-soft-peach text-tomato mb-2">
            {category.icon}
          </div>
          <span className="text-sm font-medium">{category.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategorySlider;
