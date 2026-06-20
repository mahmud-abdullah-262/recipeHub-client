import { serverMutate } from "./core/serverMutate";

export const postRecipe = async (newRecipe) =>{
  return await serverMutate('/api/recipes', newRecipe)
}