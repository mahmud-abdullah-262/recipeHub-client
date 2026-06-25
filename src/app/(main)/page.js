import Image from "next/image";
import Navbar from "../components/Navbar";
import { getSessionData } from "@/lib/action/getSession";
import Banner from "../components/Banner";
import Featured from "../components/Featured";
import { serverFetch } from "@/lib/action/core/serverFetch";
import MostLiked from "../components/MostLiked";
import { getMostLiked } from "@/lib/action/getMostLiked";


export default async function Home() {
  const user = await getSessionData()
  const recipes = await serverFetch('/api/featured')
    const MostLikedRecipes = await getMostLiked('/api/mostLiked');
  return (
    <>
     <Banner></Banner>
 <Featured recipes={recipes}></Featured>
 <MostLiked recipes={MostLikedRecipes}></MostLiked>
    </>

  );
}
