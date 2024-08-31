import { Item } from "@prisma/client";
import { create } from "zustand";

type AddItemState = {
  currentItems: Item[];
  addItem: (n: Item) => void;
  setItems: (items: Item[]) => void;
  editItems: (item: Item) => void;
};

export const useCurrentItems = create<AddItemState>((set) => ({
  currentItems: [],
  addItem: (n) => {
    set((state) => {
      const updatedItems = [...state.currentItems, n];

      // Update localStorage with the new array
      localStorage.setItem("temp-receipt", JSON.stringify(updatedItems));

      return { currentItems: updatedItems };
    })
  },

  setItems: (items) => {
    set({
      currentItems: items,
    })
    localStorage.setItem("temp-receipt", JSON.stringify(items))
  },

  editItems: (item) => {
    set((state) => {
      const updatedItems = state.currentItems.map(prevItem => prevItem.id==item.id ? item : prevItem)
      return {
        currentItems: updatedItems
      }
    })
  }

}));
