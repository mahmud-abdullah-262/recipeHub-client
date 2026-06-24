import { getPurchased } from '@/lib/action/getPurchased';
import { getSessionData } from '@/lib/action/getSession';
import { Button, Table } from '@heroui/react';
import {CircleArrowRight} from '@gravity-ui/icons';

import Link from 'next/link';
import React from 'react';
import { HeartCrack } from 'lucide-react';

const myPurchasedPage = async () => {
  const user = await getSessionData()
  const purchased = await getPurchased(`/api/purchased?email=${user.email}`)


  if(purchased.length == 0){{
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-gray-100 dark:border-zinc-800 transition-all">
        
        {/* Lucide Icon Container */}
        <div className="w-20 h-20 bg-red-50 dark:bg-red-950/30 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <HeartCrack size={40} strokeWidth={1.5} />
        </div>

        {/* Text Content */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-zinc-100 mb-3">
          No Purchased Recipes Yet
        </h2>
        <p className="text-gray-500 dark:text-zinc-400 mb-8 max-w-sm text-sm leading-relaxed">
          Your Purchased list is currently empty. Explore our collection of delicious recipes and save the ones you love!
        </p>

        {/* Gravity UI Action Button */}
        <Link href="/recipes" className="inline-block decoration-none">
          <Button 
            view="action" 
            size="xl" 
            className="rounded-xl px-8 font-medium shadow-lg shadow-red-500/10 bg-primary"
          >
            Browse Recipes
          </Button>
        </Link>
        
      </div>
    </div>
    )
  }}


  return (
    <div>
       <div className='mb-6 space-y-1'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl text-primary font-extralight'>My purchased Recipes</h1>
      <p className='text-sm font-bold text-secondary'>Recipe Management Table</p>
      </div>

     <Table variant="secondary">
      <Table.ScrollContainer>
        <Table.Content aria-label="Team members" className="min-w-[600px]">
          <Table.Header>
            <Table.Column isRowHeader>Recipe Name</Table.Column>
            <Table.Column>User Email</Table.Column>
            <Table.Column>Details</Table.Column>
           
          </Table.Header>
          <Table.Body>

{purchased.map(recipe =>     
<Table.Row key={recipe._id}>
              <Table.Cell>{recipe.recipeName}</Table.Cell>
              <Table.Cell>{recipe.customerEmail}</Table.Cell>
              <Table.Cell><Link href={`/recipes/${recipe.recipeId}`}> <CircleArrowRight/> </Link></Table.Cell>
              
            </Table.Row> )}

       


          
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>

      


    </div>
  


  );
};

export default myPurchasedPage;