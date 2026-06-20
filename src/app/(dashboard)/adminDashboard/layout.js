import { requireRole } from '@/lib/action/getSession';
import React from 'react';

const AdminLayout = async ({children}) => {
  const roleCheck = await requireRole('admin')
  return children
};

export default AdminLayout;