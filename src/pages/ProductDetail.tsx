
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Star, Clock, ArrowLeft } from 'lucide-react';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import PriceHistoryChart from '@/components/product/PriceHistoryChart';
import PlatformComparisonCard from '@/components/product/PlatformComparisonCard';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock data
  const product = {
    id: parseInt(id || "0"),
    name: "Double Bacon Deluxe Burger",
    description: "Juicy double beef patty with crispy bacon, cheddar cheese, lettuce, tomato, and special sauce on a brioche bun.",
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-4.0.3",
    category: "Burgers",
    platforms: [
      { 
        name: "UberEats", 
        price: 15.99, 
        originalPrice: 17.99,
        deliveryTime: "15-25", 
        rating: 4.6, 
        deliveryFee: 1.99,
        discount: "11% OFF",
        priceHistory: [16.99, 17.99, 17.99, 16.99, 15.99]
      },
      { 
        name: "DoorDash", 
        price: 14.99, 
        originalPrice: 14.99,
        deliveryTime: "25-40", 
        rating: 4.2, 
        deliveryFee: 2.99,
        priceHistory: [15.99, 15.99, 14.99, 14.99, 14.99]
      },
      { 
        name: "Grubhub", 
        price: 16.49, 
        originalPrice: 18.49,
        deliveryTime: "20-35", 
        rating: 4.8, 
        deliveryFee: 0.99, 
        discount: "10% OFF",
        priceHistory: [18.49, 18.49, 17.49, 16.49, 16.49]
      },
    ],
    ingredients: ["Beef Patty", "Bacon", "Cheddar Cheese", "Lettuce", "Tomato", "Special Sauce", "Brioche Bun"],
    nutritionInfo: {
      calories: 850,
      protein: 45,
      fat: 52,
      carbs: 48
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  // Sort platforms by price
  const sortedPlatforms = [...product.platforms].sort((a, b) => a.price - b.price);
  const bestDeal = sortedPlatforms[0];

  return (
    <div className="pb-10">
      <div className="sticky top-[72px] z-10 bg-background py-2 mb-4">
        <button 
          onClick={goBack} 
          className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to results
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Image and Info */}
        <div className="md:w-1/2">
          <div className="relative rounded-lg overflow-hidden mb-4">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full aspect-[4/3] object-cover"
            />
            <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-muted">
              <Heart className="h-5 w-5 text-muted-foreground hover:text-tomato" />
            </button>
            {bestDeal.discount && (
              <div className="absolute top-3 left-3">
                <span className="deal-badge">{bestDeal.discount}</span>
              </div>
            )}
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <p className="text-muted-foreground mb-4">{product.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {product.ingredients.map((ingredient, i) => (
                <span 
                  key={i} 
                  className="text-xs bg-muted px-2 py-1 rounded-full"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <Tabs defaultValue="nutrition">
              <TabsList className="w-full">
                <TabsTrigger value="nutrition" className="flex-1">Nutrition Info</TabsTrigger>
                <TabsTrigger value="history" className="flex-1">Price History</TabsTrigger>
              </TabsList>
              <TabsContent value="nutrition" className="p-4 bg-muted rounded-b-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center p-3 bg-white rounded-lg">
                    <span className="text-muted-foreground text-xs">Calories</span>
                    <span className="text-lg font-semibold">{product.nutritionInfo.calories}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-white rounded-lg">
                    <span className="text-muted-foreground text-xs">Protein</span>
                    <span className="text-lg font-semibold">{product.nutritionInfo.protein}g</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-white rounded-lg">
                    <span className="text-muted-foreground text-xs">Fat</span>
                    <span className="text-lg font-semibold">{product.nutritionInfo.fat}g</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-white rounded-lg">
                    <span className="text-muted-foreground text-xs">Carbs</span>
                    <span className="text-lg font-semibold">{product.nutritionInfo.carbs}g</span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="history">
                <PriceHistoryChart platforms={product.platforms} />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Price Comparison */}
        <div className="md:w-1/2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Compare Prices</h2>
              
              <div className="space-y-4">
                {sortedPlatforms.map((platform, index) => (
                  <PlatformComparisonCard
                    key={platform.name}
                    platform={platform}
                    isHighlighted={index === 0}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
