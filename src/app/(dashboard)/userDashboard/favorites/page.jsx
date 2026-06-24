import { getFavoriteRecipes } from '@/lib/action/getFavoriteRecipes';
import { getSessionData } from '@/lib/action/getSession';
import React from 'react';
import {Button, Table} from "@heroui/react";
import { HeartCrack } from 'lucide-react';
import {CircleArrowRight} from '@gravity-ui/icons';

import Link from 'next/link';
import { TrashBin } from '@gravity-ui/icons';
import { deleteFavoriteRecipe } from '@/lib/action/deleteFavoriteRecipe';
import FavoriteRecipesClient from '@/app/components/FavoriteRecipes';

const favoritesPage = async () => {
  const user = await getSessionData()
  const userId = user.id;
  const favoriteRecipes = await getFavoriteRecipes(`/app/myFavorites?userId=${userId}`)
  console.log(user, 'favorite recipes')
  if(favoriteRecipes.length == 0){{
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-gray-100 dark:border-zinc-800 transition-all">
        
        {/* Lucide Icon Container */}
        <div className="w-20 h-20 bg-red-50 dark:bg-red-950/30 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <HeartCrack size={40} strokeWidth={1.5} />
        </div>

        {/* Text Content */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-zinc-100 mb-3">
          No Favorite Recipes Yet
        </h2>
        <p className="text-gray-500 dark:text-zinc-400 mb-8 max-w-sm text-sm leading-relaxed">
          Your favorites list is currently empty. Explore our collection of delicious recipes and save the ones you love!
        </p>

        {/* Gravity UI Action Button */}
        <Link href="/recipes" className="inline-block decoration-none">
          <Button 
            view="action" 
            size="xl" 
            className="rounded-xl px-8 font-medium shadow-lg shadow-red-500/10 bg-primary"
          >
            Browse Recipes
          </Button>
        </Link>
        
      </div>
    </div>
    )
  }}

  return (
    <div className='p-4'>
          <div className='mb-6 space-y-1'>
            <h1 className='text-2xl md:text-3xl lg:text-4xl text-primary font-extralight'>My Favorite Recipes</h1>
          <p className='text-sm font-bold text-secondary'>What I want to make someday</p>
          </div>
     <FavoriteRecipesClient favoriteRecipes={favoriteRecipes} > </FavoriteRecipesClient>
        </div>
  );
};

export default favoritesPage;