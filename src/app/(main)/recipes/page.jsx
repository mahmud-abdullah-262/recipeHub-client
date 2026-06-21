import RecipeCard from '@/app/components/RecipeCard';
import { serverFetch } from '@/lib/action/core/serverFetch';
import { Button, Card } from '@heroui/react';
import Link from 'next/link';
import React from 'react';


const RecipesPage = async () => {
  const recipes = await serverFetch('/api/recipes')
  console.log(recipes, 'recipe form server')
  return (
    <div className='w-11/12 mx-auto'>
       <div className='mb-6 space-y-1'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl text-primary font-extralight'>Browse Recipes</h1>
      <p className='text-sm font-bold text-secondary'>Best Recipe for Your Next Meal!</p>
      </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
  {recipes.map( recipe => 
        <div key={recipe._id}>
           <RecipeCard recipe={recipe}></RecipeCard>
        </div>
        )}
        </div>
      

        
    </div>
  );
};

export default RecipesPage;