import { getSessionData } from '@/lib/action/getSession';
import React from 'react';

const DashboardLayout = ({children}) => {
  const user = getSessionData()
  return (
    <>
    <DashboardLayout user={user}></DashboardLayout>
    {children}
    </>
  );
};

export default DashboardLayout;