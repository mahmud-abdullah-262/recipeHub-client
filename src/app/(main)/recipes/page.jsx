import { serverFetch } from '@/lib/action/core/serverFetch';
import { Button } from '@heroui/react';
import Link from 'next/link';
import React from 'react';

const RecipesPage = async () => {
  const recipes = await serverFetch('/api/recipes')
  console.log(recipes, 'recipe form server')
  return (
    <div>
      <h1>Browse Recipes</h1>
        {recipes.map( recipe => 
        <>
        <h1 className='text-primary' key={recipe._id}>{recipe.recipeName}</h1>
        <Link href={`/recipes/${recipe._id}`}>
        <Button>Details</Button>
        </Link>
        
        </>

        )}
    </div>
  );
};

export default RecipesPage;