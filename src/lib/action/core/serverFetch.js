import { getUserToken } from "../getSession";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL || 'http://localhost:8000';


export const authHeader = async () => {
  const token = await getUserToken();
  const header = token ? {
    authorization: `Bearer ${token}`
  } : {}
  return header;
}


export  const serverFetch = async (path) => {
   const res = await fetch(`${baseUrl}${path}`);

  // যদি রেসপন্স ২00-299 এর মধ্যে না হয়
    if (!res.ok) {
      const errorData = await res.json();
      console.error("Server API Error:", errorData);
      return []; // সেফটি হিসেবে খালি অ্যারে রিটার্ন করুন
    }



  const data = await res.json();
  return data;
} 

export const protectedFetch = async (path) => {
  
  const res = await fetch(`${baseUrl}${path}`,{
    headers: await authHeader()
  }

  );
  const data = await res.json();
  return data;
}