
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Platform {
  name: string;
  price: number;
  originalPrice: number;
  deliveryTime: string;
  rating: number;
  deliveryFee: number;
  discount?: string;
}

interface PlatformComparisonCardProps {
  platform: Platform;
  isHighlighted: boolean;
}

const PlatformComparisonCard = ({ platform, isHighlighted }: PlatformComparisonCardProps) => {
  const handleViewOnApp = () => {
    // In a real app, this would link to the actual delivery platform
    alert(`Redirecting to ${platform.name} to order this item...`);
  };
  
  return (
    <div 
      className={cn(
        "p-4 rounded-lg border",
        isHighlighted ? "border-tomato bg-soft-peach" : "border-border bg-white"
      )}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold">
            {platform.name}
            {isHighlighted && (
              <span className="ml-2 text-xs bg-tomato text-white px-2 py-0.5 rounded-full">Best Deal</span>
            )}
          </h3>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span>{platform.rating}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{platform.deliveryTime} min</span>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center">
            {platform.originalPrice > platform.price && (
              <span className="text-sm line-through text-muted-foreground mr-2">
                ${platform.originalPrice.toFixed(2)}
              </span>
            )}
            <span className={cn(
              "text-lg font-bold",
              platform.discount ? "text-tomato" : ""
            )}>
              ${platform.price.toFixed(2)}
            </span>
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            +${platform.deliveryFee} delivery fee
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Button
          className={cn(
            "w-full",
            isHighlighted ? "bg-tomato hover:bg-tomato/90" : "bg-secondary hover:bg-secondary/90"
          )}
          onClick={handleViewOnApp}
        >
          View on {platform.name}
        </Button>
      </div>
    </div>
  );
};

export default PlatformComparisonCard;
