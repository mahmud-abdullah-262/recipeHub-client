import { getFavoriteRecipes } from '@/lib/action/getFavoriteRecipes';
import { getSessionData } from '@/lib/action/getSession';
import React from 'react';
import {Button, Table} from "@heroui/react";
import { ArrowUpRightFromSquare } from 'lucide-react';
import Link from 'next/link';
import { TrashBin } from '@gravity-ui/icons';

const favoritesPage = async () => {
  const user = await getSessionData()
  const userId = user.id;
  const favoriteRecipes = await getFavoriteRecipes(`/app/myFavorites?userId=${userId}`)
  console.log(user, 'favorite recipes')
  return (
    <div className='p-4'>
          <div className='mb-6 space-y-1'>
            <h1 className='text-2xl md:text-3xl lg:text-4xl text-primary font-extralight'>My Favorite Recipes</h1>
          <p className='text-sm font-bold text-secondary'>What I want to make someday</p>
          </div>
      <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Team members" className="min-w-[600px]">
          <Table.Header >
            <Table.Column className={'text-primary'} isRowHeader>Recipe Name</Table.Column>
            <Table.Column className={'text-primary'} >Cuisine Type</Table.Column>
            <Table.Column className={'text-primary'} >Difficulty Level</Table.Column>
            <Table.Column className={'text-primary'} >Author Name</Table.Column>
            <Table.Column className={'text-primary'} >Actions</Table.Column>
          </Table.Header>
          <Table.Body>

 {favoriteRecipes.map(recipe =>
      <Table.Row key={recipe._id}>
              <Table.Cell>{recipe.recipeName}</Table.Cell>
              <Table.Cell>{recipe.cuisineType}</Table.Cell>
              <Table.Cell>{recipe.difficultyLevel}</Table.Cell>
              <Table.Cell>{recipe.authorName}</Table.Cell>
              <Table.Cell>
                
                <Link href={`/recipes/${recipe.recipeId}`}><ArrowUpRightFromSquare/></Link> 
                
                 <Button 
                      isIconOnly 
                      variant="light" 
                      color="danger" 
                      aria-label="Delete recipe"
                      // onClick={async() => 
                        
                      //  await deleteRecipe(recipe._id)
                       
                      // }
                    >
                      <TrashBin width={16} height={16} style={{ color: '#e53935' }} />
                    </Button>
                </Table.Cell>
            </Table.Row>
        
       )}


      

           
           
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
        </div>
  );
};

export default favoritesPage;