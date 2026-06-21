import { PostRecipe } from '@/app/components/PostRecipe';
import React from 'react';

const addRecipePage = () => {
  return (
    <div className=' p-4'>
      <div className='mb-6 space-y-1'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl text-primary font-extralight'>Post A recipe</h1>
      <p className='text-sm font-bold text-secondary'>Post Your Best Recipe for RecipeHub</p>
      </div>
      
      <PostRecipe></PostRecipe>
    </div>
  );
};

export default addRecipePage;