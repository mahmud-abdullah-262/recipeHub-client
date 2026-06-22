import { serverMutate } from "./core/serverMutate";

export const updateProfile = async (path, data, method ) =>{
  return await serverMutate(path, data, method )
}