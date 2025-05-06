
import React from 'react';
import { Outlet } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <header className="sticky top-0 z-10 bg-white shadow-sm p-4">
        <div className="container flex justify-between items-center">
          <a href="/" className="flex items-center gap-2">
            <span className="font-heading font-bold text-xl text-tomato">FoodDeals</span>
          </a>
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
