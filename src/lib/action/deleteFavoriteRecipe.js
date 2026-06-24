'use server'
import { revalidatePath } from "next/cache";
import { deleteServer } from "./core/deleteServer";

export const deleteFavoriteRecipe = async (recipeId) => {
  console.log(recipeId, 'Deleting this recipe ID');

  try {
    // ব্যাকএন্ড req.query.id চাচ্ছে, তাই ?id=${recipeId} ফরম্যাটে পাথ পাঠানো হচ্ছে
    const result = await deleteServer(`/api/favorite?id=${recipeId}`);

    console.log(result, 'Data after delete');

    // MongoDB-এর deleteOne সফল হলে সাধারণত { acknowledged: true, deletedCount: 1 } রিটার্ন করে
    if (result && result.deletedCount > 0) {
      revalidatePath('/userDashboard/favorites');
      return { success: true, message: 'Recipe Deleted Successfully!' };
    }

    return { success: false, message: "No recipe found to delete" };

  } catch (error) {
    console.error("Delete Action Error:", error.message);
    return { success: false, error: error.message };
  }
}