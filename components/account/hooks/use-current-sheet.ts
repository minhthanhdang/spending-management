import { Sheet } from "@prisma/client";
import { create } from "zustand";

type CurrentSheetState = {
  sheet: Sheet | null;
  setSheet: (sheet: Sheet | null) => void;
};

export const useCurrentSheet = create<CurrentSheetState>((set) => ({
  sheet: null,
  setSheet: (s) => set({ sheet: s }),
}));
