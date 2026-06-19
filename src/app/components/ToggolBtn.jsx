"use client";

import {

  Moon,
 
  Sun
} from "@gravity-ui/icons";
import {Switch} from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";






export function ToggolBtn() {
const {theme, setTheme} = useTheme();
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) return null;  

  const icons = {
  
    darkMode: {
      off: Moon,
      on: Sun,
      selectedControlClass: "",
    },
  
  };

  return (
    <>

   <Switch 
  isSelected={theme === "dark"}
  onChange={(isSelected) => setTheme(isSelected ? "dark" : "light")}
>
  {({isSelected}) => (
    <>
      <Switch.Control
        className={`h-7.75 w-12.75 bg-primary ${isSelected ? "bg-bg-card shadow-[0_0_12px_rgba(6,182,212,0.5)]" : ""}`}
      >
        <Switch.Thumb
          className={`size-6.75 bg-white shadow-sm ${isSelected ? "ms-5.5 shadow-lg" : ""}`}
        >
          <Switch.Icon>
            {isSelected ? (
              <Sun className="size-4 text-primary" />
            ) : (
              <Moon className="size-4 text-primary" />
            )}
          </Switch.Icon>
        </Switch.Thumb>
      </Switch.Control>
    </>
  )}
</Switch>
    </>
    

    
  );
}