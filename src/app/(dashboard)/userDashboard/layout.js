import { requireRole } from '@/lib/action/getSession';
import React from 'react';

const UserLayout = async ({children}) => {
  const roleCheck = await requireRole('user')
  return children
};

export default UserLayout;