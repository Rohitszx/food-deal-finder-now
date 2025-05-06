
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Star, Clock } from 'lucide-react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResultsListProps {
  isLoading: boolean;
  sortBy: string;
}

const ResultsList = ({ isLoading, sortBy }: ResultsListProps) => {
  const navigate = useNavigate();

  const results = [
    {
      id: 101,
      name: "Classic Cheeseburger",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3",
      platforms: [
        { name: "UberEats", price: 12.99, deliveryTime: "15-25", rating: 4.5, deliveryFee: 1.99 },
        { name: "DoorDash", price: 11.49, deliveryTime: "20-35", rating: 4.3, deliveryFee: 2.49 },
        { name: "Grubhub", price: 12.49, deliveryTime: "25-40", rating: 4.7, deliveryFee: 1.49 },
      ]
    },
    {
      id: 102,
      name: "Double Bacon Deluxe Burger",
      image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-4.0.3",
      platforms: [
        { name: "UberEats", price: 15.99, deliveryTime: "15-25", rating: 4.6, deliveryFee: 1.99 },
        { name: "DoorDash", price: 14.99, deliveryTime: "25-40", rating: 4.2, deliveryFee: 2.99 },
        { name: "Grubhub", price: 16.49, deliveryTime: "20-35", rating: 4.8, deliveryFee: 0.99, deal: "10% OFF" },
      ]
    }
  ];

  // Sort platforms based on selected sort option
  const sortPlatforms = (platforms: any[]) => {
    if (sortBy === 'lowest-price') {
      return [...platforms].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'highest-rating') {
      return [...platforms].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'fastest-delivery') {
      return [...platforms].sort((a, b) => {
        const aTime = parseInt(a.deliveryTime.split('-')[0]);
        const bTime = parseInt(b.deliveryTime.split('-')[0]);
        return aTime - bTime;
      });
    }
    return platforms;
  };

  const handleItemClick = (id: number) => {
    navigate(`/product/${id}`);
  };

  if (isLoading) {
    return (
      <div className="space-y-6 mt-4">
        {[1, 2].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <Skeleton className="h-16 w-16 rounded-md" />
                  <Skeleton className="h-6 w-1/2" />
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="flex justify-between items-center pb-3 border-b border-border">
                      <div className="flex flex-col">
                        <Skeleton className="h-5 w-24 mb-1" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                      <Skeleton className="h-6 w-16" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-4 animate-fade-in">
      {results.map((item) => {
        const sortedPlatforms = sortPlatforms(item.platforms);
        const bestPlatform = sortedPlatforms[0];
        
        return (
          <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="p-4">
                <div className="flex items-start gap-3 mb-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="h-20 w-20 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <button className="text-muted-foreground hover:text-tomato">
                        <Heart className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground gap-2">
                      <span className="text-green-600 font-medium">Best price: ${bestPlatform.price}</span>
                      <span>|</span>
                      <span>{item.platforms.length} options</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {sortedPlatforms.map((platform, index) => (
                    <div key={platform.name} 
                      onClick={() => handleItemClick(item.id)}
                      className={cn(
                        "flex justify-between items-center p-2 rounded-lg cursor-pointer",
                        index === 0 ? "bg-soft-peach" : "hover:bg-muted/50"
                      )}>
                      <div className="flex flex-col">
                        <span className="font-medium">{platform.name}</span>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-0.5" />
                            <span>{platform.rating}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-0.5" />
                            <span>{platform.deliveryTime} min</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          ${platform.price}
                          {platform.deal && (
                            <span className="ml-1 text-xs deal-badge">{platform.deal}</span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          +${platform.deliveryFee} fee
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex justify-end">
                  <button 
                    className="text-tomato text-sm font-medium"
                    onClick={() => handleItemClick(item.id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ResultsList;
