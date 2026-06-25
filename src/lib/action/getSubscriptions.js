
import { protectedFetch } from "./core/serverFetch"

export const getSubscriptions = async (path) => {
  return await protectedFetch(path)

}