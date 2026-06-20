import { PostRecipe } from '@/app/components/PostRecipe';
import React from 'react';

const addRecipePage = () => {
  return (
    <div>
      <h1 className='text-2xl md:text-3xl lg:text-4xl text-primary font-extralight'>Post A recipe</h1>
      <PostRecipe></PostRecipe>
    </div>
  );
};

export default addRecipePage;