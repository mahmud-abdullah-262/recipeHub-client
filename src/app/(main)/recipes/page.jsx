import CategoryFilter from '@/app/components/CateogryFilter';
import RecipeCard from '@/app/components/RecipeCard';
import RecipeList from '@/app/components/RecipeList';
import { serverFetch } from '@/lib/action/core/serverFetch';

import React from 'react';






// searchParams রিসিভ করা হচ্ছে (Next.js App Router-এর ডিফল্ট ফিচার)
const RecipesPage = async ({ searchParams }) => {
  // searchParams-কে await করতে হবে (Next.js 15+ নিয়মানুযায়ী)
  const resolvedSearchParams = await searchParams;
  
  // URL থেকে page এবং size নেওয়া, না থাকলে ডিফল্ট মান ১ এবং ১০
  const page = resolvedSearchParams.page || '1';
  const size = 6;
  
  // সামনে ফিল্টারিং এর জন্য সার্চ বা ক্যাটাগরিও এখান থেকে নিতে পারবেন
  const category = resolvedSearchParams.category || ''; 

  // ব্যাকএন্ড API-তে কুয়েরি প্যারামিটারসহ হিট করা
  const data = await serverFetch(`/api/recipes?page=${page}&size=${size}&category=${category}`);
  
  const recipes = data?.recipes || [];
  const totalData = data?.totalRecipes || 0;

  return (
    <div className='w-11/12 mx-auto'>

      <div className='text-center md:text-left flex flex-col md:flex-row justify-between items-center mb-6'>
       <div className='mb-6 space-y-1'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl text-primary font-extralight'>Browse Recipes</h1>
        <p className='text-sm font-bold text-secondary'>Best Recipe for Your Next Meal!</p>
        <h1>Total Recipe found: {totalData}</h1>
      </div> 

     <CategoryFilter category={category}></CategoryFilter>

      </div>
      

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {recipes.map(recipe => (
          <div key={recipe._id}>
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
      
      {/* ক্লায়েন্ট কম্পোনেন্টে প্রয়োজনীয় প্রপসগুলো পাস করে দেওয়া */}
      <div className='mt-8'>
        <RecipeList 
          totalData={totalData} 
          currentPage={parseInt(page)} 
          size={parseInt(size)} 
        />
      </div>
    </div>
  );
};

export default RecipesPage;