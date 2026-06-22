import { protectedFetch } from "./core/serverFetch"

export const getFavoriteRecipes = async (path) => {
  return await protectedFetch(path)

}