import { protectedFetch } from "./core/serverFetch"

export const getReports = async (path) => {
  return await protectedFetch(path)

}