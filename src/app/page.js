import Image from "next/image";
import Navbar from "./components/Navbar";
import { getSessionData } from "@/lib/action/getSession";


export default async function Home() {
  const user = await getSessionData()
  return (
  <Navbar user={user}></Navbar>
  );
}
