import { serverMutate } from "./core/serverMutate";

export const makeLiked = async (path, data) =>{
  return await serverMutate(path, data)
}