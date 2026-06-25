import React from 'react';
import Footer from '../components/Footer';

const AuthLayout = ({children}) => {
  return (
    <main>
      {children}
      <Footer></Footer>
    </main>
  )
};

export default AuthLayout;