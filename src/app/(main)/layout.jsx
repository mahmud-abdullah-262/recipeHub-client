import React from 'react';
import Navbar from '../components/Navbar';
import { getSessionData } from '@/lib/action/getSession';


const MainLayout = async ({children}) => {
const user = await getSessionData()
  return (
    <>
    <Navbar user={user}></Navbar>
   {children}
    </>
   
  );
};

export default MainLayout;