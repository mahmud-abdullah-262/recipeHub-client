"use client";
import { Button, Description, FieldError, Form, Input, Label, TextField, toast } from '@heroui/react';
import { Radio, RadioGroup} from "@heroui/react";
import {Check, Eye, EyeClosed} from "@gravity-ui/icons";
import Link from 'next/link';
import { useState } from 'react';

import { useRouter } from "next/navigation";


import React from 'react';
import Image from 'next/image';
import {Icon} from "@iconify/react";
import { authClient, signUp } from '@/lib/auth-client';  // এখানে সাইন ইন পেজে সাইন ইন ইম্পোর্ট করতে হবে


const SignUpPage = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);


 
  const onSubmit = async (e) => {
    
    e.preventDefault();
    setAuthError("");
    setLoading(true);
   console.log(name, email, password, photo, 'from user input data')

    try {
      const { data, error: authError } = await signUp.email({
        email,
        password,
        name,
        image: photo,
        callbackURL: "/",
      });

      if (authError) {
        setAuthError(authError.message);
        toast.warning("Signup Failed!", {
          description: authError.message,
          actionProps: {
            children: "Retry",
            className: "bg-warning text-warning-foreground",
          },
        });
        return;
      } else {
        toast.success("You have successfully signed up!", {
          description: "You can continue visiting delicious Recipes!",
          actionProps: {
            children: "Home",
            className: "bg-success text-success-foreground",
          },
        });
        router.push("/");
        return;
      }
    } catch (err) {             
      console.error(err);
      setAuthError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);        
    }
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
    provider: "google",
    callbackURL: "/",
  });
  }
  



  return (
   <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center mt-4 w-96 md:w-3xl mx-auto rounded-2xl shadow-xl ">
    <Form
      className="flex w-96 flex-col gap-4 p-16"
      render={(props) => <form {...props} data-custom="foo" />}
      onSubmit={onSubmit}
    >
      <div className='flex flex-col items-start space-x-0 justify-between '>
        <h1 className='text-md font-light text-primary'>Welcome to</h1>
        <Image
        src={'/images/recipehub logo.svg'}
        width={200}
        height={100}
        alt='logo'
        className='w-40 h-auto object-start object-cover'
        />
        
      </div>
      

     <TextField
        isRequired
        name="name"
        type="text"
        onChange={setName}
       
      >
        <Label className='text-primary'>Name</Label>
        <Input placeholder="enter your name here" />
        <FieldError />
      </TextField>

  <TextField
        isRequired
        name="photo"
        type="text"
        onChange={setPhoto}
       
      >
        <Label className='text-primary'>Photo URL</Label>
        <Input placeholder="enter your photo URL here" />
        <FieldError />
      </TextField>

      <TextField
        isRequired
        name="email"
        type="email"
        onChange={setEmail}
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }
          return null;
        }}
      >
        <Label className='text-primary'>Email</Label>
        <Input placeholder="john@example.com" />
        <FieldError />
      </TextField>





      <TextField
        isRequired
        minLength={8}
        name="password"
        type={showPassword ? 'text' : 'password'}
        onChange={setPassword}
        validate={(value) => {
          if (value.length < 8) {
            return "Password must be at least 8 characters";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
          }
          if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
          }
          return null;
        }}
      >
        <Label className='text-primary'>Password</Label>
       <div className="relative">
  <Input
    type={showPassword ? "text" : "password"}
    placeholder="Enter your password"
    className="pr-18" 
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
  >
    {showPassword ? <EyeClosed/> : <Eye/>}
  </button>
</div>
        
       
        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
        <FieldError />
      </TextField>


      <div className="flex gap-2 w-full max-w-xs">
        <Button type="submit" className={'bg-primary flex-1'}>
          <Check />
          Sign Up
        </Button>
        <Button type="reset" variant="secondary" className={'text-primary flex-1'}>
          Reset
        </Button>
      </div>

<div className="flex w-full max-w-xs flex-col gap-3">
      <Button
      onClick={handleGoogleLogin}
      className="w-full bg-primary" variant="primary">
        <Icon icon="devicon:google" />
        Sign in with Google
      </Button>
      </div>

      <p className='text-sm text-primary text-center'>Already Have Account? <Link className='font-bold' href={'/signin'}>Login</Link></p>
    </Form>
    <div className='h-full w-auto hidden md:block'>
      <Image
      src={'/images/login.jpg'}
      width={300}
      height={600}
      alt='login - signin image'
      className='w-96 h-full object-center object-cover rounded-r-2xl'
      />
      
    </div>
   </div>
  );
};


export default SignUpPage;



