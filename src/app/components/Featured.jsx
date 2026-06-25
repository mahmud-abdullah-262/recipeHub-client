'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RecipeCardFeatured from './RecipeCardFeatured';

const Featured = ({ recipes = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  // স্ক্রিন সাইজ অনুযায়ী কয়টি কার্ড দেখাবে তা নির্ধারণ (রিলিজিলিয়েন্ট রেসপন্সিভনেস)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);  // মোবাইল স্ক্রিনে ১টি
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);  // ট্যাবলেটে ২টি
      } else {
        setVisibleCount(3);  // বড় স্ক্রিনে ৩টি
      }
    };

    handleResize(); // ইনিশিয়াল চেক
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // অটো-স্লাইড অ্যানিমেশন টাইমার (প্রতি ৩ সেকেন্ড পরপর চেঞ্জ হবে)
  useEffect(() => {
    if (recipes.length <= visibleCount) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % recipes.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [recipes.length, visibleCount]);

  // সার্কুলার অ্যারে স্লাইসিং (যাতে লুপ চলতেই থাকে)
  const getVisibleRecipes = () => {
    if (recipes.length === 0) return [];
    const visibleItems = [];
    for (let i = 0; i < visibleCount; i++) {
      visibleItems.push(recipes[(currentIndex + i) % recipes.length]);
    }
    return visibleItems;
  };

  if (!recipes || recipes.length === 0) return null;

  return (
    <div className="w-full py-10 overflow-hidden bg-gradient-to-b from-transparent to-amber-50/20">
      
      {/* আকর্ষনীয় সেকশন টাইটেল */}
      <div className="text-center mb-10 space-y-2">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary"
        >
          Featured Recipes
        </motion.h2>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "80px" }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="h-1 bg-amber-500 mx-auto rounded-full"
        />
      </div>

      {/* ক্যারোজেল কন্টেইনার */}
      <div className="max-w-7xl mx-auto px-4 relative">
        <div 
          className="grid gap-6"
          style={{
            gridTemplateColumns: `repeat(${visibleCount}, minmax(0, 1fr))`
          }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {getVisibleRecipes().map((recipe, index) => (
              <motion.div
                // কি (key) হিসেবে ইন্ডেক্স এবং আইডি মিক্স করা হয়েছে পারফেক্ট অ্যানিমেশনের জন্য
                key={`${recipe._id}-${currentIndex}-${index}`}
                layout
                initial={{ opacity: 0, x: 100 }} // ডান দিক থেকে ঢুকবে
                animate={{ opacity: 1, x: 0 }}    // মাঝখানে থাকবে
                exit={{ opacity: 0, x: -100 }}   // বাম দিকে বের হয়ে যাবে
                transition={{ 
  ease: "easeInOut", // মসৃণভাবে শুরু ও শেষ হবে
  duration: 0.8     // অ্যানিমেশনটি সম্পন্ন হতে ০.৮ সেকেন্ড সময় নেবে (যত বাড়াবেন তত আস্তে ও স্মুদ হবে)
}}
                className="w-full h-full"
              >
                <div className="hover:scale-[1.02] transition-transform duration-300 h-full">
                  <RecipeCardFeatured recipe={recipe} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Featured;