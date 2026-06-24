import { serverMutate } from "./core/serverMutate";

export const postReport = async (path, data) =>{
  return await serverMutate(path, data)
}