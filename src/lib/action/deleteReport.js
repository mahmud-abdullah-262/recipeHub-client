import { serverMutate } from "./core/serverMutate";

export const deleteReport = async (path, data, method) =>{
  console.log(data, 'report before upload')
  return await serverMutate(path, data, method)
}