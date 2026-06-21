'use server'
import { revalidatePath } from "next/cache"
import { authHeader } from "./core/serverFetch";


export const deleteRecipe = async (recipeId) => {
  console.log(recipeId, 'Deleting this recipe ID');

  try {
   

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/recipes?id=${recipeId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
         ... await authHeader()
      }
    });

    // সার্ভার থেকে রেসপন্স না আসলে বা এরর দিলে হ্যান্ডেল করা
    if (!res.ok) {
      throw new Error('Failed to delete recipe from server');
    }

    const result = await res.json();
    console.log(result, 'Data after delete');

    // যদি ডাটা সফলভাবে ডিলিট হয়, তবে পেজ রিভ্যালিডেট হবে
    if (result && result.deletedCount > 0) {
      revalidatePath('/userDashboard/myRecipes');
      return { success: true, result };
    }

    return { success: false, message: "No document deleted" };

  } catch (error) {
    console.error("Delete Action Error:", error.message);
    return { success: false, error: error.message };
  }
}