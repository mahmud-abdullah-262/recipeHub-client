import React from 'react';
import AdminRecipes from './AdminRecipes';
import { serverFetch } from '@/lib/action/core/serverFetch';
import { getSessionData } from '@/lib/action/getSession';
import { AlertCircle } from 'lucide-react';

const page = async () => {
  const data = await serverFetch('/api/recipes');
  const recipes = data?.recipes
  const user = await getSessionData()

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
    </div>
  );
};

export default page;