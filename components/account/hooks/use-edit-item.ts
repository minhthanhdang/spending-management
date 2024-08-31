import { Item } from "@prisma/client";
import { create } from "zustand";

type EditItemState = {
  item: Item | null;
  isOpen: boolean;
  onOpenEditItem: () => void;
  onCloseEditItem: () => void;
  editItem: (item: Item) => void;
};

export const useEditItem = create<EditItemState>((set) => ({
  item: null,
  isOpen: false,
  onOpenEditItem: () => set((state) => { return { item: state.item, isOpen: state.item != null }}),
  onCloseEditItem: () => set({ isOpen: false }),
  editItem: (item) => set({ item: item })
}));
