"use client";

import { Button } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import {CircleArrowLeft, CircleArrowRight} from '@gravity-ui/icons';
const RecipeList = ({ totalData, currentPage, size }) => {
   const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(totalData / size);
  const itemsPerPage = size;
  const totalItems = totalData;

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());

    router.push(`?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
   <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full border-t border-divider pt-4 mt-6">
      {/* সামারি সেকশন (সাধারণ div দিয়ে করা, তাই কোনো স্ক্রিপ্ট এরর আসবে না) */}
      <div className="text-sm text-default-500">
        Showing <span className="font-semibold text-foreground">{startItem}</span> to{" "}
        <span className="font-semibold text-foreground">{endItem}</span> of{" "}
        <span className="font-semibold text-foreground">{totalItems}</span> recipes
      </div>

      {/* নেভিগেশন বাটনসমূহ (HeroUI এর স্ট্যান্ডার্ড বাটন) */}
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="flat"
          isDisabled={currentPage === 1}
          onPress={() => handlePageChange(currentPage - 1)}
        >
          <CircleArrowLeft/>
        </Button>
        
        <span className="text-sm min-w-[80px] text-center">
          Page {currentPage} of {totalPages}
        </span>

        <Button
          size="sm"
          variant="flat"
          isDisabled={currentPage === totalPages}
          onPress={() => handlePageChange(currentPage + 1)}
        >
          <CircleArrowRight></CircleArrowRight>
        </Button>
      </div>
    </div>
  );
};

export default RecipeList;




