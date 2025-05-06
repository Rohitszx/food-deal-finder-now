
import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RecentSearches = () => {
  const navigate = useNavigate();
  
  const recentSearches = [
    { id: 1, query: "Vegan burgers" },
    { id: 2, query: "Pepperoni pizza" },
    { id: 3, query: "Bubble tea" },
  ];

  const handleSearchClick = (query: string) => {
    navigate(`/results?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className="space-y-2">
      {recentSearches.map((search) => (
        <button
          key={search.id}
          onClick={() => handleSearchClick(search.query)}
          className="flex items-center justify-between w-full p-3 bg-white rounded-lg shadow-sm border border-border hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{search.query}</span>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
        </button>
      ))}
    </div>
  );
};

export default RecentSearches;
