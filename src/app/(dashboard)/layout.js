import { getSessionData } from '@/lib/action/getSession';
import React from 'react';
import DashboardLayout from '../components/DashboardLayout';


const DashboardLayoutPage = async ({children}) => {
  const user = await getSessionData()
  return (
    <div className='flex'>

  <DashboardLayout user={user}></DashboardLayout>
  <main className='w-full md:pl-66'>
 {children}
  </main>
   
    </div>
  );
};

export default DashboardLayoutPage;