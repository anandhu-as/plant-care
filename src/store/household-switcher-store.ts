import { create } from "zustand";

type HouseholdSwitcherStore = {
  open: boolean;
  confirmToken: string | null;
  deletingToken: string | null;
  setOpen: (v: boolean) => void;
  toggleOpen: () => void;
  requestDelete: (token: string) => void;
  cancelDelete: () => void;
  startDeleting: (token: string) => void;
  finishDeleting: () => void;
};

export const useHouseholdSwitcherStore = create<HouseholdSwitcherStore>()(
  (set) => ({
    open: false,
    confirmToken: null,
    deletingToken: null,
    setOpen: (v) => set({ open: v }),
    toggleOpen: () => set((s) => ({ open: !s.open })),
    requestDelete: (token) => set({ confirmToken: token }),
    cancelDelete: () => set({ confirmToken: null }),
    startDeleting: (token) => set({ deletingToken: token, confirmToken: null }),
    finishDeleting: () => set({ deletingToken: null, open: false }),
  })
);
