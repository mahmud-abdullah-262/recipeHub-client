import { getUsers } from '@/lib/action/getUsers';
import React from 'react';
import AdminUsersPage from './AdminUsersPage';
import { AlertCircle } from 'lucide-react';

const page = async () => {
  const data = await getUsers();
    const users = data.users;

    if(users.length == 0){
    return (
       <div className="max-w-md mx-auto mt-20 p-8 bg-white border border-slate-200 rounded-2xl text-center shadow-sm space-y-4">
        <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle size={24} />
        </div>
        <div>
          <h3 className="text-slate-800 font-semibold text-lg">No User Found</h3>
          <p className="text-slate-500 text-sm mt-1">There are currently no active user  available.</p>
        </div>
      </div>
    )
  }


  return (
    <div>
      <AdminUsersPage users={users}/>
    </div>
  );
};

export default page;