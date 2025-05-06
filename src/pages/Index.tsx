
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Utensils, Pizza, Salad, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import FeaturedDeals from '@/components/home/FeaturedDeals';
import CategorySlider from '@/components/home/CategorySlider';
import RecentSearches from '@/components/home/RecentSearches';
import { useIsMobile } from '@/hooks/use-mobile';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/results?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const categories = [
    { id: 1, name: "Burgers", icon: <Utensils className="h-6 w-6" /> },
    { id: 2, name: "Pizza", icon: <Pizza className="h-6 w-6" /> },
    { id: 3, name: "Salads", icon: <Salad className="h-6 w-6" /> },
    { id: 4, name: "Vegan", icon: <Heart className="h-6 w-6" /> },
    { id: 5, name: "Desserts", icon: <Heart className="h-6 w-6" /> },
  ];

  return (
    <div className="flex flex-col gap-6 py-4">
      <section className={`mt-${isMobile ? '2' : '6'} animate-fade-in`}>
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6">
          Find Your Food <span className="text-tomato">Cheaper</span>
        </h1>

        <form onSubmit={handleSearch} className="relative mb-6 md:mb-8">
          <Input
            type="text"
            placeholder={isMobile ? "Search food..." : "Search for burgers, pizza, salads..."}
            className="pl-10 py-5 md:py-6 rounded-xl shadow-sm border-muted"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Button 
            type="submit" 
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-tomato hover:bg-tomato/90"
          >
            {isMobile ? "Go" : "Search"}
          </Button>
        </form>
      </section>

      <section className="animate-slide-in">
        <div className="flex justify-between items-center mb-3 md:mb-4">
          <h2 className="text-lg md:text-xl font-semibold">Categories</h2>
        </div>
        <CategorySlider categories={categories} />
      </section>

      <section className="animate-slide-in">
        <div className="flex justify-between items-center mb-3 md:mb-4">
          <h2 className="text-lg md:text-xl font-semibold">Today's Best Deals</h2>
          <a href="/deals" className="text-tomato text-sm font-medium">See All</a>
        </div>
        <FeaturedDeals />
      </section>

      <section className="animate-slide-in">
        <div className="flex justify-between items-center mb-3 md:mb-4">
          <h2 className="text-lg md:text-xl font-semibold">Recent Searches</h2>
        </div>
        <RecentSearches />
      </section>
    </div>
  );
};

export default HomePage;
