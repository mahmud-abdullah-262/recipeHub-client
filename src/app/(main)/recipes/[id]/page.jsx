
import Reaction from '@/app/components/Reaction';
import { protectedFetch } from '@/lib/action/core/serverFetch';
import { getSessionData } from '@/lib/action/getSession';
import { makeFavorite } from '@/lib/action/makeFavorite';
import { ThumbsUpFill, TriangleExclamationFill } from '@gravity-ui/icons';
import { Button, Chip, toast } from "@heroui/react";
import { Heart, Clock, Utensils, Users, CheckCircle2, AlertTriangle } from "lucide-react";
import Image from 'next/image';

const RecipeDetailsPage = async ({params}) => {
  
  const {id} = await params
  const recipe = await protectedFetch(`/api/recipes/${id}`)
  const user = await getSessionData()
  const userId = user.id;
  



  return (
   <main className="min-height-100vh bg-background text-foreground p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
        
        {/* গ্রিড লেআউট: মোবাইলে ১টি কলাম, ট্যাবলেটে/ডেস্কটপে ২টি কলাম */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 p-4 sm:p-6 md:p-8">
          
          {/* বাম পাশ: ইমেজ সেকশন */}
          <div className="relative h-[250px] sm:h-[350px] md:h-full min-h-[300px] rounded-xl overflow-hidden border border-border">
            <Image
              src={recipe.recipeImage}
              alt={recipe.recipeName}
              width={500}
              height={500}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3">
              <Chip 
                className="bg-primary text-primary-foreground font-bold"
                size="sm"
              >
                {recipe.category}
              </Chip>
            </div>
          </div>

          {/* ডান পাশ: প্রধান রেসিপি ইনফরমেশন */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              {/* শিরোনাম এবং লাইক */}
              <div className="flex justify-between items-start gap-4">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground capitalize tracking-tight">
                  {recipe.recipeName}
                </h1>
               <Reaction user={user}  recipe={recipe} ></Reaction>
                
              </div>

              {/* অথর ও রিয়েক্ট কাউন্ট */}
              <p className="text-xs sm:text-sm text-muted mt-1">
                By <span className="font-medium text-foreground">{recipe.authorName}</span> • {recipe.likesCount} Likes
              </p>

              {/* কুইক মেটা ডাটা গ্রিড (টাইম, ডিফিকাল্টি ইত্যাদি) */}
              <div className="grid grid-cols-3 gap-2 mt-6 p-3 bg-background border border-border rounded-xl text-center">
                <div className="flex flex-col items-center justify-center p-1">
                  <Clock className="w-5 h-5 text-primary mb-1" />
                  <span className="text-[10px] uppercase tracking-wider text-muted font-bold">Time</span>
                  <span className="text-xs sm:text-sm font-semibold">{recipe?.preparationTime}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-1 border-x border-border">
                  <Utensils className="w-5 h-5 text-primary mb-1" />
                  <span className="text-[10px] uppercase tracking-wider text-muted font-bold">Cuisine</span>
                  <span className="text-xs sm:text-sm font-semibold capitalize">{recipe?.cuisineType}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-1">
                  <Users className="w-5 h-5 text-primary mb-1" />
                  <span className="text-[10px] uppercase tracking-wider text-muted font-bold">Difficulty</span>
                  <span className="text-xs sm:text-sm font-semibold">{recipe?.difficultyLevel}</span>
                </div>
              </div>
            </div>

            {/* ইনগ্রেডিয়েন্টস (Ingredients) সেকশন */}
            <div>
              <h2 className="text-lg font-bold border-l-4 border-primary pl-2 mb-3">
                Ingredients
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                {recipe?.ingredients.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-muted">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* নিচের ফুল-উইডথ সেকশন: নির্দেশনাবলী এবং নিরাপত্তা গাইড */}
        <div className="border-t border-border p-4 sm:p-6 md:p-8 bg-background/50">
          
          {/* ছবি অনুযায়ী DO এবং WHAT NOT TO DO সেকশন */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* করণীয় (DO) */}
            <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
              <h3 className="text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2 mb-2 uppercase tracking-wide">
                <CheckCircle2 className="w-5 h-5" /> What to do
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                Thoroughly clean hands and surfaces. Always use separate cutting boards for raw chicken to prevent cross-contamination. Check the internal temperature.
              </p>
            </div>

            {/* বর্জনীয় (WHAT NOT TO DO) */}
            <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl">
              <h3 className="text-sm sm:text-base font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2 mb-2 uppercase tracking-wide">
                <AlertTriangle className="w-5 h-5" /> What not to do
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                Do not thaw chicken at room temperature; instead, thaw it inside the refrigerator. Do not overcrowd the roasting pan to ensure even cooking.
              </p>
            </div>
          </div>

          {/* মূল প্রস্তুতপ্রণালী (Instructions) */}
          <div>
            <h2 className="text-xl font-bold border-l-4 border-primary pl-2 mb-4">
              Instructions
            </h2>
            <div className="bg-card border border-border rounded-xl p-4 sm:p-5">
              <p className="text-sm text-muted leading-relaxed whitespace-pre-line">
                {recipe?.instructions}
              </p>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
};

export default RecipeDetailsPage;






 

