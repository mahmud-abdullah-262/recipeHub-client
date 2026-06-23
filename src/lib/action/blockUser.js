import { serverMutate } from "./core/serverMutate";

export const blockUser = async (path, data, method) =>{
  return await serverMutate(path, data, method)
}