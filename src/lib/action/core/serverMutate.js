import { getUserToken } from "../getSession";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL || 'http://localhost:8000';


export const authHeader = async () => {
  const token = await getUserToken();
  const header = token ? {
    authorization: `Bearer ${token}`
  } : {}
  return header;
}

// server mutation central function
export const serverMutate = async (path, data, method = 'POST') => {
  const isDeleteOrGet = ['GET', 'DELETE'].includes(method.toUpperCase());
const res = await fetch(`${baseUrl}${path}`, {
    method: method.toUpperCase(),
    headers: {
      'Content-Type': 'application/json',
      ... await authHeader()
    },
    body: isDeleteOrGet? undefined : JSON.stringify(data),
  });
  const result = await res.json();
  console.log(result , 'data after post')
  return result;
}