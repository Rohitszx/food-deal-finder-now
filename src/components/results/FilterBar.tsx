
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp, Clock, Star, Filter } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Checkbox } from '@/components/ui/checkbox';

interface FilterBarProps {
  activeSortOption: string;
  onSortChange: (value: string) => void;
}

const FilterBar = ({ activeSortOption, onSortChange }: FilterBarProps) => {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const sortOptions = [
    { id: 'lowest-price', label: 'Lowest Price', icon: <ArrowDown className="h-4 w-4" /> },
    { id: 'highest-rating', label: 'Highest Rating', icon: <Star className="h-4 w-4" /> },
    { id: 'fastest-delivery', label: 'Fastest Delivery', icon: <Clock className="h-4 w-4" /> },
  ];

  return (
    <div className="sticky top-[72px] z-10 bg-background py-2 border-y">
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none -mx-2 px-2">
        {sortOptions.map((option) => (
          <Button
            key={option.id}
            variant={activeSortOption === option.id ? "secondary" : "outline"}
            className={`flex items-center gap-1 whitespace-nowrap py-1 h-9 ${activeSortOption === option.id ? 'bg-secondary text-white' : ''}`}
            onClick={() => onSortChange(option.id)}
          >
            {option.icon}
            <span className="text-sm">{option.label}</span>
          </Button>
        ))}
        
        <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1 ml-auto whitespace-nowrap py-1 h-9">
              <Filter className="h-4 w-4" />
              <span className="text-sm">Filters</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[280px] sm:w-[340px]">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            
            <div className="py-4 space-y-5">
              <div>
                <h3 className="text-sm font-medium mb-2">Dietary Preferences</h3>
                <div className="space-y-2">
                  {['Vegetarian', 'Vegan', 'Gluten-Free'].map((diet) => (
                    <div key={diet} className="flex items-center space-x-2">
                      <Checkbox id={diet.toLowerCase()} />
                      <label htmlFor={diet.toLowerCase()} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {diet}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Price Range</h3>
                <div className="space-y-2">
                  {['Under $10', '$10-$20', '$20-$30', 'Over $30'].map((price) => (
                    <div key={price} className="flex items-center space-x-2">
                      <Checkbox id={price.toLowerCase().replace(/\s/g, '-')} />
                      <label htmlFor={price.toLowerCase().replace(/\s/g, '-')} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {price}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Delivery Platforms</h3>
                <div className="space-y-2">
                  {['UberEats', 'DoorDash', 'Grubhub', 'Local Restaurants'].map((platform) => (
                    <div key={platform} className="flex items-center space-x-2">
                      <Checkbox id={platform.toLowerCase().replace(/\s/g, '-')} />
                      <label htmlFor={platform.toLowerCase().replace(/\s/g, '-')} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {platform}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <SheetFooter>
              <Button 
                className="w-full bg-tomato hover:bg-tomato/90"
                onClick={() => setFiltersOpen(false)}
              >
                Apply Filters
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default FilterBar;
