
import { protectedFetch } from "./core/serverFetch"

export const getPurchasedData = async (path) => {
  return await protectedFetch(path)

}