
import { protectedFetch } from '@/lib/action/core/serverFetch';
import React from 'react';

const RecipeDetailsPage = async ({params}) => {
  const {id} = await params
  const recipe = await protectedFetch(`/api/recipes/${id}`)
  return (
    <div>
      <h1>{recipe.recipeName}</h1>
    </div>
  );
};

export default RecipeDetailsPage;