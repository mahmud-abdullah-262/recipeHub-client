import { getRecipeByAuthorID } from '@/lib/action/getRecipeByAuthorID';
import { getSessionData } from '@/lib/action/getSession';
import { Table, Button } from '@heroui/react';
import { Pencil, TrashBin } from '@gravity-ui/icons';
import Image from 'next/image';
import React from 'react';
import MyRecipes from '@/app/components/MyRecipes';

 
  
const myRecipesPage =  async () => {
  const user = await getSessionData()
  const recipes = await getRecipeByAuthorID(`/api/recipe/authorId?authorId=${user.id}`)
 
 
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