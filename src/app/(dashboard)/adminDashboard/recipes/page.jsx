import React from 'react';
import AdminRecipes from './AdminRecipes';
import { serverFetch } from '@/lib/action/core/serverFetch';
import { getSessionData } from '@/lib/action/getSession';
import { AlertCircle } from 'lucide-react';
import RecipeList from '@/app/components/RecipeList';

const page = async ({searchParams}) => {
  const user = await getSessionData()
  // searchParams-কে await করতে হবে (Next.js 15+ নিয়মানুযায়ী)
        const resolvedSearchParams = await searchParams;
        
        // URL থেকে page এবং size নেওয়া, না থাকলে ডিফল্ট মান ১ এবং ১০
        const page = resolvedSearchParams.page || '1';
        const size = 6;
        
        // সামনে ফিল্টারিং এর জন্য সার্চ বা ক্যাটাগরিও এখান থেকে নিতে পারবেন
        const category = resolvedSearchParams.category || ''; 
      
        // ব্যাকএন্ড API-তে কুয়েরি প্যারামিটারসহ হিট করা
        const recipeData = await serverFetch(`/api/recipes?page=${page}&size=${size}&category=${category}`);
       
        const recipes = recipeData?.recipes || [];
        const totalData = recipeData?.totalRecipes || 0;
       console.log(recipeData, recipes, totalData, 'data from recipe page')

  if(recipes.length == 0){
    return (
       <div className="max-w-md mx-auto mt-20 p-8 bg-white border border-slate-200 rounded-2xl text-center shadow-sm space-y-4">
        <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle size={24} />
        </div>
        <div>
          <h3 className="text-slate-800 font-semibold text-lg">No Recipe Found</h3>
          <p className="text-slate-500 text-sm mt-1">There are currently no active Recipe  available.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <AdminRecipes recipes={recipes} user={user} > </AdminRecipes>
       <RecipeList 
          totalData={totalData} 
          currentPage={parseInt(page)} 
          size={parseInt(size)} 
        />
    </div>
  );
};

export default page;