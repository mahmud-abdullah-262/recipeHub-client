import { getMostLiked } from '@/lib/action/getMostLiked';
import React from 'react';

const MostLiked = async () => {
  const recipes = await getMostLiked('/api/mostLiked')
  return (
    <div>
      <h1>Most Liked recipes: {recipes.length}</h1>
    </div>
  );
};

export default MostLiked;