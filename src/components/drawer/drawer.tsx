"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { StretchHorizontalIcon } from "lucide-react";

export function MainDrawer() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="bg-gray-200 p-2 rounded-full flex items-center justify-center w-10 h-10 border ml-3 md:hidden">
          <StretchHorizontalIcon size={30} />
        </button>
      </SheetTrigger>
      <SheetContent className="w-full">
        <SheetHeader>
          <SheetTitle>Call Us: +2342014642998</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
