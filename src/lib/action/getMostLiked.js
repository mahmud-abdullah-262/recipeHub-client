import { protectedFetch, serverFetch } from "./core/serverFetch"

export const getMostLiked = async (path) => {
  return await serverFetch(path)

}