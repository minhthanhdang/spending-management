import { create } from "zustand";

type AddItemState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useAddItem = create<AddItemState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
