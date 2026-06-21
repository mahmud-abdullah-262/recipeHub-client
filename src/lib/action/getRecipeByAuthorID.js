'use server'

import { protectedFetch } from "./core/serverFetch"

export const getRecipeByAuthorID = async (path) => {
  return await protectedFetch(path)

}