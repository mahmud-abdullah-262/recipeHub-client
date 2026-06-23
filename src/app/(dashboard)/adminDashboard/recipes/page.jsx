import React from 'react';
import AdminRecipes from './AdminRecipes';
import { serverFetch } from '@/lib/action/core/serverFetch';
import { getSessionData } from '@/lib/action/getSession';

const page = async () => {
  const recipes = await serverFetch('/api/recipes');
  const user = await getSessionData()
  return (
    <div>
      <AdminRecipes recipes={recipes} user={user} > </AdminRecipes>
    </div>
  );
};

export default page;