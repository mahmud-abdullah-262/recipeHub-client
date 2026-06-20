"use client";

import { postRecipe } from "@/lib/action/postRecipe";
import { authClient } from "@/lib/auth-client";
import {FloppyDisk, LogoTelegram} from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
  Select,
  ListBox,
  toast
} from "@heroui/react";
import { useState } from "react";



// {
//   "recipeName": "Chicken Biryani",
//   "recipeImage": "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a",
//   "category": "Main Course",
//   "cuisineType": "Bangladeshi",
//   "difficultyLevel": "Medium",
//   "preparationTime": 90,
//   "ingredients": [
//     "1 kg chicken",
//     "500g basmati rice",
//     "2 onions",
//     "2 tbsp ginger garlic paste",
//     "Biryani masala"
//   ],
//   "instructions": [
//     "Marinate the chicken.",
//     "Cook the rice separately.",
//     "Layer chicken and rice.",
//     "Cook on low heat for 30 minutes."
//   ]
// }




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


export function PostRecipe() {
  const { data: session, isPending, error } = authClient.useSession();
  const user = session?.user;
  console.log(user, 'user from post recipe page')
  const [ingredients, setIngredients] = useState([""]);
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
    const formData = new FormData(e.currentTarget);
    const {recipeName, category, cuisineType, difficultyLevel, preparationTime} = formData
    const data = {
        recipeName,
        category,
        cuisineType,
        difficultyLevel,
        preparationTime,
        ingredients : cleanIngredients,
        authorId: user?.id,
        authorName: user?.name,
        authorEmail: user?.email,
        likesCount: 0,
        isFeatured: false,
        status: 'published'
    };

    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    console.log(data, 'data form client')
    const uploadData = await postRecipe(data)
    
  };

  return (
    <Form className="w-full max-w-96" onSubmit={onSubmit}>
      <Fieldset>
        <FieldGroup>

{/* recipe name */}
          <TextField
            isRequired
            name="recipeName"
            validate={(value) => {
              if (value.length < 3) {
                return "Name must be at least 3 characters";
              }

              return null;
            }}
          >
            <Label>Recipe Name</Label>
            <Input placeholder="Chicken Biryani" />
            <FieldError />
          </TextField>

{/* recipe category */}
<Select className="w-[256px]" placeholder="Select one" name="category">
      <Label>Choose A category</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
            {categories.map( (c, ind) => 
            <ListBox.Item key={ind} id={c} textValue={c}>
            {c}
            <ListBox.ItemIndicator />
          </ListBox.Item>)}
        </ListBox>
      </Select.Popover>
    </Select>

     {/* cuisineType */}
<Select className="w-[256px]" placeholder="Select one" name="cuisineType">
      <Label>Cuisine Type</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
            {cuisineTypes.map( (c, ind) => 
            <ListBox.Item key={ind} id={c} textValue={c}>
            {c}
            <ListBox.ItemIndicator />
          </ListBox.Item>)}
        </ListBox>
      </Select.Popover>
    </Select>

     {/* DifficultyLevel */}
<Select className="w-[256px]" placeholder="Select one" name="difficultyLevel">
      <Label>Difficulty Level</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
            {difficultyLevel.map( (c, ind) => 
            <ListBox.Item key={ind} id={c} textValue={c}>
            {c}
            <ListBox.ItemIndicator />
          </ListBox.Item>)}
        </ListBox>
      </Select.Popover>
    </Select>

{/* recipe name */}
          <TextField
            isRequired
            name="preparationTime"
          >
            <Label>Preparation Time</Label>
            <Input placeholder="90 Minutes / 1.5 Hour" />
            <FieldError />
          </TextField>


{/* ingredients */}
<div className="flex flex-col gap-2">
  <label className="text-sm font-medium">Ingredients</label>

  {ingredients.map((ingredient, index) => (
    <div key={index} className="flex items-center gap-2">
      <Input
        placeholder="e.g. 1 kg chicken"
        value={ingredient}
        onChange={(e) => handleIngredientChange(index, e.target.value)}
      />
      <Button
        isIconOnly
        color="danger"
        variant="light"
        onPress={() => removeIngredientField(index)}
      >
        ✕
      </Button>
    </div>
  ))}

  <Button variant="flat" onPress={addIngredientField}>
    + Add Ingredient
  </Button>
</div>

          <TextField
            isRequired
            name="instructions"
            validate={(value) => {
              if (value.length < 10) {
                return "instructions must be at least 10 characters";
              }

              return null;
            }}
          >
            <Label>Instructions</Label>
            <TextArea placeholder="How to Cook Your Recipe?" />
            <Description>Minimum 10 characters</Description>
            <FieldError />
          </TextField>




        </FieldGroup>
        <Fieldset.Actions>
          <Button type="submit">
            <LogoTelegram />
           Post Recipe
          </Button>
          <Button type="reset" variant="secondary">
            Cancel
          </Button>
        </Fieldset.Actions>
      </Fieldset>
    </Form>
  );
}