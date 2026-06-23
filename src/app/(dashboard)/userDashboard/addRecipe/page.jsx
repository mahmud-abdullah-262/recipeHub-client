import { PostRecipe } from '@/app/components/PostRecipe';
import { getPlan } from '@/lib/action/getPlanData';
import { getRecipeByAuthorID } from '@/lib/action/getRecipeByAuthorID';
import { getSessionData } from '@/lib/action/getSession';
import React from 'react';

const addRecipePage = async() => {
  const user = await getSessionData()
  const usersAppliedRecipes = await getRecipeByAuthorID(`/api/recipe/authorId?authorId=${user.id}`)
  const data = await getPlan(`/api/plans?planId=${user.plan}`)
  const plan = data.find(plan => plan.planId == user.plan)
  console.log(plan, 'plan from user id')
  if(usersAppliedRecipes.length >= plan.maxRecipePost){
    return (
      <div>
        <h1>You are a free user. You already posted 2 Recipes</h1>

      </div>
    )
  }

  return (
    <div className=' p-4'>
      <div className='mb-6 space-y-1'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl text-primary font-extralight'>Post A recipe</h1>
      <p className='text-sm font-bold text-secondary'>Post Your Best Recipe for RecipeHub</p>
      <p className='text-sm font-light text-secondary'>You are a {user.plan} user. you can post {plan.maxRecipePost <= 2 ? plan.maxRecipePost : 'unlimited'} recipes.</p>
      </div>
      
      <PostRecipe></PostRecipe>
    </div>
  );
};

export default addRecipePage;