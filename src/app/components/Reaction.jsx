'use client'
import { protectedFetch } from '@/lib/action/core/serverFetch';
import { makeFavorite } from '@/lib/action/makeFavorite';
import { ThumbsUpFill, TriangleExclamationFill } from '@gravity-ui/icons';
import { Button, toast } from '@heroui/react';
import { Heart } from 'lucide-react';
import React from 'react';

// এখানে userEmail প্রপস হিসেবে পাস করতে পারেন অথবা আপনার কনটেক্সট থেকে নিতে পারেন
const Reaction = ({ user, recipe }) => {

  const handleFavorite = async () => {
    const favoriteRecipe = {
      ...recipe,
      userId : user.id 
    }
    try {
      const uploadData = await makeFavorite('/app/myFavorites', favoriteRecipe)
      console.log(uploadData, 'data from client');
      
      if (uploadData.success) {
        toast.success(uploadData.message || "Recipe Favorited successfully!");
      } else {
        toast.danger(uploadData.message)
      }
    } catch (error) {
      toast.error(error?.message || "Failed to Favorite recipe.");
    } finally {
      console.log("Submission process completed.");
    }
  }

  // 🟢 ফর্ম সাবমিট হ্যান্ডলার (নেস্টিং দূর করে সরাসরি কম্পোনেন্টের ভেতরে রাখা হয়েছে)
 const handleFormSubmit = async (e) => {
  e.preventDefault(); 
  
  const form = e.target;
  const recipeId = form.recipeId.value; 
  const customerEmail = user.email; 

  if (!customerEmail) {
    toast.error("Please log in first to purchase.");
    return;
  }

  try {
    // ১. ব্যাকএন্ডে চেক করছি (এখানে checkData সরাসরি অবজেক্টটি পেয়ে যাবে)
    const checkData = await protectedFetch(`/api/check-purchase?customerEmail=${customerEmail}&recipeId=${recipeId}`);
    
   
    
    if (!checkData.canPurchase) {
      // যদি অলরেডি কেনা থাকে, পেমেন্ট আটকে দিন
      toast.danger(checkData.message || "You have already purchased this recipe!");
      return; 
    }

    // ২. যদি কেনা না থাকে, তাহলে ফর্মের ডিফল্ট সাবমিটটি রান হবে (Stripe API কল হবে)
    form.submit();

  } catch (error) {
    console.error("Checking error:", error);
    toast.danger("Something went wrong. Please try again.");
  }
};

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <Button
          isIconOnly
          variant="light"
          className="text-muted hover:text-primary transition-colors"
        >
          <ThumbsUpFill className="w-6 h-6 fill-primary text-primary" />
        </Button>
        
        <Button
          isIconOnly
          onClick={handleFavorite}
          variant="light"
          className="text-muted hover:text-primary transition-colors"
        >
          <Heart className="w-6 h-6 fill-primary text-primary" />
        </Button>
        
        <Button
          isIconOnly
          variant="light"
          className="text-muted hover:text-primary transition-colors"
        >
          <TriangleExclamationFill className="w-6 h-6 fill-primary text-primary" />
        </Button>
      </div>

      {/* 🟢 onSubmit-এ সরাসরি handleFormSubmit ফাংশনটি দেওয়া হয়েছে */}
      <form onSubmit={handleFormSubmit} action="/api/checkout_sessions" method="POST">
        <input type='hidden' name='plan_id' value={'Recipehub_Random_Recipe'} />
        <input type='hidden' name='recipeId' value={recipe?._id} />
        <input type='hidden' name='recipeName' value={recipe?.recipeName} />
        <section>
          <button 
            type="submit" 
            className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium bg-primary text-primary-foreground hover:opacity-95 hover:scale-[1.01] transition-all duration-150 shadow-md shadow-primary/20 text-sm"
          >
            Buy Recipe
          </button>
        </section>
      </form>
    </div>
  );
};

export default Reaction;