'use client'

import React, { useState } from 'react';
import { Button, Table, toast } from '@heroui/react';
import { blockUser } from '@/lib/action/blockUser';
import { useRouter } from 'next/navigation';
import RecipeList from '@/app/components/RecipeList';

 const AdminUsersPage = ({users,  searchParams }) => {
  
 const router = useRouter()


  const handleBlock = async (user) => {
  // ১. বর্তমান blocked স্ট্যাটাস চেক করা (যদি না থাকে বা false থাকে, তবে আমরা true করবো)
  // যেহেতু ডেটা স্ট্রিং বা বুলিয়ান যেকোনোভাবে থাকতে পারে, তাই দুটাই চেক করা
  const isCurrentlyBlocked = user.blocked === true || user.blocked === "true";
  
  // স্ট্যাটাস টগল করা (true থাকলে "false", false থাকলে "true")
  const newBlockedStatus = isCurrentlyBlocked ? "false" : "true";

  
  const updatedUser= {
    id: user.id,           // ইউজারের আইডি
    blocked: newBlockedStatus // নতুন স্ট্যাটাস ("true" বা "false" স্ট্রিং হিসেবে)
  };

  try {
    const data = await blockUser(`/api/admin/user-status`, updatedUser, "PATCH")

    if (data.success) {
      toast.success(data.message);
      router.refresh()
      
      
    } else {
      toast.danger("Failed to update status: " + data.message);
    }

  } catch (error) {
    console.error("Error updating block status:", error);
    toast.danger("Something went wrong!");
  }
};

  return (
    <div className='w-11/12 mx-auto'>
      <div className='mb-6 mt-4 space-y-1'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl text-primary font-extralight'>My Users</h1>
        <p className='text-sm font-bold text-secondary'>User Management Table</p>
      </div>

      {/* HeroUI Table */}
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="User management table">
            <Table.Header>
              <Table.Column>Name</Table.Column>
              <Table.Column>Email</Table.Column>
              <Table.Column>Plan</Table.Column>
              <Table.Column>Joined Date</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Action</Table.Column>
            </Table.Header>
            <Table.Body>
              {users && users.map((user) => (
                <Table.Row key={user._id}>
                  {/* Name */}
                  <Table.Cell className="capitalize font-medium text-slate-700">
                    {user.name}
                  </Table.Cell>

                  {/* Email */}
                  <Table.Cell className="text-slate-600">
                    {user.email}
                  </Table.Cell>

                  {/* Plan Column */}
                  <Table.Cell>
                    <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded font-semibold uppercase">
                      {user.plan || "Free"} {/* যদি ডেটাতে plan না থাকে তবে ডিফল্ট Free দেখাবে */}
                    </span>
                  </Table.Cell>

                  {/* Joined Date (Fixed Invalid Date Issue) */}
                  <Table.Cell className="text-slate-500">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </Table.Cell>

                  {/* Status */}
                  <Table.Cell>
                    {user.emailVerified ? (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                        Verified
                      </span>
                    ) : (
                      <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-semibold">
                        Pending
                      </span>
                    )}
                  </Table.Cell>

                  {/* Action */}
                  <Table.Cell>
                    <Button 
                    onClick={() => handleBlock(user)}
                    className="text-xs bg-danger text-white hover:bg-danger/90 px-3 py-1.5 rounded-lg font-medium transition-colors shadow-sm">
                      {user?.blocked  ? "Unblock" : "Block"}
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
        <Table.Footer>
          {/* Optional Footer Content */}
        </Table.Footer>
      </Table>

    
    </div>
  );
};

export default AdminUsersPage;