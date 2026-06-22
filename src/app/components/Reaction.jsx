'use client'
import { makeFavorite } from '@/lib/action/makeFavorite';
import { ThumbsUpFill, TriangleExclamationFill } from '@gravity-ui/icons';
import { Button, toast } from '@heroui/react';
import { Heart } from 'lucide-react';
import React from 'react';

const Reaction = ({userId, recipe}) => {

   const handleFavorite = async() => {
      const favoriteRecipe = {
        ...recipe,
        userId  
      }
          try {
            const uploadData = await makeFavorite('/app/myFavorites', favoriteRecipe)
      console.log(uploadData, 'data from client');
      
            if (uploadData.success) {
              toast.success( uploadData.message || "Recipe Favorite successfully!");
            }
            else{
              toast.danger(uploadData.message)
            }
      
          } catch (error) {
            
            toast.error(error?.message || "Failed to Favorite recipe.");
          } finally {
            console.log("Submission process completed.");
          }
     }



  return (
           <div>
                  <Button
                  isIconOnly
                  variant="light"
                  className="text-muted hover:text-primary transition-colors"
                >
                  <ThumbsUpFill className="w-6 h-6 fill-primary text-primary" />
                </Button>
                  <Button
                  isIconOnly
                  onClick={handleFavorite}
                  variant="light"
                  className="text-muted hover:text-primary transition-colors"
                >
                  <Heart className="w-6 h-6 fill-primary text-primary" />
                </Button>
                <Button
                  isIconOnly
                  variant="light"
                  className="text-muted hover:text-primary transition-colors"
                >
                  <TriangleExclamationFill className="w-6 h-6 fill-primary text-primary" />
                </Button>
                </div>
  );
};

export default Reaction;