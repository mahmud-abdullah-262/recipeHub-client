'use client';


import { authClient, signIn, useSession } from "@/lib/auth-client";
import { BarsUnaligned } from "@gravity-ui/icons";
import {Button, Dropdown, Label} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

export function MobileNavbar({navLinks}) {
  const { data: session, isPending, error } = useSession();
  const user = session?.user
 
  return (
    <>
     <Dropdown>
      <Button aria-label="Menu"
      className={'bg-primary text-white'}>
        
        <BarsUnaligned></BarsUnaligned>
      </Button>
    
     
      <Dropdown.Popover>
        <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
        {navLinks.map( ({label, href})  =>   
        <Dropdown.Item key={href} id={href} href={href} textValue={label}>
            <Label>{label}</Label>
          </Dropdown.Item> )}

{user ? 
<>
  <Dropdown.Item key={"profile"}  href={'/profile'} textValue={'profile'}>
            <Label>Profile</Label>
        </Dropdown.Item>
          <Dropdown.Item key={"signin"} 
           onClick={async() => await authClient.signOut()} 
           href={'/signin'} 
           textValue={'signin'}>
            <Label>Sign Out</Label>
        </Dropdown.Item>

</>
:
<>
  <Dropdown.Item key={"signin"}  href={'/signin'} textValue={'signin'}>
            <Label>Sign in</Label>
        </Dropdown.Item>
          <Dropdown.Item key={"signup"}  href={'/signup'} textValue={'signup'}>
            <Label>Sign Up</Label>
        </Dropdown.Item>
</>


}
      
         
         
 
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>


    </>
   
  );
}