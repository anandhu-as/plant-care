import { create } from "zustand";

type ShareLinkStore = {
  isOpen: boolean;
  copied: boolean;
  open: () => void;
  close: () => void;
  setCopied: (v: boolean) => void;
};

export const useShareLinkStore = create<ShareLinkStore>()((set) => ({
  isOpen: false,
  copied: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setCopied: (v) => set({ copied: v }),
}));
