import { Card, Button } from "@heroui/react"; // অথবা আপনার প্রজেক্টের ইম্পোর্ট পাথ অনুযায়ী
import {Heart} from '@gravity-ui/icons'; // লাইক আইকনের জন্য (ঐচ্ছিক, আপনার পছন্দমত আইকন দিতে পারেন)
import Image from "next/image";
import Link from "next/link";

export default function RecipeCard({ recipe }) {
  console.log(recipe._id, 'from brows recipe')
  const { recipeName, cuisineType, likesCount } = recipe;

  

  return (
    <Card className="relative h-[250px] sm:h-[300px] md:h-[550px] overflow-hidden border border-border bg-card rounded-sm">
      {/* রেসিপির ছবি */}
      <Image
        alt={recipe?.recipeName}
        width={600}
        height={600}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        src={recipe?.recipeImage}
      />

      {/* ছবির ওপর হালকা কালো শেড (যাতে টেক্সট সহজে পড়া যায়) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* কার্ড ফুটার - যেখানে নাম, লাইক ও বাটন থাকবে */}
      <Card.Footer className="z-10 mt-auto flex items-end justify-between w-full p-4">
        <div className="text-white">
          {/* রেসিপির নাম */}
          <h3 className="text-base font-semibold sm:text-lg line-clamp-1 capitalize">
            {recipeName}
          </h3>
          
          {/* লাইক কাউন্ট ও কুজিন টাইপ */}
          <div className="flex items-center gap-2 mt-1 text-xs text-white/80 sm:text-sm">
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4 fill-primary text-primary" /> {likesCount}
            </span>
            <span>•</span>
            <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
              {cuisineType}
            </span>
          </div>
        </div>

        {/* ডিটেইলস পেজে যাওয়ার বাটন */}
        <Link href={`/recipes/${recipe._id}`}>
         <Button 
          className="bg-primary text-primary-foreground font-medium hover:opacity-90"
          size="sm"
          variant="solid"
        >
          Details
        </Button>
        </Link>
       
      </Card.Footer>
    </Card>
  );
}