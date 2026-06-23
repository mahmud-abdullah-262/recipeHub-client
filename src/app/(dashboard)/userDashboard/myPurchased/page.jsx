import { getPurchased } from '@/lib/action/getPurchased';
import { getSessionData } from '@/lib/action/getSession';
import { Table } from '@heroui/react';
import {CircleArrowRight} from '@gravity-ui/icons';
import Link from 'next/link';
import React from 'react';

const myPurchasedPage = async () => {
  const user = await getSessionData()
  const purchased = await getPurchased(`/api/purchased?email=${user.email}`)
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