'use client'
import React from 'react';
import {Label, ListBox, Select} from "@heroui/react";
import { useRouter, useSearchParams } from 'next/navigation';


const categories = [
  "MainCourse",
  "Appetizer",
  "Breakfast",
  "Soup",
  "Salad",
  "Dessert",
  "Snacks",
  "Beverage",
  "Bread & Bakery",
  "Rice & Biryani",
  "Curry",
  "Grill & BBQ",
  "Vegetarian",
  "Seafood",
  "Street Food",
];


const CategoryFilter = ({category}) => {

 const router = useRouter();
  const searchParams = useSearchParams();


 
   const handleCategory = (newCategory) => {
    if (newCategory == "") return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("category", newCategory.toString());

    router.push(`?${params.toString()}`);
  };


  return (
     <div>
         <Select className="w-[256px]" placeholder={"Select One"}>
      <Label className='font-extralight text-xl text-primary text-center'>Category</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>

          {categories.map((c, ind) =>  
          <ListBox.Item 
          key={ind}  
          textValue={c}
          onClick={() => handleCategory(c)}
          >
           {c}
            <ListBox.ItemIndicator />
          </ListBox.Item>)}
         
          
        </ListBox>
      </Select.Popover>
    </Select>
      </div>
  );
};

export default CategoryFilter;