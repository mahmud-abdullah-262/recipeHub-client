'use client'
import React from 'react';
import NavLink from './NavLinks';
import Image from 'next/image';
import Link from 'next/link';
import { ToggolBtn } from './ToggolBtn';
import { MobileNavbar } from './MobileNavbar';


import { authClient } from '@/lib/auth-client';

const Navbar =  ({user})  => {
 
 console.log( user, 'user data')
  const navLinks = [
    {
      label: 'Home',
      href: '/'
    },
    {
      label: 'Browse Recipes',
      href: '/recipes'
    },

  ]
  if(user){
    navLinks.push({
      label: 'Dashboard',
      href: `/${user.role}Dashboard`,
      
    })
  }
  return (
    <>
    <div className='flex justify-between items-center w-11/12 mx-auto gap-2 sm:gap-4 p-2'>
    <div className='block md:hidden flex-shrink-0'>
        <MobileNavbar navLinks={navLinks} ></MobileNavbar>
    </div>
  
      <div className='flex-shrink-0'>
        <Link href={'/'}>
        <Image
        src={'/images/recipehub-logo.png'}
        height={100}
        width={500}
        alt='logo'
        className='h-16 w-auto object-center object-cover p-2'
        />
        </Link>
      </div>
      <div className='space-x-2 hidden md:block'>
         {navLinks.map( ({label, href}) => <NavLink key={href} label={label} href={href}></NavLink> )} 
      </div>
     
      <div className='flex gap-1 sm:gap-2 items-center justify-center flex-shrink-0'>

{user ? 
    <div className='hidden md:flex space-x-2  items-center justify-center'>
            <Link 
       className='bg-primary px-4 py-1 rounded-2xl font-black text-sm text-white' 
        onClick={async() => await authClient.signOut()} 
      href={'/signin'}
      >Sign Out</Link>

      <Link href={'/profile'}>
        <Image
        src={user?.photo || null}
        width={50}
        height={50}
        alt='profile'
        className='w-8 h-8  object-center object-cover rounded-full'
        />
      </Link>
      
     
      </div>
:
<div className='hidden md:flex'>

   <Link 
      className='bg-primary px-2.5 sm:px-4 py-1 rounded-2xl font-black text-xs sm:text-sm text-white whitespace-nowrap' 
      href={'/signin'}
      >Login</Link>
      <Link 
       className='bg-primary px-2.5 sm:px-4 py-1 rounded-2xl font-black text-xs sm:text-sm text-white whitespace-nowrap' 
      href={'/signup'}
      >Sign up</Link>
</div>


}

 
      <ToggolBtn></ToggolBtn>
 
     
      </div>
     
    </div>
   
    </>
  );
};

export default Navbar;