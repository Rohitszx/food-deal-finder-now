
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const FeaturedDeals = () => {
  const navigate = useNavigate();
  
  const deals = [
    {
      id: 1,
      name: "Double Cheeseburger",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1599&q=80",
      originalPrice: 12.99,
      dealPrice: 9.99,
      platform: "UberEats",
      rating: 4.5,
      discount: "23% OFF"
    },
    {
      id: 2,
      name: "Margherita Pizza",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      originalPrice: 16.99,
      dealPrice: 13.49,
      platform: "DoorDash",
      rating: 4.7,
      discount: "20% OFF"
    },
    {
      id: 3,
      name: "Chicken Caesar Salad",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      originalPrice: 14.99,
      dealPrice: 11.99,
      platform: "GrubHub",
      rating: 4.3,
      discount: "20% OFF"
    }
  ];

  const handleDealClick = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {deals.map((deal) => (
        <Card 
          key={deal.id} 
          className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => handleDealClick(deal.id)}
        >
          <CardContent className="p-0">
            <div className="flex h-28 sm:h-32">
              <div className="relative w-32 h-full">
                <img 
                  src={deal.image} 
                  alt={deal.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2">
                  <span className="deal-badge animate-pulse-light">{deal.discount}</span>
                </div>
              </div>
              <div className="flex-1 p-3 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-base line-clamp-1">{deal.name}</h3>
                  <p className="text-xs text-muted-foreground">{deal.platform}</p>
                </div>

                <div className="flex justify-between items-end mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">{deal.rating}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs line-through text-muted-foreground">${deal.originalPrice}</p>
                    <p className="text-base font-bold price-drop">${deal.dealPrice}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeaturedDeals;
