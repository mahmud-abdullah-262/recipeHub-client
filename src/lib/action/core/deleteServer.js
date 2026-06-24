import { getUserToken } from "../getSession";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL || 'http://localhost:8000';

export const authHeader = async () => {
  const token = await getUserToken();
  return token ? { authorization: `Bearer ${token}` } : {};
}


export const deleteServer = async (path) => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...await authHeader()
    }
  });

  // সার্ভার 200/201 না দিয়ে অন্য কোনো এরর (যেমন 404/500 HTML) দিলে এখানেই তা ধরা পড়বে
  if (!res.ok) {
    throw new Error(`Server responded with status: ${res.status}`);
  }

  const result = await res.json();
  console.log(result, 'data after delete');
  return result;
}