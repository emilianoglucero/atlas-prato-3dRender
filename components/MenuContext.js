import create from "zustand";

export const useStore = create((set) => ({
  menuDisplay: true,
  toggleMenuElementDisplay: () =>
    set((state) => ({ menuDisplay: !state.menuDisplay })),
}));
