import { serverMutate } from "./core/serverMutate";

export const makeFavorite = async (path, data) =>{
  return await serverMutate(path, data)
}