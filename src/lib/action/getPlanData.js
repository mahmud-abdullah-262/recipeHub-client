import { protectedFetch } from "./core/serverFetch"

export const getPlan = async (planId) => {
  return await protectedFetch(planId)

}