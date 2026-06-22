'use client'
import React, { useState } from 'react';
import { Card, toast } from "@heroui/react";
import Image from 'next/image';
import { Crown, CheckCircle, ArrowRight } from "lucide-react";
import { useRouter } from 'next/navigation';
import { updateProfile } from '@/lib/action/updateProfile';

export default function ProfileCard({user}) {
  const router = useRouter();
  console.log(user, 'user from profile page')
  // আপনার দেওয়া ডাটা নমুনা অনুসারে স্টেট
  const [userData, setUserData] = useState({...user});

  // এডিট মোড এবং ইনপুট ফিল্ডের জন্য স্টেট
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(userData?.name);
  const [editImage, setEditImage] = useState();
  const isPremium = userData.role === "premium";
  const onUpgrade = () => {

  }

  console.log(editImage, 'edit image text')
  // প্রোফাইল আপডেট করার ফাংশন 
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updateData = {
      ...userData,
      name: editName,
      image: editImage
    }
    setUserData(updateData)

    console.log(updateData, 'user data form')
      try {
            const uploadData = await updateProfile(`/api/user`, updateData, "PATCH");
      
            if (uploadData) {
              console.log('found upload data', uploadData)
              toast.success("Profile Updated successfully!");
              router.refresh();
              
            
            }
      
          } catch (error) {
            console.error("Error uploading profile:", error);
            toast.error(error?.message || "Failed to update profile.");
          } finally {
            console.log("Submission process completed.");
          }
        


    setIsEditing(false);
  };

  return (
    <div className="bg-background text-foreground flex flex-col lg:flex-row items-stretch justify-center gap-6 p-4 max-w-6xl mx-auto min-h-[450px] transition-colors duration-200">
  
  {/* প্রোফাইল কার্ড */}
  <Card className="flex-1 flex flex-col justify-between bg-card border border-border rounded-2xl shadow-sm p-4">
    
    {/* Card Header সেকশন */}
    <Card.Header className="flex flex-col sm:flex-row gap-6 items-center sm:items-start justify-between w-full pb-4 border-b border-border/50">
      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start w-full">
        <Image
          src={userData?.image} 
          alt={userData?.name} 
          width={500}
          height={500}
          className="w-28 h-28 md:w-32 md:h-32 object-cover rounded-2xl border border-border"
        />

        {/* নাম ও টাইটেল / রোল */}
        <div className="text-center sm:text-left space-y-1">
          <Card.Title className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
            {userData?.name}
          </Card.Title>
          <Card.Description className="text-sm font-medium text-muted uppercase tracking-wider">
            {userData?.role}
          </Card.Description>
        </div>
      </div>

      {/* অ্যাকশন বাটন */}
      <div className="w-full sm:w-auto flex justify-center sm:justify-end shrink-0">
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="px-6 py-2.5 rounded-xl font-medium bg-primary text-primary-foreground hover:opacity-90 transition-all duration-150 shadow-sm text-sm"
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>
    </Card.Header>

    {/* Card Content সেকশন */}
    <Card.Content className="py-6 flex-grow">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm text-muted">
        {/* ইমেইল */}
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="truncate">{userData?.email}</span>
          {userData?.emailVerified && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
              Verified
            </span>
          )}
        </div>
        
        {/* ইউজার আইডি */}
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2v-5M16 18l2-2m0 0l2-2m-2 2l2 2m-2-2l-2-2" />
          </svg>
          <span className="text-xs font-mono truncate">ID: {userData?.id}</span>
        </div>
      </div>
    </Card.Content>

    {/* Card Footer সেকশন */}
    <Card.Footer className="w-full">
      {isEditing && (
        <div className="w-full pt-4 border-t border-border/50 animate-fadeIn">
          <h3 className="text-md font-medium text-foreground mb-4">Update Details</h3>
          <form onSubmit={handleUpdate} className="space-y-4 max-w-xl w-full">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                Full Name
              </label>
              <input 
                type="text" 
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:border-primary transition text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                Profile Image URL
              </label>
              <input 
                type="url" 
                value={editImage}
                onChange={(e) => setEditImage(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:border-primary transition text-sm"
              />
            </div>

            <button 
              type="submit"
              className="px-5 py-2 rounded-xl font-medium bg-secondary text-secondary-foreground hover:opacity-90 transition text-sm"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}
    </Card.Footer>
  </Card>

  {/* প্রিমিয়াম কার্ড */}
  <Card className={`flex-1 flex flex-col justify-between border p-4 rounded-2xl shadow-md transition-all duration-300 ${
    isPremium 
      ? "border-amber-500/30 bg-gradient-to-br from-card via-card to-amber-500/5" 
      : "border-primary/30 bg-gradient-to-br from-card via-card to-primary/10"
  }`}>
    
    {/* Card Header */}
    <Card.Header className="flex items-center gap-3 pb-3">
      <div className={`p-2.5 rounded-xl ${
        isPremium 
          ? "bg-amber-500/10 text-amber-500" 
          : "bg-primary/10 text-primary"
      }`}>
        <Crown className="w-6 h-6" />
      </div>
      <div className='text-left'>
        <Card.Title className="text-lg font-bold tracking-tight text-foreground">
          {isPremium ? "Premium Member" : "Upgrade to Premium"}
        </Card.Title>
        <Card.Description className="text-xs text-muted">
          {isPremium ? "Exclusive Access Active" : "Unlock Ultimate Features"}
        </Card.Description>
      </div>
    </Card.Header>

    {/* Card Content */}
    <Card.Content className="py-3 flex-grow">
      <ul className="space-y-2.5 text-sm text-foreground/90">
        <li className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-primary shrink-0" />
          <span>Unlimited artwork uploads</span>
        </li>
        <li className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-primary shrink-0" />
          <span>High-resolution 4K asset downloads</span>
        </li>
        <li className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-primary shrink-0" />
          <span>Priority developer support</span>
        </li>
      </ul>
    </Card.Content>

    {/* Card Footer */}
    <Card.Footer className="pt-4 mt-2 border-t border-border/50">
      {isPremium ? (
        <div className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm border border-amber-500/20">
          <CheckCircle className="w-4 h-4" />
          Active Premium Account
        </div>
      ) : (
        <button 
          onClick={onUpgrade}
          className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium bg-primary text-primary-foreground hover:opacity-95 hover:scale-[1.01] transition-all duration-150 shadow-md shadow-primary/20 text-sm"
        >
          Go Premium 
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </Card.Footer>
  </Card>

</div>
  );
}