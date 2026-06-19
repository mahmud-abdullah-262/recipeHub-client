import React from 'react';
import Navbar from '../components/Navbar';


const MainLayout = async ({children}) => {
const user = {}
  return (
    <>
    <Navbar user={user}></Navbar>
   {children}
    </>
   
  );
};

export default MainLayout;