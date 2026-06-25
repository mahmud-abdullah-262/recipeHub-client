import Image from "next/image";
import Navbar from "../components/Navbar";
import { getSessionData } from "@/lib/action/getSession";
import Banner from "../components/Banner";
import Featured from "../components/Featured";
import { serverFetch } from "@/lib/action/core/serverFetch";


export default async function Home() {
  const user = await getSessionData()
  const recipes = await serverFetch('/api/featured')
  return (
    <>
     <Banner></Banner>
 <Featured recipes={recipes}></Featured>
    </>

  );
}
