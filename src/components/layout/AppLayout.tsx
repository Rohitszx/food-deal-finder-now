
import React from 'react';
import { Outlet } from 'react-router-dom';
import { MessageCircle, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

const AppLayout = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <header className="sticky top-0 z-10 bg-white shadow-sm p-4">
        <div className="container flex justify-between items-center">
          <a href="/" className="flex items-center gap-2">
            <span className="font-heading font-bold text-xl text-tomato">FoodDeals</span>
          </a>

          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  <a href="/" className="px-2 py-1 hover:text-tomato transition-colors">Home</a>
                  <a href="/deals" className="px-2 py-1 hover:text-tomato transition-colors">Today's Deals</a>
                  <a href="#" className="px-2 py-1 hover:text-tomato transition-colors">My Favorites</a>
                  <a href="#" className="px-2 py-1 hover:text-tomato transition-colors">Compare</a>
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 pb-20">
        <Outlet />
      </main>

      {/* Chatbot FAB */}
      <div className="fixed bottom-6 right-6 z-20">
        <Button size="icon" className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg">
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Open chat assistant</span>
        </Button>
      </div>
    </div>
  );
};

export default AppLayout;
