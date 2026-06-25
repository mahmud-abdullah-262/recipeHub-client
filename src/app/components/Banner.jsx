'use client';

import { Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';

const Banner = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-6 md:gap-4 p-4 max-w-7xl mx-auto'>
      {/* Chef Man — mobile-এ text-এর নিচে, md+ থেকে বাম পাশে */}
      <motion.div
        className='flex justify-center order-2 md:order-1'
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <Image
          src='/images/chefMan.png'
          width={500}
          height={1000}
          alt='chefMan'
          className='h-100 md:h-112 lg:h-124 object-contain lg:object-cover object-center'
        />
      </motion.div>

      {/* Text content — mobile-এ সবার উপরে, md/lg-এ মাঝখানে */}
      <motion.div
        className='flex flex-col gap-2 items-center justify-center text-center order-1 md:order-2'
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src='/images/recipehub logo.svg'
            height={500}
            width={500}
            alt='logo'
            className='w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36'
          />
        </motion.div>

        <h1 className='text-4xl md:text-6xl lg:text-8xl font-black text-primary leading-8 md:leading-12 lg:leading-20'>
          Cook <br /> Share <br /> Inspire.
        </h1>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href='/recipes'>
            <Button className='bg-primary font-bold text-lg md:text-2xl rounded mt-4 md:mt-6'>
              Browse Recipes
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Chef Women — শুধু lg স্ক্রিনে */}
      <motion.div
        className='hidden lg:flex justify-center order-3'
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
      >
        <Image
          src='/images/chefWomen.png'
          width={500}
          height={1000}
          alt='chefWomen'
          className='h-124 object-contain object-center'
        />
      </motion.div>
    </div>
  );
};

export default Banner;