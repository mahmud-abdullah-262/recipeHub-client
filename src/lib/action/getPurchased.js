
import { protectedFetch } from "./core/serverFetch"

export const getPurchased = async (path) => {
  return await protectedFetch(path)

}