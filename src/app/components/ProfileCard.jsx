'use client'
import React, { useState } from 'react';
import { Card, Chip, toast } from "@heroui/react";
import Image from 'next/image';
import { Crown, CheckCircle, ArrowRight, User, Mail, Shield, Calendar, Heart, ToggleLeft } from "lucide-react";
import { useRouter } from 'next/navigation';
import { updateProfile } from '@/lib/action/updateProfile';
import { CircleFill } from '@gravity-ui/icons';

export default function ProfileCard({ user }) {
  const router = useRouter();
  const [userData, setUserData] = useState({ ...user });

  // এডিট মোড এবং ইনপুট ফিল্ডের জন্য স্টেট
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(userData?.name || '');
  const [editImage, setEditImage] = useState(userData?.image || '');
  const isPremium = userData.plan === "Recipehub_Premium";

  // ডেট ফরম্যাট করার জন্য হেল্পার ফাংশন
  const formatDate = (dateInput) => {
    if (!dateInput) return 'N/A';
    const dateObj = dateInput.$date ? new Date(dateInput.$date) : new Date(dateInput);
    return dateObj.toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updateData = {
      ...userData,
      name: editName,
      image: editImage
    };
    
    setUserData(updateData);

    try {
      const uploadData = await updateProfile(`/api/user`, updateData, "PATCH");

      if (uploadData) {
        toast.success("Profile Updated successfully!");
        router.refresh();
      }
    } catch (error) {
      console.error("Error uploading profile:", error);
      toast.error(error?.message || "Failed to update profile.");
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-background text-foreground flex flex-col lg:flex-row items-stretch justify-center gap-6 p-4 max-w-6xl mx-auto min-h-[500px] transition-colors duration-200">
      
      {/* প্রোফাইল কার্ড */}
      <Card className="flex-1 flex flex-col justify-between bg-card border border-border rounded-2xl shadow-sm p-5">
        
        <div className="w-full">
          {/* Card Header সেকশন: ছবি এবং নাম */}
          <Card.Header className="flex flex-col sm:flex-row gap-6 items-center sm:items-start justify-between w-full pb-5 border-b border-border/50">
            <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start w-full text-center sm:text-left">
              <div className="relative w-28 h-28 md:w-32 md:h-32 shrink-0">
                <Image
                  src={userData?.image || "https://res.cloudinary.com/dto6szvn9/image/upload/v1777614286/samples/smile.jpg"} 
                  alt={userData?.name} 
                  fill
                  className="object-cover rounded-2xl border-2 border-border p-1"
                />
              </div>

              {/* নাম ও টাইটেল / রোল */}
              <div className="space-y-2 mt-2 sm:mt-0">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                    {userData?.name}
                  </h2>
                  {userData?.plan === 'free' ? (
                    <Chip size="sm" variant="flat" color="default" className="capitalize">
                      <span className="flex items-center gap-1 text-primary"><CircleFill width={6} /> {userData.plan}</span>
                    </Chip>
                  ) : (
                    <Chip size="sm" color="warning" variant="shadow" className="capitalize font-medium text-white">
                      <span className="flex items-center gap-1 text-primary"><Crown className="w-3 h-3" /> {userData.plan}</span>
                    </Chip>
                  )}
                </div>
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1">
                  <Shield className="w-4 h-4 text-primary" /> Role: {userData?.role}
                </p>
              </div>
            </div>
          </Card.Header>

          {/* Card Content সেকশন: অতিরিক্ত ডাটা দিয়ে গ্রিড সাজানো হয়েছে */}
          <Card.Content className="py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
              
              {/* ইমেইল */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/40">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <div className="overflow-hidden">
                  <p className="text-xs font-medium text-muted-foreground/70">Email Address</p>
                  <p className="truncate text-foreground font-medium">{userData?.email}</p>
                </div>
                {userData?.emailVerified && (
                  <span className="ml-auto px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-500 uppercase">
                    Verified
                  </span>
                )}
              </div>
              
              {/* লাইক কাউন্ট */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/40">
                <Heart className="w-5 h-5 text-rose-500 shrink-0 fill-rose-500/10" />
                <div>
                  <p className="text-xs font-medium text-muted-foreground/70">Total Likes Received</p>
                  <p className="text-foreground font-bold text-base">{userData?.likesCount || 0} Likes</p>
                </div>
              </div>

              {/* জয়েনিং ডেট */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/40">
                <Calendar className="w-5 h-5 text-blue-500 shrink-0" />
                <div>
                  <p className="text-xs font-medium text-muted-foreground/70">Joined On</p>
                  <p className="text-foreground font-medium">{formatDate(userData?.createdAt)}</p>
                </div>
              </div>

              {/* অ্যাকাউন্ট স্ট্যাটাস */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/40">
                <ToggleLeft className={`w-5 h-5 shrink-0 ${userData?.banned || userData?.blocked ? 'text-destructive' : 'text-emerald-500'}`} />
                <div>
                  <p className="text-xs font-medium text-muted-foreground/70">Account Status</p>
                  <p className={`font-semibold ${userData?.banned || userData?.blocked ? 'text-destructive' : 'text-emerald-500'}`}>
                    {userData?.banned || userData?.blocked ? 'Restricted' : 'Active / Healthy'}
                  </p>
                </div>
              </div>
            </div>

            {/* ইউজার আইডি ফ্ল্যাট ডিজাইন */}
            <div className="mt-4 p-2.5 rounded-xl bg-muted/20 border border-border/30 flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span>USER ID:</span>
              <span className="select-all text-foreground">{userData?._id?.$oid || userData?.id}</span>
            </div>
          </Card.Content>
        </div>

        {/* Card Footer সেকশন: এডিট বাটন এবং ফর্ম নিচে ফিক্সড করা হয়েছে */}
        <Card.Footer className="w-full flex flex-col items-stretch pt-4 border-t border-border/50 gap-4">
          
          {/* রেসপনসিভ এডিট বাটন - নিচে প্লেস করা হয়েছে */}
          <div className="w-full flex justify-end">
            <button 
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-medium transition-all duration-200 text-sm shadow-sm border ${
                isEditing 
                  ? "bg-muted text-muted-foreground border-border hover:bg-muted/80" 
                  : "bg-primary text-primary-foreground border-transparent hover:opacity-95"
              }`}
            >
              {isEditing ? "Close Panel" : "Edit Profile"}
            </button>
          </div>

          {isEditing && (
            <div className="w-full pt-4 border-t border-border/30 animate-fadeIn">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">Update Profile Info</h3>
              <form onSubmit={handleUpdate} className="space-y-4 max-w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
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
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      Profile Image URL
                    </label>
                    <input 
                      type="url" 
                      value={editImage}
                      onChange={(e) => setEditImage(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:border-primary transition text-sm"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button 
                    type="submit"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-medium bg-secondary text-secondary-foreground hover:opacity-90 transition text-sm shadow-sm"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}
        </Card.Footer>
      </Card>

      {/* প্রিমিয়াম কার্ড (অবিকল রাখা হয়েছে) */}
      <Card className={`flex-1 flex flex-col justify-between border p-6 rounded-2xl shadow-xl transition-all duration-300 relative overflow-hidden ${
        isPremium 
          ? "border-amber-500/30 bg-gradient-to-br from-card via-card to-amber-500/10" 
          : "border-amber-200/60 dark:border-zinc-800 bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-zinc-950 dark:to-neutral-950"
      }`}>
        
        {!isPremium && (
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-300/10 rounded-full blur-2xl pointer-events-none"></div>
        )}

        <Card.Header className="flex items-center gap-4 pb-4">
          <div className={`p-3 rounded-xl transition-transform ${
            isPremium 
              ? "bg-amber-500/10 text-amber-500" 
              : "bg-gradient-to-tr from-amber-400 to-orange-500 text-white shadow-lg shadow-orange-500/20 rotate-2"
          }`}>
            <Crown className="w-6 h-6" />
          </div>
          <div className="text-left">
            <Card.Title className="text-xl font-bold tracking-tight text-foreground">
              {isPremium ? "Premium Member" : "Upgrade to Premium"}
            </Card.Title>
            <Card.Description className="text-xs text-muted-foreground mt-0.5">
              {isPremium ? "Exclusive Access Active" : "Unlock Ultimate Features"}
            </Card.Description>
          </div>
        </Card.Header>

        <Card.Content className="py-4 flex-grow">
          <ul className="space-y-3.5 text-sm text-foreground/90">
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>Unlimited recipe creations & uploads</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>Get a Premium Badge on your profile</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>Ad-free cooking & browsing experience</span>
            </li>
          </ul>
        </Card.Content>

        <Card.Footer className="pt-5 mt-2 border-t border-border/50">
          {isPremium ? (
            <div className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm border border-amber-500/20">
              <CheckCircle className="w-4 h-4" />
              Premium Account Activated
            </div>
          ) : (
            <div className="w-full">
              <form action="/api/checkout_sessions" method="POST" className="w-full">
                <input type='hidden' name='plan_id' value={'Recipehub_Premium'} />
                <section>
                  <button 
                    type="submit" 
                    role="link"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white hover:scale-[1.01] transition-all duration-150 shadow-lg shadow-orange-500/20 text-sm"
                  >
                    Go Premium
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </section>
              </form>
              <p className="text-[11px] text-center text-muted-foreground mt-3">
                Cancel or change your plan anytime.
              </p>
            </div>
          )}
        </Card.Footer>
      </Card>

    </div>
  );
}