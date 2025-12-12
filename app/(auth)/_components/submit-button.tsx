"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  isLoading: boolean;
  loadingText: string;
  children: React.ReactNode;
}

export function SubmitButton({
  isLoading,
  loadingText,
  children,
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className="w-full h-12 text-base font-medium rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 transition-all duration-200"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  );
}

