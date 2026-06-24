import { getRecipeByAuthorID } from '@/lib/action/getRecipeByAuthorID';
import { getSessionData } from '@/lib/action/getSession';
import { Table, Button } from '@heroui/react';
import { Pencil, TrashBin } from '@gravity-ui/icons';
import Image from 'next/image';
import React from 'react';
import MyRecipes from '@/app/components/MyRecipes';
import { HeartCrack } from 'lucide-react';
import Link from 'next/link';

 
  
const myRecipesPage =  async () => {
  const user = await getSessionData()
  const recipes = await getRecipeByAuthorID(`/api/recipe/authorId?authorId=${user.id}`)
 
  if(recipes.length == 0){{
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-gray-100 dark:border-zinc-800 transition-all">
        
        {/* Lucide Icon Container */}
        <div className="w-20 h-20 bg-red-50 dark:bg-red-950/30 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <HeartCrack size={40} strokeWidth={1.5} />
        </div>

        {/* Text Content */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-zinc-100 mb-3">
         You have no recipe yet
        </h2>
        <p className="text-gray-500 dark:text-zinc-400 mb-8 max-w-sm text-sm leading-relaxed">
          Your Recipe list is currently empty. Post Your best recipe to our users
        </p>

        {/* Gravity UI Action Button */}
        <Link href="/userDashboard/addRecipe" className="inline-block decoration-none">
          <Button 
            view="action" 
            size="xl" 
            className="rounded-xl px-8 font-medium shadow-lg shadow-red-500/10 bg-primary"
          >
            Add Recipes
          </Button>
        </Link>
        
      </div>
    </div>
    )
  }}
  return (
    <div className='p-4'>
      <div className='mb-6 space-y-1'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl text-primary font-extralight'>My Recipes</h1>
      <p className='text-sm font-bold text-secondary'>Recipe Management Table</p>
      </div>
  <MyRecipes recipes={recipes} user={user}></MyRecipes>
    </div>
  );
};

export default myRecipesPage;