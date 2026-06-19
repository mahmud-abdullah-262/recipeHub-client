
import { getSessionData } from '@/lib/action/getSession';
import Image from 'next/image';
import React from 'react';

const ProfilePage = async () => {
  const user = await getSessionData()
  console.log(user, 'user data from profile')
  return (
    <div>
      <h1>{user?.name || 'user do not find'}</h1>
       <Image
              src={user?.photo || null}
              width={500}
              height={500}
              alt='profile'
              className='w-24 h-24  object-center object-cover rounded-full'
              />
    </div>
  );
};

export default ProfilePage;