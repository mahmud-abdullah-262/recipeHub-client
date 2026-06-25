import React from 'react';
import Navbar from '../components/Navbar';
import { getSessionData } from '@/lib/action/getSession';
import Footer from '../components/Footer';


const MainLayout = async ({children}) => {
const user = await getSessionData()
  return (
    <div>
       <Navbar user={user}></Navbar>
   {children}
  
   <Footer></Footer>
    </div>
   
  
   
  );
};

export default MainLayout;