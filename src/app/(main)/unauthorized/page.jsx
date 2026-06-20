import { Button } from '@heroui/react';
import Link from 'next/link';
import React from 'react';

const unauthorizedPage = () => {
  return (
    <div>
      <h1>unauthorized access</h1>
      <Link href={'/'}><Button>Home</Button></Link>
    </div>
  );
};

export default unauthorizedPage;