import { serverMutate } from "./core/serverMutate";

export const postSubs = async (path, data) =>{
  return await serverMutate(path, data)
}