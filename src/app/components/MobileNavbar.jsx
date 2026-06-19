"use client";

import { BarsUnaligned } from "@gravity-ui/icons";
import {Button, Dropdown, Label} from "@heroui/react";
import Link from "next/link";

export function MobileNavbar({navLinks}) {
  return (
    <Dropdown>
      <Button aria-label="Menu"
      className={'bg-primary text-white'}>
        <BarsUnaligned></BarsUnaligned>
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
        {navLinks.map( ({label, href})  =>   <Dropdown.Item key={href} id={href} textValue={label}>
            <Label><Link href={href}>{label}</Link></Label>
          </Dropdown.Item> )}
        
         
         
      
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}