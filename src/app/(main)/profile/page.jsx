
import ProfileCard from '@/app/components/ProfileCard';
import { getSessionData } from '@/lib/action/getSession';
import Image from 'next/image';
import React from 'react';

const ProfilePage = async () => {
  const user = await getSessionData()
  // console.log(user, 'user data from profile')
  return (
    <div className='w-11/12 mx-auto'>
     <ProfileCard user={user}></ProfileCard>
    </div>
  );
};

export default ProfilePage;