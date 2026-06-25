import { protectedFetch, serverFetch } from '@/lib/action/core/serverFetch';
import { getReports } from '@/lib/action/getReports';
import { getUsers } from '@/lib/action/getUsers';
import React from 'react';
import { Users, Crown, Utensils, AlertTriangle, Users2 } from 'lucide-react';

const AdminDashboard = async () => {
    const data = await getUsers();
      const users = data.users;
       const recipeData = await serverFetch('/api/recipes');
        const recipes = recipeData?.recipes;
        const premiumUser = await protectedFetch('/api/premiumuser')
         const reports = await getReports('/api/reports')
  return (
    <div className="p-6 bg-[var(--background)] text-[var(--foreground)] min-h-screen">
      {/* হেডিং সেকশন */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--secondary)]">Admin Dashboard</h1>
        <p className="text-sm text-[var(--muted)] mt-1">Overview of your platform's current statistics</p>
      </div>

      {/* কার্ড গ্রিড */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* ১. টোটাল ইউজার কার্ড */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-[var(--muted)] uppercase tracking-wider">Total Users</p>
              <h3 className="text-3xl font-bold mt-2 text-[var(--secondary)]">{users?.length || 0}</h3>
            </div>
            <div className="p-3 rounded-xl bg-gray-100 text-[var(--secondary)] group-hover:bg-[var(--secondary)] group-hover:text-[var(--secondary-foreground)] transition-colors duration-200">
              <Users2 size={24} />
            </div>
          </div>
          <div className="mt-4">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-200 text-gray-700">
              Regular Users
            </span>
          </div>
        </div>

        {/* ২. প্রিমিয়াম ইউজার কার্ড */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-[var(--muted)] uppercase tracking-wider">Premium Users</p>
              <h3 className="text-3xl font-bold mt-2 text-[var(--secondary)]">{premiumUser?.length || 0}</h3>
            </div>
            <div className="p-3 rounded-xl bg-orange-50 text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-[var(--primary-foreground)] transition-colors duration-200">
              <Crown size={24} />
            </div>
          </div>
          <div className="mt-4">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--primary)] text-[var(--primary-foreground)] animate-pulse">
              ★ Premium
            </span>
          </div>
        </div>

        {/* ৩. রেসিপি কার্ড */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-[var(--muted)] uppercase tracking-wider">Total Recipes</p>
              <h3 className="text-3xl font-bold mt-2 text-[var(--secondary)]">{recipes?.length || 0}</h3>
            </div>
            <div className="p-3 rounded-xl bg-gray-100 text-[var(--secondary)] group-hover:bg-[var(--secondary)] group-hover:text-[var(--secondary-foreground)] transition-colors duration-200">
              <Utensils size={24} />
            </div>
          </div>
          <div className="mt-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
              Active Content
            </span>
          </div>
        </div>

        {/* ৪. রিপোর্ট কার্ড */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-[var(--muted)] uppercase tracking-wider">Total Reports</p>
              <h3 className="text-3xl font-bold mt-2 text-[var(--secondary)]">{reports?.length || 0}</h3>
            </div>
            <div className="p-3 rounded-xl bg-red-50 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors duration-200">
              <AlertTriangle size={24} />
            </div>
          </div>
          <div className="mt-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">
              Action Required
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;