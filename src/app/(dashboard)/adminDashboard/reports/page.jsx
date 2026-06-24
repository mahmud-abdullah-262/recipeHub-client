import { getReports } from '@/lib/action/getReports';
import React from 'react';
import AdminReports from './AdminReports';

const AdminReportsPage = async() => {
  const reports = await getReports('/api/reports')
  return (
    <div className='w-11/12 mx-auto'>
   <div className='mb-6 mt-4 space-y-1'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl text-primary font-extralight'>All Reports</h1>
        <p className='text-sm font-bold text-secondary'>Report Management Table</p>
      </div>

      <div>
        <AdminReports reports={reports}></AdminReports>
      </div>
    </div>
  );
};

export default AdminReportsPage;