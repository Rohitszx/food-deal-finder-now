
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import FilterBar from '@/components/results/FilterBar';
import ResultsList from '@/components/results/ResultsList';

const Results = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const category = searchParams.get('category') || '';
  
  const [searchTerm, setSearchTerm] = useState(query);
  const [sortBy, setSortBy] = useState('lowest-price');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [query, category, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle new search
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setLoading(true);
  };

  return (
    <div className="py-4">
      <form onSubmit={handleSearch} className="relative mb-4">
        <Input
          type="text"
          placeholder="Search for food..."
          className="pl-10 py-5 rounded-xl shadow-sm border-muted"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Button 
          type="submit" 
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-tomato hover:bg-tomato/90"
        >
          Search
        </Button>
      </form>

      <div className="mb-4">
        <h1 className="text-xl font-semibold">
          {category ? 
            `${category.charAt(0).toUpperCase() + category.slice(1)}` : 
            `Results for "${query}"`}
        </h1>
        <p className="text-sm text-muted-foreground">
          Compare prices across platforms
        </p>
      </div>

      <FilterBar activeSortOption={sortBy} onSortChange={handleSortChange} />
      
      <ResultsList isLoading={loading} sortBy={sortBy} />
    </div>
  );
};

export default Results;
