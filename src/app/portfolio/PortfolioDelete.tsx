"use client";
import React, { useTransition } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deletePortfolio } from "./actions";
import { useRouter } from "next/navigation";

function PortfolioDelete({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const removePortfolio = () => {
    startTransition(async () => {
      deletePortfolio(id);
    });
    router.refresh();
  };

  return (
    <div className="flex gap-2">
      {isPending && <span className="loading loading-spinner loading-sm" />}
      <RiDeleteBin6Line
        className="h-5 w-5 cursor-pointer"
        onClick={() => removePortfolio()}
      />
    </div>
  );
}

export default PortfolioDelete;
