'use client'
import { deleteFavoriteRecipe } from '@/lib/action/deleteFavoriteRecipe';
import { CircleArrowRight, TrashBin } from '@gravity-ui/icons';
import { Button, Table } from '@heroui/react';
import Link from 'next/link';
import React from 'react';

const FavoriteRecipesClient = ({favoriteRecipes}) => {
  return (
    <div>
       <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Team members" className="min-w-[600px]">
          <Table.Header >
            <Table.Column className={'text-primary'} isRowHeader>Recipe Name</Table.Column>
            <Table.Column className={'text-primary'} >Cuisine Type</Table.Column>
            <Table.Column className={'text-primary'} >Difficulty Level</Table.Column>
            <Table.Column className={'text-primary'} >Author Name</Table.Column>
            <Table.Column className={'text-primary'} >Details | Delete</Table.Column>
          </Table.Header>
          <Table.Body>

 {favoriteRecipes.map(recipe =>
      <Table.Row key={recipe._id}>
              <Table.Cell>{recipe.recipeName}</Table.Cell>
              <Table.Cell>{recipe.cuisineType}</Table.Cell>
              <Table.Cell>{recipe.difficultyLevel}</Table.Cell>
              <Table.Cell>{recipe.authorName}</Table.Cell>
              <Table.Cell className={'flex gap-6 items-center justify-start'}>
                
                <Link href={`/recipes/${recipe.recipeId}`}><CircleArrowRight/></Link> 
                
                 <Button 
                      isIconOnly 
                      variant="light" 
                      color="danger" 
                      aria-label="Delete recipe"
                      onClick={async() => 
                        
                       await deleteFavoriteRecipe(recipe._id)
                       
                      }
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

export default FavoriteRecipesClient;