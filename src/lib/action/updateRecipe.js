import { serverMutate } from "./core/serverMutate";

export const updateRecipe = async (path, data, method ) =>{
  return await serverMutate(path, data, method )
}