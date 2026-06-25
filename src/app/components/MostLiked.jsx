'use client'
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
// Lucide React থেকে প্রয়োজনীয় আইকনগুলো ইম্পোর্ট করা হয়েছে
import { Clock, Flame, Heart, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const MostLiked = ({ recipes }) => {
  if (!recipes || recipes.length === 0) return null;

  const mainRecipe = recipes[0];   // মাঝখানের বড় কার্ড (৫ রো)
  const card1 = recipes[1];        // ওপরের বামের কার্ড (৩ রো)
  const card2 = recipes[2];        // নিচের বামের কার্ড (৩ রো - ইমেজ ছাড়া)
  const card3 = recipes[3];        // ওপরের ডানের কার্ড (৩ রো)
  const card4 = recipes[4];        // নিচের ডানের কার্ড (৩ রো)

  // Difficulty লেভেলের ওপর ভিত্তি করে ব্যাজের কালার রিটার্ন করার হেল্পার ফাংশন
  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'easy': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'medium': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'hard': return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 bg-background text-foreground">
      {/* সেকশন টাইটেল */}
      <div className="text-center mb-10 space-y-2">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary"
        >
          Our Most Liked Recipes
        </motion.h2>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="h-1 bg-amber-500 mx-auto rounded-full"
        />
      </div>

      {/* কার্ডের অতিরিক্ত লম্বা ভাব কমাতে হাইট md:h-[680px] করা হয়েছে */}
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 md:grid-rows-6 gap-5 md:h-170">
        
        {/* ================= CARD 1 (ওপরের বামে - ৩ রো) ================= */}
        {card1 && (
          <Link 
            href={`/recipes/${card1._id}`}
            className="group relative bg-card hover:bg-amber-500/10 rounded-2xl p-5 border border-border overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-lg md:row-span-3"
          >
            <div className="space-y-2 z-10">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">{card1.category}</span>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${getDifficultyColor(card1.difficultyLevel)}`}>
                  {card1.difficultyLevel}
                </span>
              </div>
              <h3 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-1">{card1.recipeName}</h3>
              <p className="text-xs text-muted-foreground">by {card1.authorName}</p>
              
              <div className="flex items-center gap-3 pt-1 text-xs text-muted-foreground/80">
                <span className="flex items-center gap-1"><Clock size={13} /> {card1.preparationTime}m</span>
                <span className="flex items-center gap-1 text-rose-500"><Heart size={13} fill="currentColor" /> {card1.likesCount || 0}</span>
              </div>
            </div>
            
            <div className="absolute bottom-0 right-0 w-1/2 h-[50%] overflow-hidden rounded-tl-2xl border-t border-l border-border/50">
              <Image
                src={card1.recipeImage || "https://images.unsplash.com/photo-1633945274405-b6c8069047b0"} 
                alt={card1.recipeName}
                width={500}
                height={500}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>
        )}

        {/* ================= MAIN CARD (মাঝখানের বড় কার্ড - ৫ রো) ================= */}
        {mainRecipe && (
          <Link 
            href={`/recipes/${mainRecipe._id}`}
            className="group relative bg-zinc-900 text-white rounded-2xl p-5 overflow-hidden flex flex-col justify-between md:row-span-5 transition-all duration-300 hover:shadow-xl border border-zinc-800"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/70 pointer-events-none z-10" />
            
            <div className="space-y-3 relative z-20">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full">{mainRecipe.category}</span>
                <span className="text-xs text-zinc-400 bg-zinc-800 px-2.5 py-1 rounded-full border border-zinc-700/50">{mainRecipe.cuisineType}</span>
              </div>
              <h3 className="text-2xl font-black tracking-tight group-hover:text-amber-400 transition-colors">{mainRecipe.recipeName}</h3>
              <p className="text-xs text-zinc-300 line-clamp-2 max-w-[95%] font-light">
                An authentic dish crafted beautifully by {mainRecipe.authorName}. Perfect blend of premium ingredients and traditional taste.
              </p>
              
              <div className="flex items-center gap-4 text-xs font-medium text-zinc-300 pt-1">
                <span className="flex items-center gap-1 bg-zinc-800/80 px-2 py-1 rounded-md"><Clock size={14} className="text-amber-400" /> {mainRecipe.preparationTime} Mins</span>
                <span className="flex items-center gap-1 bg-zinc-800/80 px-2 py-1 rounded-md"><Flame size={14} className="text-orange-400" /> {mainRecipe.difficultyLevel}</span>
                <span className="flex items-center gap-1 bg-rose-500/20 text-rose-400 px-2 py-1 rounded-md"><Heart size={14} fill="currentColor" /> {mainRecipe.likesCount || 0}</span>
              </div>
            </div>

            <div className="relative z-10 w-full h-[45%] mt-4 overflow-hidden rounded-xl border border-zinc-800">
              <img 
                src={mainRecipe.recipeImage || "https://images.unsplash.com/photo-1633945274405-b6c8069047b0"} 
                alt={mainRecipe.recipeName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>
        )}

        {/* ================= CARD 3 (ওপরের ডানে - ৩ রো) ================= */}
        {card3 && (
          <Link 
            href={`/recipes/${card3._id}`}
            className="group relative bg-card hover:bg-amber-500/10 rounded-2xl p-5 border border-border overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-lg md:row-span-3 hidden md:flex"
          >
            <div className="space-y-2 z-10">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">{card3.category}</span>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${getDifficultyColor(card3.difficultyLevel)}`}>
                  {card3.difficultyLevel}
                </span>
              </div>
              <h3 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-1">{card3.recipeName}</h3>
              <p className="text-xs text-muted-foreground">by {card3.authorName}</p>
              
              <div className="flex items-center gap-3 pt-1 text-xs text-muted-foreground/80">
                <span className="flex items-center gap-1"><Clock size={13} /> {card3.preparationTime}m</span>
                <span className="flex items-center gap-1 text-rose-500"><Heart size={13} fill="currentColor" /> {card3.likesCount || 0}</span>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-1/2 h-[50%] overflow-hidden rounded-tl-2xl border-t border-l border-border/50">
              <img 
                src={card3.recipeImage || "https://images.unsplash.com/photo-1633945274405-b6c8069047b0"} 
                alt={card3.recipeName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>
        )}

        {/* ================= CARD 2 (নিচের বামে - ৩ রো, নো ইমেজ) ================= */}
        {card2 && (
          <Link 
            href={`/recipes/${card2._id}`}
            className="group bg-cardhover:bg-amber-500/10 rounded-2xl p-5 border border-border flex flex-col justify-between transition-all duration-300 hover:shadow-lg md:row-span-3 hidden md:flex"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">{card2.category}</span>
                <span className="text-[10px] text-background bg-primary px-2 py-0.5 rounded-full">{card2.cuisineType}</span>
              </div>
              <h3 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-1">{card2.recipeName}</h3>
              <p className="text-xs text-muted-foreground font-light line-clamp-3">
                Ingredients: {card2.ingredients?.slice(0, 5).join(', ')}... A must try for food lovers.
              </p>
            </div>
            
            <div className="flex items-center justify-between pt-2 border-t border-border text-xs text-muted-foreground/80">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><Clock size={13} /> {card2.preparationTime}m</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium border ${getDifficultyColor(card2.difficultyLevel)}`}>{card2.difficultyLevel}</span>
              </div>
              <span className="flex items-center gap-1 text-rose-500 font-medium"><Heart size={13} fill="currentColor" /> {card2.likesCount || 0}</span>
            </div>
          </Link>
        )}

        {/* ================= CARD 4 (নিচের ডানে - ৩ রো) ================= */}
        {card4 && (
          <Link 
            href={`/recipes/${card4._id}`}
            className="group relative bg-card hover:bg-amber-500/10 rounded-2xl p-5 border border-border overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-lg md:row-span-3 hidden md:flex"
          >
            <div className="space-y-2 z-10">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">{card4.category}</span>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${getDifficultyColor(card4.difficultyLevel)}`}>
                  {card4.difficultyLevel}
                </span>
              </div>
              <h3 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-1">{card4.recipeName}</h3>
              <p className="text-xs text-muted-foreground">by {card4.authorName}</p>
              
              <div className="flex items-center gap-3 pt-1 text-xs text-muted-foreground/80">
                <span className="flex items-center gap-1"><Clock size={13} /> {card4.preparationTime}m</span>
                <span className="flex items-center gap-1 text-rose-500"><Heart size={13} fill="currentColor" /> {card4.likesCount || 0}</span>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-1/2 h-[50%] overflow-hidden rounded-tl-2xl border-t border-l border-border/50">
              <Image
                src={card4.recipeImage || "https://images.unsplash.com/photo-1633945274405-b6c8069047b0"} 
                alt={card4.recipeName}
                width={500}
                height={500}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>
        )}

        {/* ================= DUMMY TEXT CARD (৬ষ্ঠ রো) ================= */}
        <div className="bg-amber-500/5 hover:bg-amber-500/10 border border-amber-500/10 rounded-2xl px-4 flex items-center justify-between text-left md:row-span-1 hidden md:flex transition-colors group/dummy cursor-pointer">
          <p className="text-xs font-semibold text-amber-600 dark:text-amber-500 tracking-wide uppercase">
             Explore 50+ Premium Chef Recipes
          </p>
          <Link href={'/recipes'}>
           <ChevronRight size={16} className="text-amber-500 transform group-hover/dummy:translate-x-1 transition-transform" />
          </Link>
         
        </div>

      </div>
    </section>
  );
};

export default MostLiked;