'use client'
import React from 'react';
import { Table, Button } from '@heroui/react';
// Gravity UI Icons (প্রজেক্টে @gravity-ui/icons ইনস্টল করা থাকতে হবে)
import { Pencil, TrashBin } from '@gravity-ui/icons';
import Image from 'next/image';
import { EditRecipe } from './EditRecipe';
import { deleteRecipe } from '@/lib/action/deleteRecipe';

export default function MyRecipes({recipes, user}) {
 
  console.log(recipes, 'recipe form my recipe')

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Recipe management table">
          <Table.Header>
            <Table.Column allowsSorting>
              {({ sortDirection }) => (
                <Table.SortableColumnHeader >
                  Recipe Name
                </Table.SortableColumnHeader>
              )}
            </Table.Column>
            <Table.Column>Category</Table.Column>
            <Table.Column>Cuisine</Table.Column>
            <Table.Column>Difficulty</Table.Column>
            <Table.Column>Prep Time</Table.Column>
            <Table.Column>Author</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column align="center">Actions</Table.Column>
          </Table.Header>
          
          <Table.Body>
            {recipes.map((recipe) => (
              <Table.Row key={recipe._id}>
                <Table.Cell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                     <Image
                                          src={recipe.recipeImage} 
                                          alt={recipe.recipeName} 
                                          width={400}
                                          height={400}
                                          className='w-10 h-10 rounded-2xl object-cover'
                                          
                                        />
                    <div>
                      <div style={{ fontWeight: 'bold' }}>{recipe.recipeName}</div>
                      <div style={{ fontSize: '12px', color: 'gray' }}>{recipe.likesCount} Likes</div>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>{recipe.category}</Table.Cell>
                <Table.Cell>{recipe.cuisineType}</Table.Cell>
                <Table.Cell>{recipe.difficultyLevel}</Table.Cell>
                <Table.Cell>{recipe.preparationTime} mins</Table.Cell>
                <Table.Cell>
                  <div>
                    <div>{recipe.authorName}</div>
                    <div style={{ fontSize: '12px', color: 'gray' }}>{recipe.authorEmail}</div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '12px', 
                    backgroundColor: recipe.status === 'published' ? '#e6f4ea' : '#f1f3f4',
                    color: recipe.status === 'published' ? '#137333' : '#3c4043',
                    fontSize: '12px',
                    textTransform: 'capitalize'
                  }}>
                    {recipe.status}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    {/* Edit Button */}
                    <EditRecipe recipe={recipe} user={user}></EditRecipe>
                    
                    {/* Delete Button */}
                    <Button 
                      isIconOnly 
                      variant="light" 
                      color="danger" 
                      aria-label="Delete recipe"
                      onClick={async() => 
                        
                       await deleteRecipe(recipe._id)
                      }
                    >
                      <TrashBin width={16} height={16} style={{ color: '#e53935' }} />
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
      <Table.Footer></Table.Footer>
    </Table>
  );
}