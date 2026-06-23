import { getUsers } from '@/lib/action/getUsers';
import React from 'react';
import AdminUsersPage from './AdminUsersPage';

const page = async () => {
  const data = await getUsers();
    const users = data.users;
  return (
    <div>
      <AdminUsersPage users={users}/>
    </div>
  );
};

export default page;