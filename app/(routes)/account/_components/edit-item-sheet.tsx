
import { EditItemForm } from "@/components/account/forms/edit-item-form";
import { useCurrentItems } from "@/components/account/hooks/use-current-items";
import { useEditItem } from "@/components/account/hooks/use-edit-item";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Item } from "@prisma/client";
import { useState } from "react";


export const EditItemSheet = () => {

  const { item, isOpen, onCloseEditItem } = useEditItem();
  const { editItems } = useCurrentItems()

  return (
    <Sheet open={isOpen} onOpenChange={onCloseEditItem}>
      <SheetContent className="space-y-4 text-black">
        <SheetHeader>
          <SheetTitle className="text-black">
            Edit Item
          </SheetTitle>
          <SheetDescription>
            Edit item information here.
          </SheetDescription>
        </SheetHeader>
        <EditItemForm item={item!} editItem={(n) => {editItems(n)}} />
      </SheetContent>
    </Sheet>
  );
}