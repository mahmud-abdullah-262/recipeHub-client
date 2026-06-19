import React from 'react';
import NavLink from './NavLinks';
import Image from 'next/image';
import Link from 'next/link';
import { ToggolBtn } from './ToggolBtn';
import { MobileNavbar } from './MobileNavbar';

const Navbar = () => {

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
  return (
    <>
    <div className='flex justify-between items-center w-11/12 mx-auto gap-2 sm:gap-4'>
    <div className='block md:hidden flex-shrink-0'>
        <MobileNavbar navLinks={navLinks} ></MobileNavbar>
    </div>
  
      <div className='flex-shrink-0'>
        <Image
        src={'/images/recipehub-logo.png'}
        height={100}
        width={500}
        alt='logo'
        className='h-12 sm:h-16 md:h-20 lg:h-24 w-auto object-center object-cover'
        />
      </div>
      <div className='space-x-2 hidden md:block'>
         {navLinks.map( ({label, href}) => <NavLink key={href} label={label} href={href}></NavLink> )} 
      </div>
     
      <div className='flex gap-1 sm:gap-2 items-center justify-center flex-shrink-0'>
      <Link 
      className='bg-primary px-2.5 sm:px-4 py-1 rounded-2xl font-black text-xs sm:text-sm text-white whitespace-nowrap' 
      href={'/signin'}
      >Login</Link>
      <Link 
       className='bg-primary px-2.5 sm:px-4 py-1 rounded-2xl font-black text-xs sm:text-sm text-white whitespace-nowrap' 
      href={'/signup'}
      >Sign up</Link>
{/* এখানে লগইন সিস্টেম আসার পর টার্নারি ব্যবহার করতে হবে */}
      <div className='hidden space-x-2  items-center justify-center'>
            <Link 
       className='bg-primary px-4 py-1 rounded-2xl font-black text-sm text-white' 
      href={'/signin'}
      >Sign Out</Link>
        <Image
        src={'/images/profile.jpg'}
        width={50}
        height={50}
        alt='profile'
        className='w-10 h-10  object-center object-cover rounded-full'
        />
     
      </div>
       <ToggolBtn></ToggolBtn>
      </div>
     
    </div>
   
    </>
  );
};

export default Navbar;