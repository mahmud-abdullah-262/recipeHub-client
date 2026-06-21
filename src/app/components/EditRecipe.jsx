"use client";

import {CirclePlus, Envelope, PaperPlane, Pencil, TrashBin} from "@gravity-ui/icons";
import {Button, FieldError, Form, Input, Label, Modal, Surface, TextField, Select, ListBox, TextArea, Description, toast} from "@heroui/react";
import { PostRecipe } from "./PostRecipe";
import { ImageUpload } from "./ImageUpload";
import { useState } from "react";
import { updateRecipe } from "@/lib/action/updateRecipe";
import { reload } from "../(dashboard)/userDashboard/myRecipes/page";

const categories = [
  "Main Course",
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


const cuisineTypes = [
  "Bangladeshi",
  "Indian",
  "Chinese",
  "Thai",
  "Italian",
  "Mexican",
  "Continental",
  "Middle Eastern",
  "Japanese",
  "Korean",
  "Fusion",
];

const difficultyLevel =[ "Super", "Hard", "Medium", "Easy", "EasyPasy" ]

export function EditRecipe({recipe, user}) {
  console.log(recipe, 'recipe')
    const [ingredients, setIngredients] = useState(recipe?.ingredients);
    const [imageUrl, setImageUrl] = useState(recipe.imageUrl)
    const handleIngredientChange = (index, value) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };
  
  const addIngredientField = () => {
    setIngredients([...ingredients, ""]);
  };
  
  const removeIngredientField = (index) => {
    if (ingredients.length === 1) return; // অন্তত একটা field থাকবে
    setIngredients(ingredients.filter((_, i) => i !== index));
  };
  
  const cleanIngredients = ingredients
    .map((item) => item.trim())
    .filter((item) => item !== "");
  
  if (cleanIngredients.length === 0) {
    toast.danger('at least 1 ingredient needed.')
  }
  
  
  
  const onSubmit = async (e) => {
      e.preventDefault();
      
      const form = e.currentTarget; 
      const formData = new FormData(form);
      
      
      const formProps = Object.fromEntries(formData);
    
      const data = {
        ...formProps, 
        id: recipe._id,
        ingredients: cleanIngredients,
        authorId: user?.id,
        authorName: user?.name,
        authorEmail: user?.email,
        likesCount: 0,
        isFeatured: false,
        status: 'published'
      };
  
      console.log(data, 'data from client');
  
      try {
        const uploadData = await updateRecipe(`/api/recipes`, data, "PATCH");
  
        if (uploadData) {
          console.log('found upload data', uploadData)
          toast.success("Recipe Updated successfully!");
          
          reload()
          console.log('reload called')
        }
  
      } catch (error) {
        console.error("Error uploading recipe:", error);
        toast.error(error?.message || "Failed to publish recipe.");
      } finally {
        console.log("Submission process completed.");
      }
    };


  return (
    <div className="w-full">
     <Modal>
      <Button className={'bg-white'}><Pencil className='w-4 h-4 text-primary' /></Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="max-w-5xl">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Pencil className="size-5 text-primary" />
              </Modal.Icon>
              <Modal.Heading>Edit Recipe</Modal.Heading>
              
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <Form className="w-full mx-auto" onSubmit={onSubmit}>
      <div className="flex flex-col gap-6">
        
        {/* ২-কলাম গ্রিড লেআউট (image_409656.png এর স্টাইলে) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* কার্ড ১: বেসিক ইনফরমেশন */}
          <div className=" p-6 rounded-2xl border border-[#e5e7eb] flex flex-col gap-4">
            <h3 className="text-lg font-bold text-primary mb-2">Recipe Info</h3>
            
            {/* recipe name */}
            <TextField
              isRequired
              defaultValue={recipe.recipeName}
              name="recipeName"
              className="w-full"
              validate={(value) => value.length < 3 ? "Name must be at least 3 characters" : null}
            >
              <Label className="text-secondary font-medium mb-1">Recipe Name</Label>
              <Input 
                placeholder="Chicken Biryani" 
                className="bg-white rounded-xl border-[#e5e7eb]"
              />
              <FieldError className="text-danger text-xs mt-1" />
            </TextField>

            {/* recipe category */}
            <Select 
            className="w-full" 
            placeholder="Select one" 
            name="category"
            defaultSelectedKeys={recipe?.category ? [recipe.category] : []}
            >
              <Label className="text-secondary font-medium mb-1">Choose A Category</Label>
              <Select.Trigger className="bg-white border-[#e5e7eb] rounded-xl">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox 
                selectionMode="single"
                defaultSelectedKeys={recipe?.category ? [recipe.category] : []}>
                  {categories.map((c, ind) => (
                    <ListBox.Item key={ind} id={c} textValue={c}>
                      {c}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            {/* cuisineType */}
            <Select className="w-full" placeholder="Select one" name="cuisineType">
              <Label className="text-secondary font-medium mb-1">Cuisine Type</Label>
              <Select.Trigger className="bg-white border-[#e5e7eb] rounded-xl">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {cuisineTypes.map((c, ind) => (
                    <ListBox.Item key={ind} id={c} textValue={c}>
                      {c}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* কার্ড ২: ডিটেইলস ও টাইমিং */}
          <div className=" p-6 rounded-2xl border border-[#e5e7eb] flex flex-col gap-4">
            <h3 className="text-lg font-bold text-primary mb-2">Details & Timing</h3>

            {/* Difficulty Level */}
            <Select className="w-full" placeholder="Select one" name="difficultyLevel">
              <Label className="text-secondary font-medium mb-1">Difficulty Level</Label>
              <Select.Trigger className="bg-white border-[#e5e7eb] rounded-xl">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {difficultyLevel.map((c, ind) => (
                    <ListBox.Item key={ind} id={c} textValue={c}>
                      {c}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            {/* Preparation Time */}
            <TextField isRequired name="preparationTime" className="w-full" defaultValue={recipe.preparationTime}>
              <Label className="text-secondary font-medium mb-1">Preparation Time</Label>
              <Input 
                placeholder="90 Minutes / 1.5 Hour" 
                className="bg-white rounded-xl border-[#e5e7eb]"
              />
              <FieldError className="text-danger text-xs mt-1" />
            </TextField>

            {/* photo upload */}
            <div className="flex flex-col gap-1">
              <label className="text-secondary text-sm font-medium">Recipe Photo</label>
              <ImageUpload value={imageUrl} onChange={(url) => setImageUrl(url)} />
            </div>
          </div>

        </div>

        {/* কার্ড ৩: উপাদানের তালিকা (ফুল উইডথ কার্ড) */}
        <div className=" p-6 rounded-2xl border border-[#e5e7eb]">
          <h3 className="text-lg font-bold text-primary mb-4">Ingredients</h3>
          <div className="flex flex-col gap-3">
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  placeholder="e.g. 1 kg chicken"
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                  className="bg-white rounded-xl border-[#e5e7eb] flex-1"
                />
                <Button
                  isIconOnly
                  className="text-danger-500 bg-transparent text-secondary hover:bg-danger-50 min-w-10 h-10 rounded-xl"
                  onPress={() => removeIngredientField(index)}
                >
                  <TrashBin size={18} />
                </Button>
              </div>
            ))}

            <Button 
              className="bg-white border border-[#e5e7eb] text-secondary hover:bg-gray-50 rounded-xl font-medium mt-2 self-start"
              onPress={addIngredientField}
              startContent={<CirclePlus size={16} />}
            >
              Add Ingredient
            </Button>
          </div>
        </div>

        {/* কার্ড ৪: প্রস্তুত প্রণালী (ফুল উইডথ কার্ড) */}
        <div className=" p-6 rounded-2xl border border-[#e5e7eb]">
          <TextField
            isRequired
            name="instructions"
            className="w-full"
            defaultValue={recipe.instructions}
            validate={(value) => value.length < 10 ? "Instructions must be at least 10 characters" : null}
          >
            <Label className="text-primary font-bold text-lg mb-2 block">Instructions</Label>
            <TextArea 
              placeholder="How to Cook Your Recipe?" 
              className="bg-white rounded-xl border-[#e5e7eb] min-h-32"
            />
            <Description className="text-[#6b7280] text-xs mt-1">Minimum 10 characters</Description>
            <FieldError className="text-danger text-xs mt-1" />
          </TextField>
        </div>

        {/* অ্যাকশন বাটনসমূহ (ডান পাশে এলাইন করা, ইমেজ অনুযায়ী) */}
        <div className="flex justify-end items-center gap-3 mt-4">
          <Button 
            type="reset" 
            className="bg-white border border-[#e5e7eb] text-secondary font-medium px-6 py-2 rounded-xl transition-all"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="bg-[#f99f1d] text-white font-medium px-6 py-2 rounded-xl shadow-sm transition-all hover:opacity-90"
            startContent={<PaperPlane size={16} />}
          >
            Update Recipe
          </Button>
        </div>

      </div>
    </Form>
              </Surface>
            </Modal.Body>
            
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal> 
    </div>
    
  );
}