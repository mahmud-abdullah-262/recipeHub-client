import { PostRecipe } from '@/app/components/PostRecipe';
import { getPlan } from '@/lib/action/getPlanData';
import { getRecipeByAuthorID } from '@/lib/action/getRecipeByAuthorID';
import { getSessionData } from '@/lib/action/getSession';
import { Button } from '@heroui/react';
import { ArrowRight, CheckCircle2, Crown } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const addRecipePage = async() => {
  const user = await getSessionData()
  const usersAppliedRecipes = await getRecipeByAuthorID(`/api/recipe/authorId?authorId=${user.id}`)
  const data = await getPlan(`/api/plans?planId=${user.plan}`)
  const plan = data.find(plan => plan.planId == user.plan)
  console.log(plan, 'plan from user id')
  if(usersAppliedRecipes.length >= plan.maxRecipePost){
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
    <div className="max-w-md w-full bg-gradient-to-br from-amber-50 to-orange-50 dark:from-zinc-900 dark:to-neutral-950 p-8 rounded-2xl shadow-xl border border-amber-200/60 dark:border-zinc-800 relative overflow-hidden text-center">
      
      {/* টপ ডেকোরেশন গ্লো */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-300/20 rounded-full blur-2xl"></div>

      {/* ক্রাউন/মুকুট আইকন */}
      <div className="w-16 h-16 bg-gradient-to-tr from-amber-400 to-orange-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/20 rotate-3">
        <Crown size={32} strokeWidth={2} />
      </div>

      {/* লিমিট মেসেজ ও টাইটেল */}
      <span className="inline-block bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-xs font-semibold px-3 py-1 rounded-full mb-3">
        Free Tier Limit Reached
      </span>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-zinc-100 mb-2">
        Unlock Unlimited Recipes!
      </h2>
      <p className="text-gray-600 dark:text-zinc-400 text-sm mb-6">
        You have already posted your <span className="font-bold text-orange-600 dark:text-orange-400">2 free recipes</span>. Upgrade to Premium to share unlimited culinary creations with the world.
      </p>

      {/* প্রিমিয়াম ফিচারের তালিকা */}
      <div className="space-y-3 text-left max-w-xs mx-auto mb-8">
        <div className="flex items-center gap-3 text-gray-700 dark:text-zinc-300 text-sm">
          <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
          <span>Post unlimited recipes</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700 dark:text-zinc-300 text-sm">
          <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
          <span>Get a Premium Badge on profile</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700 dark:text-zinc-300 text-sm">
          <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
          <span>Ad-free browsing experience</span>
        </div>
      </div>

      {/* অ্যাকশন বাটন */}
      <div className="space-y-4">
          {/* স্ট্রাইপ পেমেন্ট ফর্ম অবিকল রাখা হয়েছে */}
               <form action="/api/checkout_sessions" method="POST" className="w-full">
                 <input type='hidden' name='plan_id' value={'Recipehub_Premium'} />
                 <section>
                   <button 
                     type="submit" 
                     role="link"
                     className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white hover:scale-[1.01] transition-all duration-150 shadow-lg shadow-orange-500/20 text-sm"
                   >
                     Go Premium
                     <ArrowRight className="w-4 h-4" />
                   </button>
                 </section>
               </form>
        
        <p className="text-xs text-gray-400 dark:text-zinc-500">
          Cancel or change your plan anytime.
        </p>
      </div>
    </div>
  </div>
    )
  }

  return (
    <div className=' p-4'>
      <div className='mb-6 space-y-1'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl text-primary font-extralight'>Post A recipe</h1>
      <p className='text-sm font-bold text-secondary'>Post Your Best Recipe for RecipeHub</p>
      <p className='text-sm font-light text-secondary'>You are a {user.plan} user. you can post {plan.maxRecipePost <= 2 ? plan.maxRecipePost : 'unlimited'} recipes.</p>
      </div>
      
      <PostRecipe></PostRecipe>
    </div>
  );
};

export default addRecipePage;