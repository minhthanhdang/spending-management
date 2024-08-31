
import { AddItemForm } from "@/components/account/forms/add-item-form";
import { useAddItem } from "@/components/account/hooks/use-add-item";
import { useCurrentItems } from "@/components/account/hooks/use-current-items";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Item } from "@prisma/client";
import { useState } from "react";


export const AddItemSheet = () => {

  const {isOpen, onClose} = useAddItem();
  const { addItem } = useCurrentItems()

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4 text-black">
        <SheetHeader>
          <SheetTitle className="text-black">
            New Item
          </SheetTitle>
          <SheetDescription>
            Create a new item in your expense sheet.
          </SheetDescription>
        </SheetHeader>
        <AddItemForm addItem={(n) => {addItem(n)}} />
      </SheetContent>
    </Sheet>
  );
}