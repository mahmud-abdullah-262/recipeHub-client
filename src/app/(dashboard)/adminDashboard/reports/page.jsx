import { getReports } from '@/lib/action/getReports';
import React from 'react';
import AdminReports from './AdminReports';
import { AlertCircle } from 'lucide-react';

const AdminReportsPage = async() => {
  const reports = await getReports('/api/reports')

  if(reports.length == 0){
    return (
       <div className="max-w-md mx-auto mt-20 p-8 bg-white border border-slate-200 rounded-2xl text-center shadow-sm space-y-4">
        <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle size={24} />
        </div>
        <div>
          <h3 className="text-slate-800 font-semibold text-lg">No Reports Found</h3>
          <p className="text-slate-500 text-sm mt-1">There are currently no active Reports available.</p>
        </div>
      </div>
    )
  }


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